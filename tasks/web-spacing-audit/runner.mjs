import { createServer } from "node:http";
import { execFileSync, spawn } from "node:child_process";
import { readFile, mkdir, rm, writeFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "../..");
const distDir = resolve(repoRoot, "packages/web/.histoire/dist");
const histoireJsonPath = join(distDir, "histoire.json");
const outputDir = resolve(import.meta.dirname, "output");
const screenshotsDir = join(outputDir, "screenshots");
const reportPath = join(outputDir, "spacing-audit.md");
const evidencePath = join(outputDir, "spacing-audit.json");

const viewport = { width: 390, height: 844 };
const maxVariants = Number(process.env.SPACING_AUDIT_MAX_VARIANTS || "0");
const serverPort = Number(process.env.SPACING_AUDIT_PORT || "4177");
const concurrency = Number(process.env.SPACING_AUDIT_CONCURRENCY || "3");
const virtualTimeBudget = Number(process.env.SPACING_AUDIT_VIRTUAL_TIME_BUDGET || "8000");
const maxScreenshotHeight = Number(process.env.SPACING_AUDIT_MAX_SCREENSHOT_HEIGHT || "5000");
const edgeTimeoutMs = Number(process.env.SPACING_AUDIT_EDGE_TIMEOUT_MS || "30000");

const edgeCandidates = [
  process.env.EDGE_PATH,
  "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function toPosixPath(value) {
  return value.split("\\").join("/");
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function findEdgePath() {
  const edgePath = edgeCandidates.find((candidate) => existsSync(candidate));
  if (!edgePath) {
    throw new Error("No Edge executable found. Set EDGE_PATH to a Chromium-compatible browser.");
  }
  return edgePath;
}

function windowsPath(filePath) {
  return execFileSync("wslpath", ["-w", filePath], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function windowsTempDir() {
  return process.env.SPACING_AUDIT_WINDOWS_TEMP || "C:\\Windows\\Temp";
}

async function readStories() {
  const raw = await readFile(histoireJsonPath, "utf8");
  const metadata = JSON.parse(raw);
  const variants = [];

  for (const story of metadata.stories) {
    if (story.docsOnly) {
      continue;
    }

    for (const variant of story.variants) {
      variants.push({
        group: story.group,
        component: story.title,
        storyId: story.id,
        storyTitle: story.title,
        variantId: variant.id,
        variantTitle: variant.title,
        relativePath: story.relativePath,
      });
    }
  }

  return maxVariants > 0 ? variants.slice(0, maxVariants) : variants;
}

function auditPage(ctx) {
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  const token = (name, fallback) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const spacing = {
    xsmall: token("--sys-spacing-xsmall", 6),
    small: token("--sys-spacing-small", 10),
    medium: token("--sys-spacing-medium", 18),
  };
  const findings = [];
  const seen = new Set();

  const isVisible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      Number(style.opacity || "1") > 0.01 &&
      rect.width >= 1 &&
      rect.height >= 1
    );
  };

  const rectFor = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: Number(rect.x.toFixed(2)),
      y: Number(rect.y.toFixed(2)),
      width: Number(rect.width.toFixed(2)),
      height: Number(rect.height.toFixed(2)),
      top: Number(rect.top.toFixed(2)),
      right: Number(rect.right.toFixed(2)),
      bottom: Number(rect.bottom.toFixed(2)),
      left: Number(rect.left.toFixed(2)),
    };
  };

  const classText = (element) => String(element.getAttribute("class") || "");
  const classNameFor = (element) =>
    Array.from(element.classList || [])
      .filter((name) => name.startsWith("pu-"))
      .join(".");

  const labelFor = (element) => {
    const className = classNameFor(element);
    if (className) {
      return `.${className}`;
    }
    const aria = element.getAttribute("aria-label");
    if (aria) {
      return `${element.tagName.toLowerCase()}[aria-label="${aria}"]`;
    }
    return element.tagName.toLowerCase();
  };

  const componentFor = (element) => {
    const root = element.closest('[class*="pu-"]');
    const className = root ? classNameFor(root) : "";
    const match = className.match(/(?:^|\.)((?:pu-[a-z0-9]+-?)+)(?:__|--|$)/);
    return match?.[1] || ctx.component;
  };

  const add = (element, reasonCode, message, geometry, confidence = "low") => {
    if (!isVisible(element)) {
      return;
    }
    const rect = rectFor(element);
    const key = [
      reasonCode,
      labelFor(element),
      Math.round(rect.x),
      Math.round(rect.y),
      Math.round(rect.width),
      Math.round(rect.height),
      JSON.stringify(geometry || {}),
    ].join("|");

    if (seen.has(key)) {
      return;
    }
    seen.add(key);

    findings.push({
      component: componentFor(element),
      storyTitle: ctx.storyTitle,
      variantTitle: ctx.variantTitle,
      storyId: ctx.storyId,
      variantId: ctx.variantId,
      group: ctx.group,
      selectorLabel: labelFor(element),
      reasonCode,
      confidence,
      message,
      geometry,
      rect,
      viewport,
    });
  };

  const relevantChildren = (root) =>
    Array.from(root.children).filter((child) => child instanceof HTMLElement && isVisible(child));

  const axisGap = (a, b) => {
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const verticalOverlap = Math.min(ar.bottom, br.bottom) - Math.max(ar.top, br.top);
    const horizontalOverlap = Math.min(ar.right, br.right) - Math.max(ar.left, br.left);

    if (verticalOverlap > 1) {
      return Math.max(0, br.left - ar.right, ar.left - br.right);
    }

    if (horizontalOverlap > 1) {
      return Math.max(0, br.top - ar.bottom, ar.top - br.bottom);
    }

    const dx = Math.max(ar.left - br.right, br.left - ar.right, 0);
    const dy = Math.max(ar.top - br.bottom, br.top - ar.bottom, 0);
    return Math.sqrt(dx * dx + dy * dy);
  };

  const hasRegionName = (element) =>
    /__(header|body|content|footer|actions|meta|title|description|label|value|control|icon|prefix|suffix|main|aside|hero|media|copy|text|items|item)(?:$|--|\s)/.test(
      classText(element),
    );

  const spacingStyles = (element) => {
    const style = getComputedStyle(element);
    return {
      display: style.display,
      gap: Number.parseFloat(style.gap) || 0,
      rowGap: Number.parseFloat(style.rowGap) || 0,
      columnGap: Number.parseFloat(style.columnGap) || 0,
      paddingTop: Number.parseFloat(style.paddingTop) || 0,
      paddingRight: Number.parseFloat(style.paddingRight) || 0,
      paddingBottom: Number.parseFloat(style.paddingBottom) || 0,
      paddingLeft: Number.parseFloat(style.paddingLeft) || 0,
    };
  };

  const textLike = (element) => {
    const tag = element.tagName.toLowerCase();
    return /^(h[1-6]|p|span|label|small|strong|em|dt|dd)$/.test(tag) || Boolean(element.textContent?.trim());
  };

  const candidateRoots = Array.from(document.querySelectorAll('[class*="pu-"]'))
    .filter((element) => {
      if (!(element instanceof HTMLElement) || !isVisible(element)) return false;
      const parent = element.parentElement?.closest('[class*="pu-"]');
      const own = classNameFor(element);
      if (!own) return false;
      if (!parent) return true;
      const parentBlock = classNameFor(parent).match(/(?:^|\.)(pu-[a-z0-9-]+)/)?.[1];
      return parentBlock && !own.includes(`${parentBlock}__`);
    });

  for (const root of candidateRoots) {
    const children = relevantChildren(root);
    const rootStyles = spacingStyles(root);

    if (children.length >= 2) {
      for (let index = 0; index < children.length - 1; index += 1) {
        const current = children[index];
        const next = children[index + 1];
        const gap = axisGap(current, next);
        const regionPair = hasRegionName(current) || hasRegionName(next);
        const threshold = regionPair ? Math.max(spacing.xsmall, 6) : Math.max(spacing.xsmall / 2, 3);

        if (gap <= threshold && (regionPair || children.length <= 6)) {
          add(root, "adjacent-elements-tight", "Adjacent visible elements have little or no measured separation.", {
            from: labelFor(current),
            to: labelFor(next),
            measuredGap: Number(gap.toFixed(2)),
            threshold: Number(threshold.toFixed(2)),
            parentDisplay: rootStyles.display,
            parentGap: rootStyles.gap,
            parentRowGap: rootStyles.rowGap,
            parentColumnGap: rootStyles.columnGap,
          });
        }
      }
    }

    const regionChildren = children.filter(hasRegionName);
    if (regionChildren.length >= 2 && rootStyles.rowGap < spacing.xsmall && rootStyles.columnGap < spacing.xsmall) {
      add(root, "region-container-no-gap", "Container has multiple named regions but little computed gap.", {
        regions: regionChildren.slice(0, 8).map(labelFor),
        rowGap: rootStyles.rowGap,
        columnGap: rootStyles.columnGap,
        childCount: regionChildren.length,
      });
    }

    if (
      children.length > 0 &&
      rootStyles.paddingTop <= 2 &&
      rootStyles.paddingRight <= 2 &&
      rootStyles.paddingBottom <= 2 &&
      rootStyles.paddingLeft <= 2 &&
      /(card|dialog|modal|drawer|notice|empty|cell|description|upload|form|input|textarea|button|tag|chip)/.test(classNameFor(root))
    ) {
      const child = children[0];
      const rr = root.getBoundingClientRect();
      const cr = child.getBoundingClientRect();
      const inset = {
        top: Number((cr.top - rr.top).toFixed(2)),
        right: Number((rr.right - cr.right).toFixed(2)),
        bottom: Number((rr.bottom - cr.bottom).toFixed(2)),
        left: Number((cr.left - rr.left).toFixed(2)),
      };
      const minInset = Math.min(inset.top, inset.right, inset.bottom, inset.left);
      if (minInset <= 2 && root.getBoundingClientRect().height > 16) {
        add(root, "container-edge-tight", "Container content is close to at least one outer edge.", {
          inset,
          computedPadding: {
            top: rootStyles.paddingTop,
            right: rootStyles.paddingRight,
            bottom: rootStyles.paddingBottom,
            left: rootStyles.paddingLeft,
          },
        });
      }
    }
  }

  const controls = Array.from(
    document.querySelectorAll('button, a[href], input, textarea, select, [role="button"], [class*="pu-button"], [class*="__close"]'),
  ).filter((element) => element instanceof HTMLElement && isVisible(element));

  for (const control of controls) {
    const styles = spacingStyles(control);
    const rect = control.getBoundingClientRect();
    const isIconOnly =
      Boolean(control.querySelector('[class*="i-"], svg')) &&
      (control.textContent || "").trim().length === 0;
    const smallHitArea = rect.width < 32 || rect.height < 32;
    const tightPadding = Math.min(styles.paddingTop, styles.paddingRight, styles.paddingBottom, styles.paddingLeft) <= 2;

    if (isIconOnly && smallHitArea) {
      add(control, "icon-control-small-hit-area", "Icon-only control has a small visible hit area.", {
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2)),
        minExpected: 32,
      }, "medium");
    }

    if (!isIconOnly && tightPadding && (control.textContent || "").trim()) {
      add(control, "control-tight-padding", "Text control has little computed padding on at least one side.", {
        padding: {
          top: styles.paddingTop,
          right: styles.paddingRight,
          bottom: styles.paddingBottom,
          left: styles.paddingLeft,
        },
      });
    }

    const inlineParts = Array.from(control.children).filter((child) => child instanceof HTMLElement && isVisible(child));
    if (inlineParts.length >= 2) {
      for (let index = 0; index < inlineParts.length - 1; index += 1) {
        const gap = axisGap(inlineParts[index], inlineParts[index + 1]);
        if (gap <= Math.max(2, spacing.xsmall / 2)) {
          add(control, "control-inline-parts-tight", "Control inline parts have little measured separation.", {
            from: labelFor(inlineParts[index]),
            to: labelFor(inlineParts[index + 1]),
            measuredGap: Number(gap.toFixed(2)),
          });
        }
      }
    }
  }

  const textContainers = Array.from(document.querySelectorAll('[class*="pu-"]')).filter(
    (element) => element instanceof HTMLElement && isVisible(element),
  );

  for (const container of textContainers) {
    const children = relevantChildren(container).filter(textLike);
    if (children.length < 2 || children.length > 10) {
      continue;
    }

    for (let index = 0; index < children.length - 1; index += 1) {
      const gap = axisGap(children[index], children[index + 1]);
      if (gap <= 2) {
        add(container, "text-rhythm-tight", "Adjacent text-like children have little or no measured separation.", {
          from: labelFor(children[index]),
          to: labelFor(children[index + 1]),
          measuredGap: Number(gap.toFixed(2)),
        });
      }
    }
  }

  return findings.slice(0, 80);
}

function auditInjection() {
  const source = `
<script>
(() => {
  const auditPage = ${auditPage.toString()};
  const params = new URLSearchParams(window.location.search);
  const ctx = {
    component: params.get("component") || "",
    storyTitle: params.get("storyTitle") || "",
    variantTitle: params.get("variantTitle") || "",
    storyId: params.get("storyId") || "",
    variantId: params.get("variantId") || "",
    group: params.get("group") || "",
  };
  const publish = (payload) => {
    const node = document.createElement("script");
    node.id = "spacing-audit-result";
    node.type = "application/json";
    node.setAttribute("data-encoding", "base64");
    node.textContent = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    document.body.appendChild(node);
  };
  const run = () => {
    const findings = auditPage(ctx);
    publish({
      findings,
      metrics: {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scrollWidth: Math.ceil(document.documentElement.scrollWidth || document.body.scrollWidth || window.innerWidth),
        scrollHeight: Math.ceil(document.documentElement.scrollHeight || document.body.scrollHeight || window.innerHeight),
      },
    });
  };
  const start = Date.now();
  const tick = () => {
    if (document.getElementById("spacing-audit-result")) return;
    if (document.querySelector('[class*="pu-"]') || Date.now() - start > 7000) {
      setTimeout(run, 250);
      return;
    }
    setTimeout(tick, 100);
  };
  tick();
})();
</script>`;
  return source;
}

function createStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", `http://localhost:${serverPort}`);
      const pathname = decodeURIComponent(url.pathname);

      if (pathname === "/__audit.html") {
        const sandbox = await readFile(join(distDir, "__sandbox.html"), "utf8");
        response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        response.end(sandbox.replace("</body>", `${auditInjection()}\n</body>`));
        return;
      }

      const requested = pathname === "/" ? "/index.html" : pathname;
      const filePath = resolve(distDir, `.${requested}`);

      if (!filePath.startsWith(distDir) || !existsSync(filePath)) {
        response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "content-type": mimeTypes.get(extname(filePath)) || "application/octet-stream",
      });
      createReadStream(filePath).pipe(response);
    } catch (error) {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end(error instanceof Error ? error.message : String(error));
    }
  });

  return new Promise((resolveServer, rejectServer) => {
    server.on("error", rejectServer);
    server.listen(serverPort, "0.0.0.0", () => resolveServer(server));
  });
}

function edgeArgs(url, options = {}) {
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    `--user-data-dir=${windowsTempDir()}\\design-web-spacing-audit-${process.pid}-${options.sequence || Date.now()}`,
    `--virtual-time-budget=${virtualTimeBudget}`,
    `--window-size=${viewport.width},${options.height || viewport.height}`,
  ];

  if (options.screenshotPath) {
    args.push(`--screenshot=${windowsPath(options.screenshotPath)}`);
  }

  if (options.dumpDom) {
    args.push("--dump-dom");
  }

  args.push(url);
  return args;
}

function runEdge(url, options = {}) {
  const edgePath = findEdgePath();
  const child = spawn(edgePath, edgeArgs(url, options), {
    stdio: ["ignore", "pipe", "pipe"],
  });
  const stdout = [];
  const stderr = [];

  child.stdout.on("data", (chunk) => stdout.push(chunk));
  child.stderr.on("data", (chunk) => stderr.push(chunk));

  return new Promise((resolveRun, rejectRun) => {
    const timeout = setTimeout(() => {
      child.kill();
      rejectRun(new Error(`Edge timed out for ${url}`));
    }, edgeTimeoutMs);

    child.on("error", (error) => {
      clearTimeout(timeout);
      rejectRun(error);
    });

    child.on("exit", (code) => {
      clearTimeout(timeout);
      const result = {
        code,
        stdout: Buffer.concat(stdout).toString("utf8"),
        stderr: Buffer.concat(stderr).toString("utf8"),
      };

      if (code === 0) {
        resolveRun(result);
        return;
      }

      rejectRun(new Error(`Edge exited with code ${code}: ${result.stderr}`));
    });
  });
}

function extractAuditResult(dom) {
  const match = dom.match(/<script id="spacing-audit-result" type="application\/json" data-encoding="base64">([^<]+)<\/script>/);
  if (!match) {
    return {
      findings: [],
      metrics: { viewport, scrollHeight: viewport.height, scrollWidth: viewport.width },
      error: "missing-audit-result",
    };
  }

  return JSON.parse(Buffer.from(match[1], "base64").toString("utf8"));
}

function variantUrl(variant) {
  const params = new URLSearchParams({
    storyId: variant.storyId,
    variantId: variant.variantId,
    component: variant.component,
    storyTitle: variant.storyTitle,
    variantTitle: variant.variantTitle,
    group: variant.group,
  });
  return `http://localhost:${serverPort}/__audit.html?${params.toString()}`;
}

async function runVariant(variant, index) {
  const componentSlug = slug(variant.component);
  const variantSlug = slug(variant.variantTitle);
  const screenshotDir = join(screenshotsDir, componentSlug);
  await mkdir(screenshotDir, { recursive: true });
  const screenshotPath = join(
    screenshotDir,
    `${String(index + 1).padStart(3, "0")}-${variantSlug || "variant"}.png`,
  );
  const url = variantUrl(variant);
  const auditRun = await runEdge(url, {
    dumpDom: true,
    screenshotPath,
    sequence: `${index}-audit`,
  });
  const auditResult = extractAuditResult(auditRun.stdout);
  const screenshotHeight = Math.min(
    Math.max(viewport.height, Number(auditResult.metrics?.scrollHeight || viewport.height)),
    maxScreenshotHeight,
  );

  if (screenshotHeight > viewport.height) {
    await runEdge(url, {
      screenshotPath,
      height: screenshotHeight,
      sequence: `${index}-screenshot`,
    });
  }

  return {
    variant,
    screenshotPath,
    screenshotHeight,
    auditResult,
    findings: (auditResult.findings || []).map((finding) => ({
      ...variant,
      ...finding,
      screenshotPath,
      screenshotHeight,
    })),
  };
}

async function runPool(items, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.max(1, Math.min(concurrency, items.length)) },
    () => runWorker(),
  );
  await Promise.all(workers);
  return results;
}

function markdownReport(variants, findings, errors) {
  const lines = [];
  const date = new Date().toISOString();
  lines.push("# Web Spacing Audit Report");
  lines.push("");
  lines.push(`Generated: ${date}`);
  lines.push(`Measurement viewport: mobile ${viewport.width}x${viewport.height}`);
  lines.push(`Story variants visited: ${variants.length}`);
  lines.push(`Candidates: ${findings.length}`);
  lines.push(`Errors: ${errors.length}`);
  lines.push("");
  lines.push("This report lists suspected spacing candidates only. It does not include repair recommendations.");
  lines.push("");

  if (errors.length > 0) {
    lines.push("## Runner Errors");
    lines.push("");
    for (const error of errors) {
      lines.push(`- ${error.component} / ${error.variantTitle}: \`${error.error}\``);
    }
    lines.push("");
  }

  const byComponent = new Map();
  for (const finding of findings) {
    const key = finding.component || "Unknown";
    if (!byComponent.has(key)) {
      byComponent.set(key, []);
    }
    byComponent.get(key).push(finding);
  }

  for (const [component, componentFindings] of [...byComponent.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push(`## ${component}`);
    lines.push("");

    for (const finding of componentFindings) {
      const screenshot = toPosixPath(relative(outputDir, finding.screenshotPath));
      lines.push(`### ${finding.storyTitle} / ${finding.variantTitle}`);
      lines.push("");
      lines.push(`- Reason: \`${finding.reasonCode}\``);
      lines.push(`- Confidence: \`${finding.confidence}\``);
      lines.push(`- Element: \`${finding.selectorLabel}\``);
      lines.push(`- Message: ${finding.message}`);
      lines.push(`- Screenshot: [${screenshot}](${screenshot})`);
      lines.push(`- Screenshot height: \`${finding.screenshotHeight}px\``);
      lines.push(`- Geometry: \`${JSON.stringify(finding.geometry)}\``);
      lines.push("");
    }
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  if (!existsSync(histoireJsonPath)) {
    throw new Error(`Missing Histoire build metadata at ${histoireJsonPath}. Run story:build first.`);
  }

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(screenshotsDir, { recursive: true });

  const variants = await readStories();
  const server = await createStaticServer();

  try {
    const results = await runPool(variants, async (variant, index) => {
      try {
        const result = await runVariant(variant, index);
        process.stdout.write(
          `[${index + 1}/${variants.length}] ${variant.component} / ${variant.variantTitle}: ${result.findings.length} candidates\n`,
        );
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        process.stdout.write(`[${index + 1}/${variants.length}] ${variant.component} / ${variant.variantTitle}: ERROR ${message}\n`);
        return {
          variant,
          screenshotPath: null,
          screenshotHeight: viewport.height,
          auditResult: { findings: [], error: message },
          findings: [],
        };
      }
    });

    const findings = results.flatMap((result) => result.findings);
    const errors = results
      .filter((result) => result.auditResult?.error)
      .map((result) => ({
        ...result.variant,
        error: result.auditResult.error,
      }));

    await writeFile(evidencePath, `${JSON.stringify({ viewport, variants, findings, errors, results }, null, 2)}\n`);
    await writeFile(reportPath, markdownReport(variants, findings, errors));

    process.stdout.write(`\nReport: ${reportPath}\n`);
    process.stdout.write(`Evidence: ${evidencePath}\n`);
    process.stdout.write(`Screenshots: ${screenshotsDir}\n`);
  } finally {
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

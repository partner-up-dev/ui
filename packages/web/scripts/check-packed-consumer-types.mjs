import { existsSync } from "node:fs";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(packageRoot, "../..");
const workRoot = path.join(packageRoot, ".tmp", "packed-consumer-types");
const packRoot = path.join(workRoot, "pack");
const extractRoot = path.join(workRoot, "extract");
const consumerRoot = path.join(workRoot, "consumer");
const packedPackageRoot = path.join(consumerRoot, "node_modules", "@partner-up-dev", "design-web");

const run = (command, args, options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: packageRoot,
      shell: process.platform === "win32",
      ...options,
    });
    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(
        new Error(
          [
            `Command failed: ${command} ${args.join(" ")}`,
            stdout.trim(),
            stderr.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
        ),
      );
    });
  });

const walkFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
};

const assertMissing = (relativePath) => {
  const target = path.join(packedPackageRoot, relativePath);
  if (existsSync(target)) {
    throw new Error(`Packed package must not contain ${relativePath}.`);
  }
};

const assertFile = (relativePath) => {
  const target = path.join(packedPackageRoot, relativePath);
  if (!existsSync(target)) {
    throw new Error(`Packed package is missing ${relativePath}.`);
  }
};

const findVueTsc = () => {
  const binaryName = process.platform === "win32" ? "vue-tsc.cmd" : "vue-tsc";
  const candidates = [
    path.join(packageRoot, "node_modules", ".bin", binaryName),
    path.join(repoRoot, "node_modules", ".bin", binaryName),
  ];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error("Cannot find vue-tsc binary. Run pnpm install from the repository root.");
  }
  return found;
};

const writeConsumerProject = async () => {
  await writeFile(
    path.join(consumerRoot, "package.json"),
    `${JSON.stringify(
      {
        private: true,
        type: "module",
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  await writeFile(
    path.join(consumerRoot, "tsconfig.json"),
    `${JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "Bundler",
          strict: true,
          skipLibCheck: false,
          jsx: "preserve",
          lib: ["ES2020", "DOM", "DOM.Iterable"],
          types: ["vue"],
        },
        vueCompilerOptions: {
          strictTemplates: true,
        },
        include: ["index.ts", "App.vue"],
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  await writeFile(
    path.join(consumerRoot, "index.ts"),
    `import PartnerUpDesignWeb, {
  PuButton,
  version,
  usePuId,
  type PuAction,
  type PuButtonFeedback,
  type PuCardVariant,
} from '@partner-up-dev/design-web'
import type { GlobalComponents } from 'vue'

const feedback: PuButtonFeedback = 'success'
// @ts-expect-error unknown feedback state must stay rejected
const invalidFeedback: PuButtonFeedback = 'done'

const action: PuAction = { href: '/billing' }
const cardVariant: PuCardVariant = 'soft'
const button: GlobalComponents['PuButton'] = PuButton
const id = usePuId('consumer')
const installer = PartnerUpDesignWeb.install
const releaseVersion: string = version

// @ts-expect-error raw component source subpaths are not public package API
type RawButtonModule = typeof import('@partner-up-dev/design-web/components/puButton/puButton')

void [feedback, invalidFeedback, action, cardVariant, button, id, installer, releaseVersion]
`,
    "utf8",
  );

  await writeFile(
    path.join(consumerRoot, "App.vue"),
    `<template>
  <PuButton :feedback="feedback" size="md">Save</PuButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PuButtonFeedback } from '@partner-up-dev/design-web'

const feedback = ref<PuButtonFeedback>('idle')
</script>
`,
    "utf8",
  );
};

const assertPackedSurface = async () => {
  assertFile("dist/index.js");
  assertFile("dist/index.d.ts");
  assertFile("types/components.d.ts");
  assertMissing("dist/index.ts");
  assertMissing("src/components");
  assertMissing("src/composables");
  assertMissing("src/types");

  const packageJson = JSON.parse(await readFile(path.join(packedPackageRoot, "package.json"), "utf8"));
  if (packageJson.exports?.["./components/*"]) {
    throw new Error('Packed package must not export "./components/*".');
  }

  const declarationFiles = (await walkFiles(packedPackageRoot)).filter((file) => file.endsWith(".d.ts"));
  for (const file of declarationFiles) {
    const source = await readFile(file, "utf8");
    if (source.includes("../src/components") || source.includes("./src/components")) {
      throw new Error(`Packed declaration leaks raw component source path: ${path.relative(packedPackageRoot, file)}`);
    }
  }
};

await rm(workRoot, { recursive: true, force: true });
await mkdir(packRoot, { recursive: true });
await mkdir(extractRoot, { recursive: true });
await mkdir(path.dirname(packedPackageRoot), { recursive: true });

const { stdout } = await run("npm", ["pack", "--json", "--pack-destination", packRoot], { cwd: packageRoot });
const [packInfo] = JSON.parse(stdout);
const tarballPath = path.join(packRoot, packInfo.filename);

await run("tar", ["-xzf", tarballPath, "-C", extractRoot], { cwd: packageRoot });
await cp(path.join(extractRoot, "package"), packedPackageRoot, { recursive: true });
await writeConsumerProject();
await assertPackedSurface();

await run(findVueTsc(), ["-p", "tsconfig.json", "--noEmit"], { cwd: consumerRoot });

if (process.env.PU_KEEP_PACKED_TYPE_CHECK !== "1") {
  await rm(workRoot, { recursive: true, force: true });
}

console.log("Packed consumer type check passed.");

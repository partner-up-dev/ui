import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_STORIES = new Set([
  "PuButton",
  "PuCell",
  "PuModal",
  "PuToggleSwitch",
  "PuWheelPicker",
]);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, "..");
const registryPath = path.join(packageRoot, "src", "component-registry.ts");
const storiesRoot = path.join(packageRoot, "src", "stories");
const strictMode = process.argv.includes("--strict");

const readExisting = async (filePath) => {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return "";
    }
    throw error;
  }
};

const walk = async (dir) => {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }
  return files;
};

const getPublicComponents = async () => {
  const source = await readExisting(registryPath);
  const matches = [...source.matchAll(/^import\s+(Pu[A-Za-z0-9_]+)\s+from\s+/gm)];
  return [...new Set(matches.map((match) => match[1]))].sort((a, b) =>
    a.localeCompare(b),
  );
};

const getStoryComponents = async () => {
  const files = await walk(storiesRoot);
  const names = files
    .map((file) => path.basename(file))
    .filter((name) => name.endsWith(".story.vue"))
    .map((name) => name.slice(0, -".story.vue".length));

  return new Set(names);
};

const formatList = (items) => (items.length > 0 ? items.join(", ") : "(none)");

const publicComponents = await getPublicComponents();
const storyComponents = await getStoryComponents();
const covered = publicComponents.filter((name) => storyComponents.has(name));
const missing = publicComponents.filter((name) => !storyComponents.has(name));
const missingRequired = [...REQUIRED_STORIES].filter(
  (name) => !storyComponents.has(name),
);

console.log(
  `Story coverage: ${covered.length}/${publicComponents.length} public components have stories.`,
);
console.log(`Covered: ${formatList(covered)}`);

if (missing.length > 0) {
  console.log(`Missing backlog: ${formatList(missing)}`);
}

if (missingRequired.length > 0) {
  throw new Error(
    `Missing required first-slice stories: ${formatList(missingRequired)}`,
  );
}

if (strictMode && missing.length > 0) {
  throw new Error(`Missing public component stories: ${formatList(missing)}`);
}

import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

const iconFiles = [
  "favicon.ico",
  "favicon.png",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "site.webmanifest",
];

const requiredFiles = [
  "index.html",
  "styles.css",
  "logo-transparent.png",
  ...iconFiles,
  "src/js/main.js",
  "src/data/public/site-content.json",
  "src/data/public/museum-canon.json",
  "src/data/public/collections.json",
  "src/data/public/people-contributors.json",
];

async function copyIfExists(from, to) {
  const source = path.join(root, from);
  if (!existsSync(source)) return;
  await cp(source, path.join(dist, to), { recursive: true });
}

async function validateJsonDirectory(directory) {
  const source = path.join(root, directory);
  if (!existsSync(source)) return;
  const entries = await import("node:fs/promises").then((fs) => fs.readdir(source, { withFileTypes: true }));

  await Promise.all(
    entries.map(async (entry) => {
      const relative = path.join(directory, entry.name);
      const absolute = path.join(root, relative);
      if (entry.isDirectory()) {
        await validateJsonDirectory(relative);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        JSON.parse(await readFile(absolute, "utf8"));
      }
    }),
  );
}

for (const file of requiredFiles) {
  if (!existsSync(path.join(root, file))) {
    throw new Error(`Missing required deployment file: ${file}`);
  }
}

await validateJsonDirectory("src/data/public");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await copyIfExists("index.html", "index.html");
await copyIfExists("styles.css", "styles.css");
for (const file of iconFiles) {
  await copyIfExists(file, file);
}
await copyIfExists("logo-transparent.png", "logo-transparent.png");
await copyIfExists("assets", "assets");
await copyIfExists("src/js", "src/js");
await copyIfExists("src/data/public", "src/data/public");
await copyIfExists("public/images", "images");

await writeFile(
  path.join(dist, ".vercel-build-info.json"),
  `${JSON.stringify(
    {
      framework: "static",
      outputDirectory: "dist",
      publicDataOnly: true,
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  )}\n`,
);

console.log("Built static deployment in dist/");

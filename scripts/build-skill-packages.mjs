// Builds everything under public/downloads/:
// - Zips each tool's folder under skills/ into apprenti-skill-<tool>.zip.
// - Copies tools/local-llm/New-GgufCatalog.ps1 as a plain file.
// Runs automatically before `astro dev`/`astro build` (see package.json scripts).
// Source of truth for the *content* of these packages is the apprentiapp repo's
// skills/ and tools/local-llm/ directories — see skills/README.md for the sync
// process (the same manual-copy approach applies to tools/local-llm/).

import { copyFileSync, createWriteStream, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const skillsDir = join(repoRoot, "skills");
const outDir = join(repoRoot, "public", "downloads");

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const tools = readdirSync(skillsDir).filter((name) =>
  statSync(join(skillsDir, name)).isDirectory()
);

async function zipTool(tool) {
  const sourceDir = join(skillsDir, tool);
  const outPath = join(outDir, `apprenti-skill-${tool}.zip`);

  return new Promise((resolve, reject) => {
    const output = createWriteStream(outPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });

    output.on("close", () => {
      console.log(
        `  apprenti-skill-${tool}.zip (${(archive.pointer() / 1024).toFixed(1)} KiB)`
      );
      resolve();
    });
    archive.on("error", reject);

    archive.pipe(output);
    // Preserve the exact relative paths a content creator needs to unzip into
    // their curriculum repo (e.g. skills/claude/.claude/... -> .claude/...).
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

console.log(`Building skill packages from ${skillsDir}...`);
for (const tool of tools) {
  await zipTool(tool);
}

const ggufScript = join(repoRoot, "tools", "local-llm", "New-GgufCatalog.ps1");
if (existsSync(ggufScript)) {
  const dest = join(outDir, "New-GgufCatalog.ps1");
  copyFileSync(ggufScript, dest);
  console.log(`  New-GgufCatalog.ps1 (copied from tools/local-llm/)`);
}

console.log("Done.");

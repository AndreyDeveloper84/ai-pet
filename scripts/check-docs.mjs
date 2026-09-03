#!/usr/bin/env node
/**
 * Domain-neutral Markdown sanity checks for tracked docs.
 *
 * Hard failures (exit 1):
 *   - empty .md file;
 *   - no level-1 heading in the first 20 lines;
 *   - relative local link whose target file does not exist
 *     (http(s), mailto and pure #anchor links are ignored).
 *
 * Scans git-tracked .md files only. Read-only.
 */
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";

let failures = 0;
const fail = (msg) => { failures++; console.error(`FAIL  ${msg}`); };

const files = execSync('git ls-files -- "*.md"', { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (!text.trim()) { fail(`${file}: empty`); continue; }

  const head = text.split("\n").slice(0, 20).join("\n");
  if (!/^#\s/m.test(head)) fail(`${file}: no level-1 heading in first 20 lines`);

  for (const m of text.matchAll(/\]\(([^)\s]+)[^)]*\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:|#)/i.test(target)) continue;
    const path = decodeURIComponent(target.split("#")[0]);
    if (!path) continue;
    if (!existsSync(resolve(dirname(file), path))) {
      fail(`${file}: broken local link → ${target}`);
    }
  }
}

console.log(`${files.length} markdown file(s) checked, ${failures} failure(s)`);
process.exit(failures > 0 ? 1 : 0);

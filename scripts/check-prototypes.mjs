#!/usr/bin/env node
/**
 * Domain-neutral integrity checks for the self-contained HTML prototypes.
 *
 * Hard failures (exit 1):
 *   - index.html missing / empty / not closed;
 *   - inline <script> blocks have JS syntax errors;
 *   - literal navigation targets go('id') reference a missing element id;
 *   - canonical fixture terms are absent from the build.
 *
 * Warnings only (exit stays 0):
 *   - internal status/debug terms visible in rendered text (the veterinary
 *     build is FROZEN for P-02 with known deferred findings, see its BUILD.md;
 *     findings are reported, never fixed here).
 *
 * Read-only: this script MUST NOT modify prototypes (UX validation builds are frozen).
 */
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";

const BUILDS = [
  {
    dir: "prototypes/grooming-validation-build-v1",
    // Canonical terms from research/fixtures/grooming-validation-v1.md (v1.1, C-06)
    fixtureTerms: ["Боня", "Анна Петрова", "Мария", "Ольга", "Комплексный груминг"],
  },
  {
    dir: "prototypes/veterinary-validation-build-v1",
    // Canonical terms from research/fixtures/veterinary-validation-v1.md
    fixtureTerms: ["Боня", "Иванова", "Здоровые лапы", "левое ухо", "НАБЛЮДЕНИЕ", "СРОЧНАЯ ПОМОЩЬ"],
  },
];

const INTERNAL_TERMS = /\b(FROZEN|TEST_CANDIDATE|HYPOTHESIS|TEST[_-]ONLY|FIXTURE|DRAFT)\b/i;

let failures = 0;
let warnings = 0;
const fail = (msg) => { failures++; console.error(`FAIL  ${msg}`); };
const warn = (msg) => { warnings++; console.warn(`WARN  ${msg}`); };
const ok = (msg) => console.log(`ok    ${msg}`);

function stripToVisibleText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
}

for (const build of BUILDS) {
  const file = `${build.dir}/index.html`;
  if (!existsSync(file)) { fail(`${file}: not found`); continue; }
  const html = readFileSync(file, "utf8");
  if (!html.trim()) { fail(`${file}: empty`); continue; }
  if (!/<!doctype html>/i.test(html) || !/<\/html>\s*$/.test(html)) {
    fail(`${file}: missing DOCTYPE or closing </html>`);
  }

  // JS syntax of inline scripts (parse only, never execute)
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [i, m] of scripts.entries()) {
    try {
      new vm.Script(m[1], { filename: `${file}#script${i + 1}` });
    } catch (e) {
      fail(`${file} inline script #${i + 1}: JS syntax error: ${e.message}`);
    }
  }
  ok(`${file}: ${scripts.length} inline script(s) parse`);

  // Deterministic navigation: every literal go('id') must resolve to an element id
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const targets = new Set(
    [...html.matchAll(/\bgo\(\s*'([^']+)'\s*\)/g)].map((m) => m[1])
      .concat([...html.matchAll(/\bgo\(\s*"([^"]+)"\s*\)/g)].map((m) => m[1])),
  );
  for (const t of targets) {
    if (!ids.has(t)) fail(`${file}: go('${t}') has no matching element id`);
  }
  ok(`${file}: ${targets.size} navigation target(s) resolve`);

  // Fixture terms
  for (const term of build.fixtureTerms) {
    if (!html.includes(term)) fail(`${file}: fixture term missing: «${term}»`);
  }
  ok(`${file}: ${build.fixtureTerms.length} fixture term(s) present`);

  // Visible internal/debug terms — warning only (frozen builds, report-only policy)
  const visible = stripToVisibleText(html);
  for (const [i, line] of visible.split("\n").entries()) {
    if (INTERNAL_TERMS.test(line)) {
      warn(`${file}:${i + 1}: internal term visible in rendered text: ${line.trim().slice(0, 120)}`);
    }
  }
}

console.log(`\n${failures} failure(s), ${warnings} warning(s)`);
process.exit(failures > 0 ? 1 : 0);

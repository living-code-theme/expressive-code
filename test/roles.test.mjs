// Port-owned role-contract tests, exercising generated files and real grammars.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {resolveAll} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';
import {bundledThemes,createHighlighter} from 'shiki';
import {SAMPLES} from './contract.mjs';

const flavors = resolveAll();

const root = new URL("../", import.meta.url);

const read = (path) => readFileSync(new URL(path, root), "utf8");

const TEXTMATE_PORTS = {"expressive-code": (f) => JSON.parse(read(`${f.slug}.json`))};

const at = (code, needle) => {
  const [text, nth = "1"] = needle.split(/#(?=\d+$)/);
  let i = -1;
  for (let n = 0; n < Number(nth); n++) {
    i = code.indexOf(text, i + 1);
    if (i < 0) throw new Error(`"${text}" occurs fewer than ${nth} times in the sample`);
  }
  return i;
};

const norm = (hex) => hex?.toLowerCase().slice(0, 7);

test("TextMate ports give every sample token its role (VS Code, Expressive Code, tmTheme, Sublime Text, Hunk)", async () => {
  const themes = [];
  for (const f of flavors) for (const [port, load] of Object.entries(TEXTMATE_PORTS)) {
    themes.push({ ...(await load(f)), name: `${port}:${f.id}`, type: f.light ? "light" : "dark", port, f });
  }
  const hl = await createHighlighter({ themes, langs: [...new Set(SAMPLES.map((s) => s.lang))] });
  const failures = [];
  for (const { lang, code, expect } of SAMPLES) {
    for (const theme of themes) {
      const tokens = hl.codeToTokensBase(code, { lang, theme: theme.name }).flat();
      for (const [needle, role] of expect) {
        const offset = at(code, needle);
        const token = tokens.find((t) => t.offset <= offset && offset < t.offset + t.content.length);
        const got = norm(token?.color), want = norm(theme.f.r(role));
        if (got !== want) failures.push(`${theme.name} ${lang} ${JSON.stringify(needle)}: ${role} is ${want}, got ${got}`);
      }
    }
  }
  assert.deepEqual(failures, []);
});

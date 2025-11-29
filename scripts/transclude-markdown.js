#!/usr/bin/env node
const fs = require("fs");
const { join } = require("path");
const { cwd } = require("process");
const path = "README.md";

const marker = /<!-- include (.+?) -->/;
const orig = fs.readFileSync(join(cwd(), "README.md"), "utf8");

const idx = orig.search(marker);

if (idx === -1) {
  console.error("Marker not found");
  process.exit(1);
}

const match = orig.match(marker);
const p = match[1].trim();

const docs = fs.readFileSync(join(cwd(), p), "utf8");

const before = orig.slice(0, idx + match[0].length);

const afterMarker = "<!-- /include -->";
let afterIdx = orig.indexOf(afterMarker, idx);
if (afterIdx === -1) {
  afterIdx = orig.length;
}

const after = orig.slice(afterIdx);

fs.writeFileSync(path, before + "\n" + docs + "\n" + after);

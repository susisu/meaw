"use strict";

const path = require("path");
const { readFile, writeFile } = require("./common.js");

const SOURCE_PATH = path.resolve(__dirname, "./EastAsianWidth.txt");
const TARGET_PATH = path.resolve(__dirname, "../src/defs.js");

const ENCODING = "utf-8";

const DEFAULT_PROP_VALUE = "N";
const MIN_CODE_POINT     = 0x0000;
const MAX_CODE_POINT     = 0x10FFFF;

const HEADER = `/*
 * Generated by script. DO NOT EDIT!
 *
 * This part is derived from Unicode Data Files and provided under Unicode, Inc. License Agreement.
 */

/* BEGIN */`;

const FOOTER = "/* END */";

function parseDef(str) {
  const [range, prop]      = str.split(/\s*;\s*/, 2);
  const [startStr, endStr] = range.split(/\s*\.\.\s*/, 2);
  const start = parseInt(startStr, 16);
  const end   = parseInt(endStr || startStr, 16);
  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new Error("unknown range");
  }
  return { start, end, prop };
}

function generateJS(defs) {
  const a = defs
    .map(def => `  { start: ${def.start}, end: ${def.end}, prop: "${def.prop}" }`)
    .join(",\n");
  return `${HEADER}\nexport default [\n${a}\n];\n${FOOTER}\n`;
}

async function generate() {
  const src = (await readFile(SOURCE_PATH, { encoding: ENCODING }))
    .split(/[\r\n]+/)                                      // split lines
    .map(line => line.replace(/^([^#]*).*$/, "$1").trim()) // strip comments
    .filter(line => line !== "")                           // remove empty lines
    .map(parseDef);                                        // parse
  // complete and merge definitions
  const defs = [];
  let prev = null;
  for (const def of src) {
    if (!prev) {
      // complete head
      if (def.start !== MIN_CODE_POINT) {
        prev = {
          start: MIN_CODE_POINT,
          end  : def.start - 1,
          prop : DEFAULT_PROP_VALUE,
        };
      } else {
        prev = def;
        continue;
      }
    }
    // complete
    if (prev.end + 1 !== def.start) {
      if (prev.prop === DEFAULT_PROP_VALUE) {
        prev = {
          start: prev.start,
          end  : def.start - 1,
          prop : DEFAULT_PROP_VALUE,
        };
      } else {
        defs.push(prev);
        prev = {
          start: prev.end + 1,
          end  : def.start - 1,
          prop : DEFAULT_PROP_VALUE,
        };
      }
    }
    // merge
    if (prev.prop === def.prop && prev.end + 1 === def.start) {
      prev = {
        start: prev.start,
        end  : def.end,
        prop : prev.prop,
      };
    } else {
      defs.push(prev);
      prev = def;
    }
  }
  if (prev) {
    // complete tail
    if (prev.end !== MAX_CODE_POINT) {
      if (prev.prop === DEFAULT_PROP_VALUE) {
        prev = {
          start: prev.start,
          end  : MAX_CODE_POINT,
          prop : DEFAULT_PROP_VALUE,
        };
      } else {
        defs.push(prev);
        prev = {
          start: prev.end + 1,
          end  : MAX_CODE_POINT,
          prop : DEFAULT_PROP_VALUE,
        };
      }
    }
    // push last def
    defs.push(prev);
  }
  await writeFile(TARGET_PATH, generateJS(defs), { encoding: ENCODING });
}

generate().catch(err => {
  console.error(err); // eslint-disable-line no-console
});

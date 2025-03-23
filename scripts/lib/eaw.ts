export function readVersion(src: string): string {
  const res = /^# EastAsianWidth-(.+).txt/u.exec(src);
  if (!res) {
    throw new Error("failed to get version");
  }
  return res[1];
}

const DEFAULT_PROP_VALUE = "N";
const MIN_CODE_POINT = 0x0000;
const MAX_CODE_POINT = 0x10ffff;

const eastAsianWidths = ["N", "Na", "W", "F", "H", "A"] as const;
export type EastAsianWidth = (typeof eastAsianWidths)[number];

function isEastAsianWidth(prop: string): prop is EastAsianWidth {
  return eastAsianWidths.some((p) => p === prop);
}

export type EAWDef = Readonly<{
  start: number;
  end: number;
  prop: EastAsianWidth;
}>;

function readDef(line: string): EAWDef {
  const [range, prop] = line.split(/\s*;\s*/u, 2);
  if (!isEastAsianWidth(prop)) {
    throw new Error(`unknown prop: ${prop}`);
  }
  const [startStr, endStr] = range.split(/\s*\.\.\s*/u, 2);
  const start = parseInt(startStr, 16);
  const end = parseInt(endStr || startStr, 16);
  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new Error(`invalid range: ${start}, ${end}`);
  }
  return { start, end, prop };
}

export function readDefs(src: string): readonly EAWDef[] {
  const defs = src
    .split(/[\r\n]+/u) // split lines
    .map((line) => line.replace(/^([^#]*).*$/u, "$1").trim()) // strip comments
    .filter((line) => line !== "") // remove empty lines
    .map(readDef); // parse
  // complete and merge definitions
  const completeDefs: EAWDef[] = [];
  let prev: EAWDef | undefined = undefined;
  for (const def of defs) {
    if (!prev) {
      // complete head
      if (def.start !== MIN_CODE_POINT) {
        prev = {
          start: MIN_CODE_POINT,
          end: def.start - 1,
          prop: DEFAULT_PROP_VALUE,
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
          end: def.start - 1,
          prop: DEFAULT_PROP_VALUE,
        };
      } else {
        completeDefs.push(prev);
        prev = {
          start: prev.end + 1,
          end: def.start - 1,
          prop: DEFAULT_PROP_VALUE,
        };
      }
    }
    // merge
    if (prev.prop === def.prop && prev.end + 1 === def.start) {
      prev = {
        start: prev.start,
        end: def.end,
        prop: prev.prop,
      };
    } else {
      completeDefs.push(prev);
      prev = def;
    }
  }
  if (prev) {
    // complete tail
    if (prev.end !== MAX_CODE_POINT) {
      if (prev.prop === DEFAULT_PROP_VALUE) {
        prev = {
          start: prev.start,
          end: MAX_CODE_POINT,
          prop: DEFAULT_PROP_VALUE,
        };
      } else {
        completeDefs.push(prev);
        prev = {
          start: prev.end + 1,
          end: MAX_CODE_POINT,
          prop: DEFAULT_PROP_VALUE,
        };
      }
    }
    // push last def
    completeDefs.push(prev);
  }
  return completeDefs;
}

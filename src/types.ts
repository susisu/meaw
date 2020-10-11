export type EastAsianWidth = "N" | "Na" | "W" | "F" | "H" | "A";

export type EAWDef = Readonly<{
  start: number;
  end: number;
  prop: EastAsianWidth;
}>;

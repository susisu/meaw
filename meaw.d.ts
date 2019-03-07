declare namespace meaw {
    export type EastAsianWidth = "N" | "Na" | "W" | "F" | "H" | "A";

    export function getEAW(str: string, at?: number): EastAsianWidth;
    export function computeWidth(
        str: string,
        widthMap?: { [P in EastAsianWidth]?: number }
    ): number;
}

export = meaw;

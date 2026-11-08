/** A colour as red, green, blue (0–255) and alpha (0–1) */
export interface Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
}

/** A colour as hue (0–360), saturation and value (0–1) and alpha (0–1) */
export interface Hsva {
    h: number;
    s: number;
    v: number;
    a: number;
}

const hexPattern = /^#?([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
const rgbPattern = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/i;
const srgbNumber = String.raw`(-?[\d.]+(?:e[+-]?\d+)?%?)`;
const srgbPattern = new RegExp(String.raw`^color\(\s*srgb\s+${srgbNumber}\s+${srgbNumber}\s+${srgbNumber}(?:\s*/\s*${srgbNumber})?\s*\)$`, 'i');

export class ColorHelper {
    private static context: CanvasRenderingContext2D | undefined;
    private static isContextCreated = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    /** Reads any CSS colour (hex, rgb(), a name such as `red`, …); undefined if it is none */
    public static parse(value: string | undefined): Rgba | undefined {
        const text = value?.trim();
        if (!text) {
            return undefined;
        }
        return this.parseHex(text) ?? this.parseRgb(text) ?? this.parseSrgb(text) ?? this.parseByCanvas(text);
    }

    /** `#rrggbb`, or `#rrggbbaa` when the colour is not opaque and alpha is allowed */
    public static toHex(color: Rgba, hasAlpha = true): string {
        const hex = '#' + [color.r, color.g, color.b].map(part => this.toHexPart(part)).join('');
        return hasAlpha && color.a < 1 ? hex + this.toHexPart(color.a * 255) : hex;
    }

    public static toHsva(color: Rgba): Hsva {
        const r = color.r / 255;
        const g = color.g / 255;
        const b = color.b / 255;
        const max = Math.max(r, g, b);
        const delta = max - Math.min(r, g, b);
        let h = 0;
        if (delta > 0) {
            if (max === r) {
                h = ((g - b) / delta) % 6;
            }
            else if (max === g) {
                h = (b - r) / delta + 2;
            }
            else {
                h = (r - g) / delta + 4;
            }
        }
        h = (h * 60 + 360) % 360;
        return { h, s: max === 0 ? 0 : delta / max, v: max, a: color.a };
    }

    public static toRgba(color: Hsva): Rgba {
        const chroma = color.v * color.s;
        const section = color.h / 60;
        const x = chroma * (1 - Math.abs(section % 2 - 1));
        const [r, g, b] = section < 1 ? [chroma, x, 0]
            : section < 2 ? [x, chroma, 0]
                : section < 3 ? [0, chroma, x]
                    : section < 4 ? [0, x, chroma]
                        : section < 5 ? [x, 0, chroma]
                            : [chroma, 0, x];
        const m = color.v - chroma;
        return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255), a: color.a };
    }

    private static toHexPart(value: number): string {
        return Math.round(Math.min(255, Math.max(0, value))).toString(16).padStart(2, '0');
    }

    private static parseHex(text: string): Rgba | undefined {
        const match = hexPattern.exec(text);
        if (!match) {
            return undefined;
        }
        let hex = match[1];
        if (hex.length <= 4) {
            // #rgb(a) is short for #rrggbb(aa)
            hex = hex.replaceAll(/./g, '$&$&');
        }
        const part = (index: number): number => Number.parseInt(hex.slice(index, index + 2), 16);
        return { r: part(0), g: part(2), b: part(4), a: hex.length === 8 ? part(6) / 255 : 1 };
    }

    private static parseRgb(text: string): Rgba | undefined {
        const match = rgbPattern.exec(text);
        if (!match) {
            return undefined;
        }
        const alphaText = match.at(4);
        let alpha = 1;
        if (alphaText !== undefined) {
            alpha = alphaText.endsWith('%') ? Number(alphaText.slice(0, -1)) / 100 : Number(alphaText);
        }
        const channel = (value: string): number => {
            const number = Math.round(Number(value));
            return Math.min(255, Math.max(0, number));
        };
        return { r: channel(match[1]), g: channel(match[2]), b: channel(match[3]), a: Math.min(1, Math.max(0, alpha)) };
    }

    // `color(srgb 0.98 0.5 0 / 0.5)`: how a browser writes the computed value of a `color-mix()`
    private static parseSrgb(text: string): Rgba | undefined {
        const match = srgbPattern.exec(text);
        if (!match) {
            return undefined;
        }
        const ratio = (value: string): number => {
            const number = value.endsWith('%') ? Number(value.slice(0, -1)) / 100 : Number(value);
            return Math.min(1, Math.max(0, number));
        };
        const alphaText = match.at(4);
        return {
            r: Math.round(ratio(match[1]) * 255),
            g: Math.round(ratio(match[2]) * 255),
            b: Math.round(ratio(match[3]) * 255),
            a: alphaText === undefined ? 1 : ratio(alphaText)
        };
    }

    // Named colours, hsl(), … : the canvas normalises a CSS colour to `#rrggbb`, `rgba(…)` or (e.g. a `color-mix()`) to
    // `color(srgb …)`, and keeps its previous fill style for anything it can't read. So it is tested against two different
    // starting values.
    private static parseByCanvas(text: string): Rgba | undefined {
        if (!this.isContextCreated) {
            this.isContextCreated = true;
            this.context = typeof document === 'undefined' ? undefined : document.createElement('canvas').getContext('2d') ?? undefined;
        }
        const context = this.context;
        if (!context) {
            return undefined;
        }
        context.fillStyle = '#000000';
        context.fillStyle = text;
        const first = context.fillStyle;
        context.fillStyle = '#ffffff';
        context.fillStyle = text;
        if (first !== context.fillStyle) {
            return undefined;
        }
        return this.parseHex(first) ?? this.parseRgb(first) ?? this.parseSrgb(first);
    }
}

export const themeColorNames = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'] as const;
export type ThemeColorName = typeof themeColorNames[number];

export const themeRoleNames = ['primary', 'secondary', 'positive', 'negative', 'warning', 'info', 'neutral'] as const;
export type ThemeRoleName = typeof themeRoleNames[number];

/**
 * Base tokens of the mantic theme that can be changed at runtime. Any CSS value is accepted, e.g. `'#e03997'`,
 * `'light-dark(#fff, #000)'` or `'var(--my-brand)'`. Derived tokens (hover, active, subtle and text-on-color variants,
 * radius scale, shadows) follow automatically.
 */
export interface ThemeTokens {
    /** Palette colors, used by the color classes (`<m-button red>`) */
    colors?: Partial<Record<ThemeColorName, string>>;
    primary?: string;
    secondary?: string;
    positive?: string;
    negative?: string;
    warning?: string;
    info?: string;
    /** Background of uncolored controls, e.g. a plain button */
    neutral?: string;
    /** Page background */
    background?: string;
    /** Background of segments, cards, modals */
    surface?: string;
    /** Background of secondary areas, e.g. table headers */
    surfaceMuted?: string;
    text?: string;
    textMuted?: string;
    border?: string;
    borderStrong?: string;
    focus?: string;
    link?: string;
    shadowColor?: string;
    disabledOpacity?: string | number;
    /** How much hover darkens (light mode) or lightens (dark mode) a color, e.g. `'8%'` */
    hoverAmount?: string;
    activeAmount?: string;
    /** Share of the color in its tinted background variant, e.g. `'12%'` */
    subtleAmount?: string;
    /** OKLCH lightness (0–1) above which text on a color turns black instead of white */
    onThreshold?: string | number;
    fontFamily?: string;
    fontFamilyMono?: string;
    /** Sets the rem of the page: only effective on `:root`, not in a scope */
    fontSize?: string;
    lineHeight?: string;
    fontWeightNormal?: string | number;
    fontWeightBold?: string | number;
    fontSizeH1?: string;
    fontSizeH2?: string;
    fontSizeH3?: string;
    fontSizeH4?: string;
    fontSizeH5?: string;
    lineHeightHeader?: string;
    radius?: string;
    radiusPill?: string;
    borderWidth?: string;
    /** Scales the inner spacing of all components: 0.75 compact, 1 default, 1.25 comfortable */
    density?: string | number;
    duration?: string;
    easing?: string;
}

/** Every token except the palette */
export type ThemeTokenName = Exclude<keyof ThemeTokens, 'colors'>;

/** Name of the CSS custom property behind a token, e.g. `surfaceMuted` → `--m-surface-muted` */
export function toTokenProperty(token: ThemeTokenName): string {
    return '--m-' + token.replaceAll(/[A-Z]/g, char => '-' + char.toLowerCase());
}

/** Name of the CSS custom property behind a palette color, e.g. `red` → `--m-color-red` */
export function toColorProperty(color: ThemeColorName): string {
    return '--m-color-' + color;
}

/** Flattens tokens into CSS custom properties. Tokens set to undefined or an empty string are left out. */
export function toTokenProperties(tokens: ThemeTokens): Map<string, string> {
    const properties = new Map<string, string>();
    const { colors = {}, ...values } = tokens;
    // Optional tokens can be explicitly set to undefined at runtime
    const tokenValues = Object.entries(values) as [string, string | number | undefined][];
    for (const [token, value] of tokenValues) {
        if (value !== undefined && value !== '') {
            properties.set(toTokenProperty(token as ThemeTokenName), String(value));
        }
    }
    const colorValues = Object.entries(colors);
    for (const [color, value] of colorValues) {
        if (value) {
            properties.set(toColorProperty(color as ThemeColorName), value);
        }
    }
    return properties;
}

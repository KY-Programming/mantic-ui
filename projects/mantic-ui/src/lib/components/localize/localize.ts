export const localizeDictionary = new Map<string, string>();

export function localize(key: string, fallback?: string): string {
    return localizeDictionary.get(key) ?? fallback ?? key;
}

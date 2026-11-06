// index.html lists one icon per size plus an SVG, and browsers prefer the SVG. All of them have to change, otherwise the switch has no effect.
export const setFavicon = (path: string): void => {
    document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]').forEach(icon => icon.href = globalThis.location.origin + path);
};

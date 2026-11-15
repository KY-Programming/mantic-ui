import { DOCUMENT, inject, Service } from '@angular/core';
import { ThemeTokens, toTokenProperties } from './theme-tokens';

/**
 * Changes mantic theme tokens at runtime, for the whole page (`:root`) or for one element and its descendants.
 * Use the `m-theme-tokens` directive for a subtree in a template; it also marks the element as a token scope.
 */
@Service()
export class ThemeTokenService {
    private readonly document = inject(DOCUMENT);
    private readonly applied = new WeakMap<HTMLElement, Set<string>>();

    /**
     * Sets the tokens on the target (default `:root`) and removes every token a previous call set there but this one
     * does not, so each call describes the complete set of overrides for that element.
     * A target other than `:root` needs the `m-theme-scope` attribute, or derived tokens ignore the overrides.
     */
    public apply(tokens: ThemeTokens, target: HTMLElement = this.document.documentElement): void {
        const properties = toTokenProperties(tokens);
        const previous = this.applied.get(target) ?? new Set<string>();
        for (const name of previous) {
            if (!properties.has(name)) {
                target.style.removeProperty(name);
            }
        }
        for (const [name, value] of properties) {
            target.style.setProperty(name, value);
        }
        this.applied.set(target, new Set(properties.keys()));
    }

    /** Removes every token this service set on the target (default `:root`) */
    public clear(target: HTMLElement = this.document.documentElement): void {
        this.apply({}, target);
    }
}

import { DestroyRef, Directive, effect, ElementRef, inject, input } from '@angular/core';
import { ThemeTokenService } from './theme-token.service';
import { ThemeTokens } from './theme-tokens';

/**
 * Overrides mantic theme tokens for this element and its descendants:
 * `<section [m-theme-tokens]="{ primary: '#e03997', radius: '1rem' }">`
 */
@Directive({
    selector: '[m-theme-tokens]',
    host: {
        'm-theme-scope': ''
    }
})
export class ThemeTokensDirective {
    private readonly service = inject(ThemeTokenService);
    private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    public readonly tokens = input.required<ThemeTokens>({ alias: 'm-theme-tokens' });

    public constructor() {
        effect(() => this.service.apply(this.tokens(), this.element));
        inject(DestroyRef).onDestroy(() => this.service.clear(this.element));
    }
}

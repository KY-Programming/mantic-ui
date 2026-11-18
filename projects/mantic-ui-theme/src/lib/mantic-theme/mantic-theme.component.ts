import { Component, computed, DestroyRef, DOCUMENT, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { BooleanLike, InputDefaultsComponent, toBoolean } from '@mantic-ui/angular';

/**
 * Loads the mantic theme and sets the color scheme of the page.
 * Dark mode is driven by `color-scheme`, every token switches through light-dark(); components are not inverted.
 */
@Component({
    selector: 'm-mantic-theme',
    imports: [InputDefaultsComponent],
    template: '<m-input-defaults [hideReadonlyIcon]="noReadonlyLock()" /><ng-content />',
    styleUrl: './mantic-theme.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ManticThemeComponent {
    private readonly document = inject(DOCUMENT);
    public readonly dark = input<boolean, BooleanLike>(false, { transform: toBoolean });
    /** Follows the dark mode setting of the operating system, also when it changes while the app is open */
    public readonly auto = input<boolean, BooleanLike>(false, { transform: toBoolean });
    /** Hides the lock of readonly fields (inputs, m-textarea, m-dropdown) in the whole app */
    public readonly noReadonlyLock = input<boolean, BooleanLike>(false, { transform: toBoolean });
    protected readonly colorScheme = computed(() => this.auto() ? 'light dark' : this.dark() ? 'dark' : 'light');

    public constructor() {
        const root = this.document.documentElement;
        effect(() => root.style.setProperty('color-scheme', this.colorScheme()));
        inject(DestroyRef).onDestroy(() => root.style.removeProperty('color-scheme'));
    }
}

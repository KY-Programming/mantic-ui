import { Component, effect, inject, input, untracked, ViewContainerRef } from '@angular/core';
import { ComponentParser } from './component-parser';

@Component({
    selector: 'm-dynamic-component',
    template: ''
})
export class DynamicComponentComponent {
    private readonly viewContainerRef = inject(ViewContainerRef);
    public readonly code = input.required<string | undefined>();
    public readonly data = input<Record<string, unknown>>();

    public constructor() {
        effect(() => {
            const code = this.code();
            ComponentParser.parse(code, this.viewContainerRef, untracked(() => this.data()));
        });
    }
}

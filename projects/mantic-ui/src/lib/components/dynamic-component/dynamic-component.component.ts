import { Component, inject, Input, ViewContainerRef } from '@angular/core';

import { ComponentParser } from './component-parser';

@Component({
    selector: 'm-dynamic-component',
    imports: [],
    template: '',
    styleUrls: []
})
export class DynamicComponentComponent {
    private readonly viewContainerRef = inject(ViewContainerRef);
    private codeValue: string | undefined;

    @Input({ required: true })
    public get code(): string | undefined {
        return this.codeValue;
    }

    public set code(value: string | undefined) {
        this.codeValue = value;
        ComponentParser.parse(value, this.viewContainerRef, this.data);
    }

    @Input()
    public data: Record<string, unknown> | undefined;
}

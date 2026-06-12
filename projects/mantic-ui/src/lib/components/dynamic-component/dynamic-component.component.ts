import { Component, inject, Input, ViewContainerRef, ChangeDetectionStrategy, input } from '@angular/core';

import { ComponentParser } from './component-parser';

@Component({
    selector: 'm-dynamic-component',
    imports: [],
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: []
})
export class DynamicComponentComponent {
    private readonly viewContainerRef = inject(ViewContainerRef);
    private codeValue: string | undefined;

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input({ required: true })
    public get code(): string | undefined {
        return this.codeValue;
    }

    public set code(value: string | undefined) {
        this.codeValue = value;
        ComponentParser.parse(value, this.viewContainerRef, this.data());
    }

    public readonly data = input<Record<string, unknown>>();
}

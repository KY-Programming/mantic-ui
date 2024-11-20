import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentParser } from './component-parser';

@Component({
    selector: 'm-dynamic-component',
    imports: [CommonModule],
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

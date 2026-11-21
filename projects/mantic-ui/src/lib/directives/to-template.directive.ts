import { Directive, effect, input, TemplateRef, inject } from '@angular/core';
import { TemplateTarget } from '../models/template-target';

@Directive({
    selector: '[m-to-template]'
})
export class ToTemplateDirective {
    private readonly template = inject<TemplateRef<unknown>>(TemplateRef);

    public readonly toTemplate = input.required<TemplateTarget>({ alias: 'm-to-template' });

    public constructor() {
        effect(() => {
            this.toTemplate().template = this.template;
        });
    }
}

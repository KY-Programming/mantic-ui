import { Directive, effect, input, TemplateRef } from '@angular/core';
import { TemplateTarget } from '../models/template-target';

@Directive({
    selector: '[m-to-template]'
})
export class ToTemplateDirective {
    public readonly toTemplate = input.required<TemplateTarget>({ alias: 'm-to-template' });

    public constructor(
        private readonly template: TemplateRef<unknown>
    ) {
        effect(() => {
            this.toTemplate().template = this.template;
        });
    }
}

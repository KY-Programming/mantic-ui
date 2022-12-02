import { Directive, Input, TemplateRef } from '@angular/core';
import { TemplateTarget } from '../models/template-target';

@Directive({
    selector: '[m-to-template]'
})
export class ToTemplateDirective {
    @Input('m-to-template')
    public set toTemplate(target: TemplateTarget) {
        target.template = this.template;
    }

    public constructor(
        private readonly template: TemplateRef<unknown>
    ) { }
}

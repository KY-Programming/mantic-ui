import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[m-to-template]'
})
export class ToTemplateDirective {
    @Input('m-to-template')
    public set toTemplate(target: TemplateTarget) {
        target.template = this.template;
    }

    constructor(
        private readonly template: TemplateRef<unknown>
    ) { }
}

export class TemplateTarget {
    public template: TemplateRef<unknown>;
}

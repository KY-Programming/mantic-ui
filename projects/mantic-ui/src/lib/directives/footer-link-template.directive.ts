import { Directive, TemplateRef } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Directive({
    selector: '[m-footer-link-template]'
})
export class FooterLinkTemplateDirective {
    public constructor(
        private readonly menuService: LayoutService,
        private readonly template: TemplateRef<unknown>
    ) {
        this.menuService.footerTemplates.push(this.template);
    }
}

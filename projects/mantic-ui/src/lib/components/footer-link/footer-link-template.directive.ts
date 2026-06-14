import { Directive, inject, TemplateRef } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Directive({
    selector: '[m-footer-link-template]'
})
export class FooterLinkTemplateDirective {
    private readonly layoutService = inject(LayoutService);
    private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);

    public constructor() {
        this.layoutService.footerTemplates.push(this.templateRef);
    }
}

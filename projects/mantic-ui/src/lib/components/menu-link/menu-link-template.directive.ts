import { Directive, inject, TemplateRef } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Directive({
    selector: '[m-menu-link-template]'
})
export class MenuLinkTemplateDirective {
    private readonly layoutService = inject(LayoutService);
    private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);

    public constructor() {
        this.layoutService.menuTemplates.push(this.templateRef);
    }
}

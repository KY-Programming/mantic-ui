import { Directive, TemplateRef } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Directive({
    selector: '[m-menu-link-template]'
})
export class MenuLinkTemplateDirective {
    public constructor(
        private readonly menuService: LayoutService,
        private readonly template: TemplateRef<unknown>
    ) {
        this.menuService.menuTemplates.push(this.template);
    }
}

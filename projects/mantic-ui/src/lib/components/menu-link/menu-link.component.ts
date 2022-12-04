import { Component } from '@angular/core';
import { TemplateTarget } from '../../models/template-target';
import { MenuLinkTemplateDirective } from '../../directives/menu-link-template.directive';

@Component({
    selector: 'm-menu-link',
    templateUrl: './menu-link.component.html',
    styleUrls: ['./menu-link.component.scss'],
    standalone: true,
    imports: [
        MenuLinkTemplateDirective
    ]
})
export class MenuLinkComponent {

    public readonly target = new TemplateTarget();

}

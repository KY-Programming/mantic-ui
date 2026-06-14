import { Component } from '@angular/core';
import { TemplateTarget } from '../../models/template-target';
import { FooterLinkTemplateDirective } from './footer-link-template.directive';

@Component({
    selector: 'm-footer-link',
    templateUrl: './footer-link.component.html',
    styleUrls: ['./footer-link.component.scss'],
    imports: [FooterLinkTemplateDirective]
})
export class FooterLinkComponent {
    public readonly target = new TemplateTarget();
}

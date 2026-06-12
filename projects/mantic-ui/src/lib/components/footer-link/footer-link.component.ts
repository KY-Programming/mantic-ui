import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TemplateTarget } from '../../models/template-target';
import { FooterLinkTemplateDirective } from '../../directives/footer-link-template.directive';

@Component({
    selector: 'm-footer-link',
    templateUrl: './footer-link.component.html',
    styleUrls: ['./footer-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        FooterLinkTemplateDirective
    ]
})
// TODO: Implement
export class FooterLinkComponent {

    public readonly target = new TemplateTarget();
}

import { Component } from '@angular/core';
import { TemplateTarget } from '../../models/template-target';

@Component({
    selector: 'm-footer-link',
    templateUrl: './footer-link.component.html',
    styleUrls: ['./footer-link.component.scss']
})
// TODO: Implement
export class FooterLinkComponent /*extends ElementBase*/ {

    public readonly target = new TemplateTarget();
}

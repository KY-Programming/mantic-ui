import { Component } from '@angular/core';
import { TemplateTarget } from '../directives/to-template.directive';

@Component({
  selector: 'm-footer-link',
  templateUrl: './footer-link.component.html',
  styleUrls: ['./footer-link.component.scss']
})
export class FooterLinkComponent /*extends ElementBase*/ {

  public readonly target = new TemplateTarget();
}

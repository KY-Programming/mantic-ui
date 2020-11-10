import { Component } from '@angular/core';
import { TemplateTarget } from '../models/template-target';

@Component({
  selector: 'm-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss']
})
export class MenuLinkComponent {

  public readonly target = new TemplateTarget();

}

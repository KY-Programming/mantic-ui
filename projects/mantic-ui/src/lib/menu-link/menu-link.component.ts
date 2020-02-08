import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss']
})
export class MenuLinkComponent /*extends ElementBase*/ {

  @Input()
  public active = false;

}

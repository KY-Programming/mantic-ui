import { Directive, ElementRef } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Directive({
  selector: '[m-menu-item]'
})
export class MenuItemDirective extends MenuItemComponent {

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
  }

}

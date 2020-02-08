import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent /*extends ElementBase*/ {

  @Input()
  public active = false;

  // protected getClasses(): string[] {
  //   const classes = super.getClasses();
  //   classes.push(
  //     'item'
  //   );
  //   return classes;
  // }
}

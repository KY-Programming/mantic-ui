import { Component, HostBinding, Input } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'm-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent extends MenuItemComponent {

  @HostBinding('class')
  public readonly empty = '';

  @Input()
  public label: string;

  constructor() {
    super();
  }

}

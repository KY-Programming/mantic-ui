import { AfterViewInit, Component, ContentChildren, ElementRef, HostBinding, Input, QueryList } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'm-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent extends MenuComponent implements AfterViewInit {

  @ContentChildren(TabComponent)
  public tabs: QueryList<TabComponent>;

  @HostBinding('class')
  public readonly empty = '';

  @Input()
  public position: 'top' | 'bottom' = 'top';

  constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
  }

  public ngAfterViewInit(): void {
    if (this.tabs && this.tabs.length > 0 && this.tabs.toArray().every(tab => !tab.active)) {
      setTimeout(() => this.tabs.first.active = true);
    }
  }

  public activate(tab: TabComponent): void {
    this.tabs.forEach(t => t.active = false);
    tab.active = true;
  }
}

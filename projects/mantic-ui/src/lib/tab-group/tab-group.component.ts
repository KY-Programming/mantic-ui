import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'm-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent extends MenuComponent implements OnInit, AfterViewInit {
  private selectedIndexField: number;

  @ContentChildren(TabComponent)
  public tabs: QueryList<TabComponent>;

  @HostBinding('class')
  public class: string;

  @Input()
  public position: 'top' | 'bottom' = 'top';

  @Input()
  public selectByRoute: boolean;

  @Input()
  public routeParameterName = 'tab';

  @Input()
  public set selectedIndex(value: number) {
    this.selectedIndexField = value;
    if (this.tabs) {
      this.tabs.forEach((tab, index) => tab.active = index === value);
    }
  }
  public get selectedIndex(): number {
    return this.selectedIndexField;
  }

  @Output()
  public readonly selectedIndexChange = new EventEmitter<number>();

  constructor(
    private readonly route: ActivatedRoute,
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList.registerBoolean('selectByRoute', '');
  }

  public ngAfterViewInit(): void {
    if (this.tabs && this.tabs.length > 0 && this.tabs.toArray().every(tab => !tab.active)) {
      setTimeout(() => {
        this.tabs.forEach((tab, index) => tab.active = index === (this.selectedIndex || 0));
      });
    }
    if (this.selectByRoute) {
      this.route.params.pipe(take(1)).subscribe(params => {
        let selectedTabName = params[this.routeParameterName];
        const selectedTabIndex = parseInt(selectedTabName);
        if (selectedTabName) {
          selectedTabName = selectedTabName.toLowerCase();
          const found = this.tabs.find((tab, index) => tab.name && tab.name.toLocaleLowerCase() === selectedTabName || !tab.name && tab.label.toLocaleLowerCase() === selectedTabName || selectedTabIndex === index);
          if (found) {
            setTimeout(() => this.activate(found));
          }
        }
      });
    }
  }

  public activate(tab: TabComponent): void {
    this.tabs.forEach(t => t.active = false);
    tab.active = true;
    this.selectedIndex = this.tabs.toArray().indexOf(tab);
    this.selectedIndexChange.emit(this.selectedIndex);
  }
}

import { Location } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MenuPosition } from '../menu/menu.component';
import { TabComponent } from '../tab/tab.component';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent extends BaseComponent implements OnInit, AfterViewInit {
    private selectedIndexField: number;
    private isSelectByRoute: boolean;

    @ContentChildren(TabComponent)
    public tabs: QueryList<TabComponent>;

    @Input()
    public pointing: boolean | string;

    @Input()
    public secondary: boolean | string;

    @Input()
    public position: MenuPosition = 'top';

    @Input()
    public get selectByRoute(): boolean | string {
        return this.isSelectByRoute;
    }

    public set selectByRoute(value: string | boolean) {
        this.isSelectByRoute = this.toBoolean(value);
    }

    @Input()
    public routeParameterName = 'tab';

    public get selectedIndex(): number {
        return this.selectedIndexField;
    }

    @Input()
    public set selectedIndex(value: number) {
        this.selectedIndexField = value;
        if (this.tabs) {
            this.tabs.forEach((tab, index) => tab.active = index === value);
        }
    }

    @Input()
    public noPadding: boolean | string;

    @Output()
    public readonly selectedIndexChange = new EventEmitter<number>();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly location: Location,
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('pointing', 'secondary', 'position', 'selectByRoute', 'routeParameterName');
        this.router.events.pipe(takeUntil(this.destroy)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.refreshTab();
            }
        });
    }

    public ngAfterViewInit(): void {
        if (this.tabs && this.tabs.length > 0 && this.tabs.toArray().every(tab => !tab.active)) {
            setTimeout(() => {
                this.tabs.forEach((tab, index) => tab.active = index === (this.selectedIndex || 0));
            });
        }
        this.refreshTab();
    }

    private refreshTab(): void {
        if (!this.selectByRoute) {
            return;
        }
        let selectedTabName = this.route.snapshot.params[this.routeParameterName];
        const selectedTabIndex = parseInt(selectedTabName);
        let found: TabComponent;
        if (selectedTabName) {
            selectedTabName = selectedTabName.toLowerCase();
            found = this.tabs.find((tab, index) => tab.name && tab.name.toLocaleLowerCase() === selectedTabName || !tab.name && this.toName(tab.label) === selectedTabName || selectedTabIndex === index);

        }
        else {
            found = this.tabs.find((_, index) => index === selectedTabIndex) || this.tabs.find((_, index) => index === 0);
        }
        if (found) {
            setTimeout(() => this.activate(found));
        }
    }

    public activate(tab: TabComponent): void {
        this.tabs.forEach(t => t.active = false);
        tab.active = true;
        this.selectedIndex = this.tabs.toArray().indexOf(tab);
        this.selectedIndexChange.emit(this.selectedIndex);
        if (this.selectByRoute) {
            const name = tab.name || this.toName(tab.label);
            let location = this.route.snapshot.url.slice(0, -1).join('/') + '/' + name;
            let parent = this.route.parent;
            while (parent) {
                location = parent.snapshot.url.join('/') + '/' + location;
                parent = parent.parent;
            }
            this.location.replaceState(location);
        }
    }

    private toName(value: string): string {
        return value ? value.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-') : value;
    }
}

import { Location } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
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
    private routeParameterName: string;
    private isNoPadding: boolean;
    private tabsValue: QueryList<TabComponent>;
    private isScrollable: boolean;

    @ContentChildren(TabComponent)
    public get tabs(): QueryList<TabComponent> {
        return this.tabsValue;
    }

    public set tabs(value: QueryList<TabComponent>) {
        this.tabsValue = value;
        value?.changes.pipe(takeUntil(this.destroy)).subscribe(() => this.refreshTab());
    }

    @Input()
    public pointing: boolean | string;

    @Input()
    public secondary: boolean | string;

    @Input()
    public position: MenuPosition = 'top';

    @Input()
    public get selectByRoute(): '' | string {
        return this.routeParameterName;
    }

    public set selectByRoute(value: '' | string) {
        this.isSelectByRoute = value === '' || !!value;
        this.routeParameterName = value || 'tab';
    }

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
    public get noPadding(): boolean | string {
        return this.isNoPadding;
    }

    public set noPadding(value: string | boolean) {
        this.isNoPadding = this.toBoolean(value);
    }

    @Input()
    public get scrollable(): boolean | string {
        return this.isScrollable;
    }

    public set scrollable(value: string | boolean) {
        this.isScrollable = this.toBoolean(value);
    }

    @Output()
    public readonly selectedIndexChange = new EventEmitter<number>();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly location: Location,
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.noClasses = true;
        this.classList.register('pointing', 'secondary', 'position', 'selectByRoute', 'routeParameterName', 'noPadding');
        this.router.events.pipe(takeUntil(this.destroy)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.refreshTab();
            }
        });
    }

    public ngAfterViewInit(): void {
        if (this.tabs && this.tabs.length > 0 && this.tabs.toArray().every(tab => !tab.active)) {
            setTimeout(() => {
                this.tabs.forEach((tab, index) => {
                    const shouldActivate = index === (this.selectedIndex || 0);
                    if (tab.active && !shouldActivate) {
                        tab.deactivate.emit();
                    } else if (!tab.activate && shouldActivate) {
                        tab.activate.emit();
                    }
                    tab.active = shouldActivate;
                });
            });
        }
        this.refreshTab();
    }

    private refreshTab(): void {
        if (!this.isSelectByRoute) {
            return;
        }
        let selectedTabName = this.route.snapshot.params[this.routeParameterName];
        const selectedTabIndex = parseInt(selectedTabName, 10);
        let found: TabComponent;
        if (selectedTabName) {
            selectedTabName = selectedTabName.toLowerCase();
            found = this.tabs?.find((tab, index) => tab.name && tab.name.toLocaleLowerCase() === selectedTabName || !tab.name && this.toName(tab.label) === selectedTabName || selectedTabIndex === index);

        } else {
            found = this.tabs?.find((_, index) => index === selectedTabIndex) || this.tabs?.find((_, index) => index === 0);
        }
        if (found) {
            setTimeout(() => this.activate(found));
        }
    }

    public activate(tab: TabComponent): void {
        for (const activeTab of this.tabs.filter(t => !!t.active)) {
            activeTab.active = false;
            activeTab.deactivate.emit();
        }
        tab.active = true;
        tab.activate.emit();
        this.selectedIndex = this.tabs.toArray().indexOf(tab);
        this.selectedIndexChange.emit(this.selectedIndex);
        if (this.isSelectByRoute) {
            const name = tab.name || this.toName(tab.label);
            const urlSegments = this.getUrlSegments();
            const segment = urlSegments.find(s => s.name === ':' + this.routeParameterName);
            if (segment) {
                segment.path = name;
                void this.router.navigate(urlSegments.map(s => s.path));
            } else {
                console.warn(`tab-group selectByRoute is set, but the route does not have a :${this.routeParameterName} parameter like { path: '/${urlSegments.map(s => s.path).join('/')}/:${this.routeParameterName}', component: ... }`);
            }
        }
    }

    private toName(value: string): string {
        return value ? value.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-') : value;
    }

    private getUrlSegments(): NamedUrlSegment[] {
        const segments: NamedUrlSegment[] = [];
        let current = this.route;
        do {
            if (current.snapshot?.routeConfig) {
                const names = current.routeConfig.path.split('/').reverse();
                for (let segment of current.snapshot.url.slice().reverse()) {
                    segments.unshift(new NamedUrlSegment(names.shift(), segment));
                }
            }
            current = current.parent;
        }
        while (current);
        return segments;
    }
}

class NamedUrlSegment extends UrlSegment {
    constructor(
        public readonly name: string,
        segment: UrlSegment
    ) {
        super(segment.path, segment.parameters);
        Object.assign(this, segment);
    }
}

import { AfterViewInit, Component, ContentChildren, EventEmitter, HostBinding, Input, OnInit, Output, QueryList } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MenuComponent, MenuPosition } from '../menu/menu.component';
import { TabComponent } from '../tab/tab.component';
import { BooleanLike } from '../../models/boolean-like';
import { InvertibleComponent } from '../../base/invertible.component';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SegmentComponent } from '../segment/segment.component';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'm-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SegmentComponent,
        MenuComponent,
        IconComponent
    ],
    hostDirectives: [...InvertibleComponent.directives],
    providers: [...InvertibleComponent.providers]
})
export class TabGroupComponent extends InvertibleComponent implements OnInit, AfterViewInit {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };

    private selectedIndexField: number | undefined;
    private isSelectByRoute = false;
    private routeParameterName = '';
    private isNoPadding = false;
    private tabsValue: QueryList<TabComponent> | undefined;
    private isScrollable = false;
    private isPointing = false;
    private isSecondary = false;
    private isLoading = false;

    @Input()
    public get pointing(): boolean {
        return this.isPointing;
    }

    public set pointing(value: BooleanLike) {
        this.isPointing = this.toBoolean(value);
    }

    @Input()
    public get secondary(): boolean {
        return this.isSecondary;
    }

    public set secondary(value: BooleanLike) {
        this.isSecondary = this.toBoolean(value);
    }

    @Input()
    public get loading(): boolean {
        return this.isLoading;
    }

    public set loading(value: BooleanLike) {
        this.isLoading = this.toBoolean(value);
    }

    @Input()
    public menu: MenuPosition = 'top';

    @HostBinding('class')
    protected get menuPosition(): string {
        return 'menu-' + this.menu;
    }

    @HostBinding('class.horizontal')
    protected get horizontal(): boolean {
        return this.menu === 'left' || this.menu === 'right';
    }

    @Input()
    public get selectByRoute(): string {
        return this.routeParameterName;
    }

    public set selectByRoute(value: string) {
        this.isSelectByRoute = value === '' || !!value;
        this.routeParameterName = value || 'tab';
    }

    public get selectedIndex(): number | undefined {
        return this.selectedIndexField;
    }

    @Input()
    public set selectedIndex(value: number | undefined) {
        this.selectedIndexField = value;
        if (this.tabs) {
            this.tabs.forEach((tab, index) => tab.changeState(index === value));
        }
    }

    @Input()
    public get noPadding(): boolean {
        return this.isNoPadding;
    }

    public set noPadding(value: BooleanLike) {
        this.isNoPadding = this.toBoolean(value);
    }

    @Input()
    public get scrollable(): boolean {
        return this.isScrollable;
    }

    public set scrollable(value: BooleanLike) {
        this.isScrollable = this.toBoolean(value);
    }

    @Output()
    public readonly selectedIndexChange = new EventEmitter<number>();

    @ContentChildren(TabComponent)
    protected get tabs(): QueryList<TabComponent> | undefined {
        return this.tabsValue;
    }

    protected set tabs(value: QueryList<TabComponent> | undefined) {
        this.tabsValue = value;
        value?.changes.pipe(takeUntil(this.destroy)).subscribe(() => this.refreshTab());
    }

    public constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        super(false);
        this.noClasses = true;
        this.classes.register('pointing', 'secondary', 'position', 'selectByRoute', 'routeParameterName', 'noPadding', 'menu');
        this.router.events.pipe(takeUntil(this.destroy)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.refreshTab();
            }
        });
        TabGroupComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    public ngAfterViewInit(): void {
        if (this.tabs && this.tabs.length > 0 && this.tabs.toArray().every(tab => !tab.active)) {
            setTimeout(() => {
                this.tabs?.forEach((tab, index) => {
                    tab.changeState(index === (this.selectedIndex || 0));
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
        let found: TabComponent | undefined;
        if (selectedTabName) {
            selectedTabName = selectedTabName.toLowerCase();
            found = this.tabs?.find((tab, index) => tab.name && tab.name.toLocaleLowerCase() === selectedTabName || !tab.name && this.toName(tab.label) === selectedTabName || selectedTabIndex === index);

        } else {
            found = this.tabs?.find((_, index) => index === selectedTabIndex) || this.tabs?.find((_, index) => index === 0);
        }
        if (found) {
            const found2 = found;
            setTimeout(() => this.activate(found2));
        }
    }

    protected activate(tab: TabComponent): void {
        for (const activeTab of this.tabs?.filter(t => t.active) ?? []) {
            activeTab.changeState(false);
        }
        tab.changeState(true);
        this.selectedIndex = this.tabs?.toArray().indexOf(tab);
        this.selectedIndexChange.emit(this.selectedIndex);
        if (this.isSelectByRoute) {
            const name = tab.name || this.toName(tab.label);
            const urlSegments = this.getUrlSegments();
            const segment = urlSegments.find(s => s.name === ':' + this.routeParameterName);
            if (segment?.path === name) {
                return;
            }
            if (segment) {
                const replaceUrl = !segment.path;
                segment.path = name;
                void this.router.navigate(urlSegments.map(s => s.path), { replaceUrl });
            } else {
                console.warn(`tab-group selectByRoute is set, but the route does not have a :${this.routeParameterName} parameter like { path: '/${urlSegments.map(s => s.path).join('/')}/:${this.routeParameterName}', component: ... }`);
            }
        }
    }

    private toName(value: string | undefined): string {
        return value ? value.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-') : '';
    }

    private getUrlSegments(): NamedUrlSegment[] {
        const segments: NamedUrlSegment[] = [];
        let current: ActivatedRoute | null = this.route;
        do {
            if (current?.snapshot?.routeConfig) {
                const names = current.routeConfig?.path?.split('/').reverse();
                for (const segment of current.snapshot.url.slice().reverse()) {
                    segments.unshift(new NamedUrlSegment(names?.shift() ?? '', segment));
                }
            }
            current = current?.parent;
        }
        while (current);
        return segments;
    }
}

class NamedUrlSegment extends UrlSegment {
    public constructor(
        public readonly name: string,
        segment: UrlSegment
    ) {
        super(segment.path, segment.parameters);
        Object.assign(this, segment);
    }
}

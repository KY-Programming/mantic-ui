import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, EventEmitter, HostBinding, Input, OnInit, Output, QueryList } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, Routes, UrlSegment } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { BooleanLike } from '../../models/boolean-like';
import { IconComponent } from '../icon/icon.component';
import { MenuComponent, MenuPosition } from '../menu/menu.component';
import { SegmentComponent } from '../segment/segment.component';
import { TabComponent } from '../tab/tab.component';

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
    private routes: NamedRoute[] = [];

    @Input()
    public menu: MenuPosition = 'top';

    @Output()
    public readonly selectedIndexChange = new EventEmitter<number>();

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
        this.classes.register('pointing', 'secondary', 'position', 'selectByRoute', 'routeParameterName', 'noPadding', 'menu', 'loading', 'scrollable');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.routes = this.parseRoutes(this.router.config, []);
        this.router.events.pipe(takeUntil(this.destroy)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.refreshTab();
            }
        });
        TabGroupComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    public ngAfterViewInit(): void {
        if (this.tabs && this.tabs.length > 0 && this.tabs.toArray().every(tab => !tab.active)) {
            setTimeout(() => this.tabs?.forEach((tab, index) => tab.changeState(index === (this.selectedIndex || 0))));
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

        }
        else {
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
            const urlSegments = this.getActiveRouteSegments();
            const segment = urlSegments.find(s => s.name === ':' + this.routeParameterName);
            if (segment?.path === name) {
                return;
            }
            if (segment) {
                const replaceUrl = !segment.path;
                segment.path = name;
                void this.router.navigate(urlSegments.map(s => s.path), { replaceUrl });
                return;
            }
            const activePath = urlSegments.map(segment => segment.name).join('/');
            const parameters = [
                ...urlSegments.filter(segment => segment.name.startsWith(':')).map(segment => segment.name.slice(1)),
                this.routeParameterName
            ];
            const possibleRoutes = this.routes.filter(route => route.fullPath.startsWith(activePath) && parameters.every(parameter => route.parameters.includes(parameter)))
                .sort((leftRoute, rightRoute) => leftRoute.parameters < rightRoute.parameters ? -1 : leftRoute.parameters > rightRoute.parameters ? 1 : 0);

            if (possibleRoutes.length === 0) {
                console.warn(`tab-group selectByRoute is set, but the route does not have a :${this.routeParameterName} parameter like { path: '/${urlSegments.map(s => s.path).join('/')}/:${this.routeParameterName}', component: ... }`);
                return;
            }
            const route = possibleRoutes[0];
            let fullPath = route.fullPath.replace(':' + this.routeParameterName, name);
            for (const parameterName of route.parameters) {
                const segmentValue = urlSegments.find(segment => segment.name === ':' + parameterName)?.path;
                fullPath = fullPath.replace(':' + parameterName, segmentValue ?? '');
            }
            void this.router.navigate(['/' + fullPath], { replaceUrl: true });
        }
    }

    private toName(value: string | undefined): string {
        return value ? value.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-') : '';
    }

    private getActiveRouteSegments(): NamedUrlSegment[] {
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

    private parseRoutes(routes: Routes, path: string[]): NamedRoute[] {
        const namedRoutes: NamedRoute[] = [];
        for (const route of routes) {
            const fullPath = [...path, route.path ?? ''].filter(path => !!path);
            namedRoutes.push({
                fullPath: fullPath.join('/'),
                parameters: fullPath.join('/').split('/').filter(parameter => parameter.startsWith(':')).map(parameter => parameter.slice(1)),
                ...route
            });
            if (route.children) {
                namedRoutes.push(...this.parseRoutes(route.children, fullPath));
            }
        }
        return namedRoutes;
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

interface NamedRoute extends Route {
    fullPath: string;
    parameters: string[];
}

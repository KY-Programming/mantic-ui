import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, computed, contentChildren, effect, inject, input, model, OnInit, signal, untracked } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Routes } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { IconComponent } from '../icon/icon.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuPosition } from '../menu/models/menu-position';
import { SegmentComponent } from '../segment/segment.component';
import { TabComponent } from '../tab/tab.component';
import { NamedRoute } from './models/named-route';
import { NamedUrlSegment } from './models/named-url-segment';

@Component({
    selector: 'm-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss'],
    imports: [SegmentComponent, MenuComponent, IconComponent, NgTemplateOutlet],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class]': 'menuPosition()',
        '[class.horizontal]': 'horizontal()'
    }
})
export class TabGroupComponent extends InvertibleComponent implements OnInit, AfterViewInit {
    public static readonly defaults = {
        inverted: signal(false)
    };
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private routes: NamedRoute[] = [];
    public readonly menu = input<MenuPosition>('top');
    public readonly pointing = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly secondary = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly loading = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly noPadding = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly scrollable = input<boolean, BooleanLike>(false, { transform: toBoolean });
    // Undefined default (not '') so an absent attribute stays inactive, while the bare attribute resolves to ''.
    public readonly selectByRoute = input<string | undefined>(undefined);
    public readonly selectedIndex = model<number | undefined>(undefined);
    protected readonly tabs = contentChildren(TabComponent);
    private readonly isSelectByRoute = computed(() => {
        const value = this.selectByRoute();
        return value === '' || !!value;
    });
    private readonly routeParameterName = computed(() => this.selectByRoute() || 'tab');
    protected readonly menuPosition = computed(() => 'menu-' + this.menu());
    protected readonly horizontal = computed(() => {
        const menu = this.menu();
        return menu === 'left' || menu === 'right';
    });

    public constructor() {
        super(false);
        this.noClasses = true;
        this.classes.register('pointing', 'secondary', 'position', 'selectByRoute', 'routeParameterName', 'noPadding', 'menu', 'loading', 'scrollable');
        effect(() => this.refreshInverted(TabGroupComponent.defaults.inverted()));
        // Replaces the former selectedIndex setter side effect; tabs are read untracked so it only reacts to the index.
        effect(() => {
            const value = this.selectedIndex();
            untracked(() => {
                for (const [index, tab] of this.tabs().entries()) {
                    tab.changeState(index === value);
                }
            });
        });
        // Replaces the former tabs setter subscription to QueryList.changes.
        effect(() => {
            this.tabs();
            untracked(() => this.refreshTab());
        });
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.routes = this.parseRoutes(this.router.config, []);
        this.router.events.pipe(takeUntil(this.destroy)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.refreshTab();
            }
        });
    }

    public ngAfterViewInit(): void {
        const tabs = this.tabs();
        if (tabs.length > 0 && tabs.every(tab => !tab.active())) {
            setTimeout(() => {
                for (const [index, tab] of this.tabs().entries()) {
                    tab.changeState(index === (this.selectedIndex() || 0));
                }
            });
        }
        this.refreshTab();
    }

    private refreshTab(): void {
        if (!this.isSelectByRoute()) {
            return;
        }
        const routeParameterName = this.routeParameterName();
        let selectedTabName = this.route.snapshot.params[routeParameterName];
        const selectedTabIndex = Number.parseInt(selectedTabName, 10);
        let found: TabComponent | undefined;
        if (selectedTabName) {
            selectedTabName = selectedTabName.toLowerCase();
            found = this.tabs().find((tab, index) => {
                const name = tab.name();
                if (name) {
                    return name.toLocaleLowerCase() === selectedTabName || selectedTabIndex === index;
                }
                return this.toName(tab.label()) === selectedTabName || selectedTabIndex === index;
            });

        }
        else {
            found = this.tabs().find((_, index) => index === selectedTabIndex) || this.tabs().find((_, index) => index === 0);
        }
        if (found) {
            const found2 = found;
            setTimeout(() => this.activate(found2));
        }
    }

    protected activate(tab: TabComponent): void {
        for (const activeTab of this.tabs().filter(t => t.active())) {
            activeTab.changeState(false);
        }
        tab.changeState(true);
        // selectedIndex.set emits selectedIndexChange itself (model two-way semantics).
        this.selectedIndex.set(this.tabs().indexOf(tab));
        if (this.isSelectByRoute()) {
            const routeParameterName = this.routeParameterName();
            const name = tab.name() || this.toName(tab.label());
            const urlSegments = this.getActiveRouteSegments();
            const segment = urlSegments.find(s => s.name === ':' + routeParameterName);
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
                routeParameterName
            ];
            const possibleRoutes = this.routes.filter(route => route.fullPath.startsWith(activePath) && parameters.every(parameter => route.parameters.includes(parameter)))
                .sort((leftRoute, rightRoute) => leftRoute.parameters < rightRoute.parameters ? -1 : leftRoute.parameters > rightRoute.parameters ? 1 : 0);

            if (possibleRoutes.length === 0) {
                console.warn(`tab-group selectByRoute is set, but the route does not have a :${routeParameterName} parameter like { path: '/${urlSegments.map(s => s.path).join('/')}/:${routeParameterName}', component: ... }`);
                return;
            }
            const route = possibleRoutes[0];
            let fullPath = route.fullPath.replace(':' + routeParameterName, name);
            for (const parameterName of route.parameters) {
                const segmentValue = urlSegments.find(segment => segment.name === ':' + parameterName)?.path;
                fullPath = fullPath.replace(':' + parameterName, segmentValue ?? '');
            }
            void this.router.navigate(['/' + fullPath], { replaceUrl: true });
        }
    }

    private toName(value: string | undefined): string {
        return value ? value.toLocaleLowerCase().replaceAll(/[^a-zA-Z0-9]/g, '-').replaceAll(/-+/g, '-') : '';
    }

    private getActiveRouteSegments(): NamedUrlSegment[] {
        const segments: NamedUrlSegment[] = [];
        let current: ActivatedRoute | null = this.route;
        do {
            if (current?.snapshot?.routeConfig) {
                const names = current.routeConfig?.path?.split('/').reverse();
                for (const segment of [...current.snapshot.url].reverse()) {
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

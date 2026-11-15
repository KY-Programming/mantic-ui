import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ButtonComponent, ContextMenuComponent, ContextMenuItemComponent, FillComponent, FlexComponent, FlexDirective, IconComponent } from '@mantic-ui/angular';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons';
import { setFavicon } from '../../helpers/favicon';

type Framework = 'semantic' | 'fomantic' | 'mantic';
const frameworkPattern = /^\/(semantic|fomantic|mantic)(\/|$)/;

@Component({
    selector: 'app-navigation',
    imports: [RouterLink, RouterLinkActive, FlexComponent, IconComponent, FillComponent, FlexDirective, RouterOutlet, ButtonComponent, ContextMenuComponent, ContextMenuItemComponent],
    templateUrl: './navigation.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    protected readonly faChevronLeft = faChevronLeft;
    private static previous: string;
    protected framework: Framework = 'fomantic';
    protected prefix = '';
    protected isMenuExpanded = true;

    public constructor(
        private readonly router: Router
    ) { }

    public ngOnInit(): void {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.refresh());
        this.refresh();
    }

    private refresh(): void {
        this.framework = (frameworkPattern.exec(this.router.url)?.[1] as Framework | undefined) ?? 'fomantic';
        this.prefix = this.framework;
        setFavicon(`/assets/${this.framework}.png`);
        NavigationComponent.previous = '/' + this.prefix;
    }

    /** Full reload: the theme styles are global and must not mix */
    protected switchTo(framework: Framework): void {
        const url = this.router.url;
        const current = frameworkPattern.exec(url)?.[1];
        const path = current ? url.slice(current.length + 1) : url;
        globalThis.location.assign(`/${framework}${path}`);
    }

    protected toggle(): void {
        this.isMenuExpanded = !this.isMenuExpanded;
    }
}

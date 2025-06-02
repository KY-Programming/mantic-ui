import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ButtonComponent, ContextMenuComponent, ContextMenuItemComponent, FillComponent, FlexComponent, FlexDirective, IconComponent } from '@mantic-ui/angular';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons';

@Component({
    selector: 'app-navigation',
    imports: [RouterLink, RouterLinkActive, FlexComponent, IconComponent, FillComponent, FlexDirective, RouterOutlet, ButtonComponent, ContextMenuComponent, ContextMenuItemComponent],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    protected readonly faChevronLeft = faChevronLeft;
    private static previous: string;
    protected isSemantic = false;
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
        this.isSemantic = this.router.url.startsWith('/semantic/');
        const favicon = <HTMLLinkElement>document.getElementById('favicon');
        if (this.isSemantic) {
            favicon.href = window.location.origin + '/assets/semantic.png';
            this.prefix = 'semantic';
        }
        else {
            favicon.href = window.location.origin + '/assets/fomantic.png';
            this.prefix = 'fomantic';
        }
        NavigationComponent.previous = '/' + this.prefix;
    }

    protected toFomantic(): void {
        window.location.href = this.router.url.replace('semantic', 'fomantic');
    }

    protected toSemantic(): void {
        window.location.href = this.router.url.replace('fomantic', 'semantic');
    }

    protected toggle(): void {
        this.isMenuExpanded = !this.isMenuExpanded;
    }
}

import { Component, ChangeDetectionStrategy, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonComponent, ContextMenuComponent, ContextMenuItemComponent, FillComponent, FlexComponent, FlexDirective, IconComponent } from '@mantic-ui/angular';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons';
import { setFavicon } from '../../helpers/favicon';
import { Framework, FrameworkService } from '../../services/framework.service';

@Component({
    selector: 'app-navigation',
    imports: [RouterLink, RouterLinkActive, FlexComponent, IconComponent, FillComponent, FlexDirective, RouterOutlet, ButtonComponent, ContextMenuComponent, ContextMenuItemComponent],
    templateUrl: './navigation.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    private readonly frameworkService = inject(FrameworkService);
    protected readonly faChevronLeft = faChevronLeft;
    protected readonly framework = this.frameworkService.current;
    protected readonly prefix = this.frameworkService.prefix;
    protected isMenuExpanded = true;

    public constructor() {
        effect(() => setFavicon(`/assets/${this.framework()}.png`));
    }

    protected switchTo(framework: Framework): void {
        this.frameworkService.switchTo(framework);
    }

    protected toggle(): void {
        this.isMenuExpanded = !this.isMenuExpanded;
    }
}

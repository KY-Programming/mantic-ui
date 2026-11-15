import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ExampleCodeComponent, NpmInstallComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-mantic-start',
    imports: [HeaderComponent, NpmInstallComponent, ExampleCodeComponent, RouterLink],
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class ManticStartComponent {
    protected readonly appComponentCode = `import { ManticIconsLocalComponent, ManticLatoLocalComponent, ManticResetComponent, ManticSiteComponent, ManticThemeComponent } from '@mantic-ui/theme';

@Component({
    selector: 'app-root',
    imports: [ManticThemeComponent, ManticResetComponent, ManticSiteComponent, ManticLatoLocalComponent, ManticIconsLocalComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {}`;

    protected readonly appComponentHtml = `<!-- auto follows the dark mode setting of the operating system, dark forces it -->
<m-mantic-theme auto>
    <!-- Normalize browser defaults -->
    <m-mantic-reset />
    <!-- Page colors, typography, links, focus and selection -->
    <m-mantic-site />
    <!-- Self-hosted Lato font (Latin subset) -->
    <m-mantic-lato-local />
    <!-- Self-hosted icon font for icon names (not needed when you only use Font Awesome) -->
    <m-mantic-icons-local />
    <!-- Add <m-mantic-brand-icons-local /> for brand icons like "github" -->
</m-mantic-theme>`;

    protected readonly runtimeCode = `import { ThemeTokenService } from '@mantic-ui/theme';

// Whole page
inject(ThemeTokenService).apply({ primary: '#e03997', radius: '0.5rem', density: 0.85 });`;

    protected readonly scopeCode = `<!-- Only this element and its descendants -->
<section [m-theme-tokens]="{ primary: '#e03997', radius: '1rem' }">...</section>`;
}

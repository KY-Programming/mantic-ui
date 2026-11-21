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
    protected readonly appComponentCode = `import { ManticResetComponent, ManticSiteComponent, ManticThemeComponent } from '@mantic-ui/theme';

@Component({
    selector: 'app-root',
    imports: [ManticThemeComponent, ManticResetComponent, ManticSiteComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {}`;

    protected readonly appComponentHtml = `<!-- auto follows the dark mode setting of the operating system, dark forces it -->
<m-mantic-theme auto>
    <!-- Normalize browser defaults -->
    <m-mantic-reset />
    <!-- Page colors, typography, links, focus and selection -->
    <m-mantic-site />
</m-mantic-theme>`;

    protected readonly angularJsonCode = `"styles": [
    // Self-hosted Lato (Latin and Latin Extended)
    "@mantic-ui/theme/styles/lato.scss",
    // Icon font for icon names (not needed when you only use Font Awesome)
    "@mantic-ui/theme/styles/icons.scss",
    // Brand icons like "github"
    "@mantic-ui/theme/styles/brand-icons.scss",
    "src/styles.scss"
]`;

    protected readonly runtimeCode = `import { ThemeTokenService } from '@mantic-ui/theme';

// Whole page
inject(ThemeTokenService).apply({ primary: '#e03997', radius: '0.5rem', density: 0.85 });`;

    protected readonly scopeCode = `<!-- Only this element and its descendants -->
<section [m-theme-tokens]="{ primary: '#e03997', radius: '1rem' }">...</section>`;
}

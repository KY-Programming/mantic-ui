# mantic UI Theme

| [Documentation](https://mantic-ui.ky-programming.de/mantic) | [Github Repository](https://github.com/KY-Programming/mantic-ui) | [Support](https://support.ky-programming.de/) |

The native theme for [mantic UI](https://www.npmjs.com/package/@mantic-ui/angular) Angular components: modern CSS,
dark mode built in, and colors, radii, spacing, fonts and motion adjustable at runtime.

Requires [@mantic-ui/angular](https://www.npmjs.com/package/@mantic-ui/angular) and a current browser (2024 or newer).

It styles every mantic component and keeps the class contract of the Semantic UI and Fomantic UI themes, so an app can
switch to it without changing its templates.

## Install

````
npm i @mantic-ui/angular @mantic-ui/theme
````

## Usage

````ts
import { ManticIconsLocalComponent, ManticLatoLocalComponent, ManticResetComponent, ManticSiteComponent, ManticThemeComponent } from '@mantic-ui/theme';

@Component({
    selector: 'app-root',
    imports: [ManticThemeComponent, ManticResetComponent, ManticSiteComponent, ManticLatoLocalComponent, ManticIconsLocalComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {}
````

````html
<!-- auto follows the dark mode setting of the operating system, dark forces it -->
<m-mantic-theme auto>
    <!-- Normalize browser defaults -->
    <m-mantic-reset />
    <!-- Page colors, typography, links, focus and selection -->
    <m-mantic-site />
    <!-- Self-hosted Lato font, Latin (Western Europe incl. German). Add <m-mantic-lato-ext-local /> for
         Central and Eastern European characters (ł č ő …) -->
    <m-mantic-lato-local />
    <!-- Self-hosted icon font for icon names (not needed when you only use Font Awesome) -->
    <m-mantic-icons-local />
</m-mantic-theme>
````

Icons work with names (`<m-icon icon="home" />`, needs `m-mantic-icons-local`) and with Font Awesome icon definitions
(`<m-icon [icon]="faHome" />`), both share the same size, spacing and variants. Brand icons (`icon="github"`) need
`m-mantic-brand-icons-local` in addition. The fonts are inlined into the components, so they work behind any base href
and nothing has to be copied to the assets.

## Runtime theming

All design decisions are CSS custom properties (`--m-*`). Hover, active, tinted and text-on-color variants are derived
from them automatically.

````ts
import { ThemeTokenService } from '@mantic-ui/theme';

// Whole page
inject(ThemeTokenService).apply({ primary: '#e03997', radius: '0.5rem', density: 0.85 });
````

````html
<!-- Only this element and its descendants -->
<section [m-theme-tokens]="{ primary: '#e03997', radius: '1rem' }">...</section>
````

Any CSS value works, e.g. `light-dark(#2185d0, #54c8ff)` for different light and dark values, or `var(--my-brand)`.
Plain CSS works as well: set the custom properties in your own stylesheet; unlayered app styles always win over the
theme.

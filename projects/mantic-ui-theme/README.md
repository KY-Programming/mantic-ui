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
import { ManticResetComponent, ManticSiteComponent, ManticThemeComponent } from '@mantic-ui/theme';

@Component({
    selector: 'app-root',
    imports: [ManticThemeComponent, ManticResetComponent, ManticSiteComponent],
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
</m-mantic-theme>
````

The fonts are stylesheets for the global styles of the app:

````jsonc
// angular.json
"styles": [
    // Self-hosted Lato (Latin and Latin Extended)
    "@mantic-ui/theme/styles/lato.scss",
    // Icon font for icon names (not needed when you only use Font Awesome)
    "@mantic-ui/theme/styles/icons.scss",
    // Brand icons like "github"
    "@mantic-ui/theme/styles/brand-icons.scss",
    "src/styles.scss"
]
````

`@use '@mantic-ui/theme/styles/lato';` in `src/styles.scss` works as well. The Angular builder emits the fonts as files
of their own, hashed and with relative URLs: they work behind any base href, nothing has to be copied to the assets, they
stay cached across releases, and the browser only downloads the faces a page renders (italic only for italic text,
Latin Extended only for characters like ł č ő). Until Lato has loaded, the text shows Arial scaled to Lato's metrics, so
the page barely shifts when Lato swaps in. Preloading `Lato-Regular-latin` and `Lato-Bold-latin` (from the build output's
`media` folder) in `index.html` lets the first render use Lato right away.

Icons work with names (`<m-icon icon="home" />`, needs `icons.scss`) and with Font Awesome icon definitions
(`<m-icon [icon]="faHome" />`), both share the same size, spacing and variants. Brand icons (`icon="github"`) need
`brand-icons.scss` in addition.

The components `m-mantic-lato-local`, `m-mantic-lato-ext-local`, `m-mantic-icons-local` and `m-mantic-brand-icons-local`
are deprecated: they inline the fonts into the component styles, which puts them into `main.js` and makes every release
download them again.

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

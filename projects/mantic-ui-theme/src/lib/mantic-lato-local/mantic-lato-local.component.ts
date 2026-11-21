import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Self-hosted Lato font, Latin part (Western Europe incl. German); Latin Extended is m-mantic-lato-ext-local.
 * @deprecated Inlines the font into the component styles, so it is part of the main bundle and downloaded again with
 * every release. Add `@mantic-ui/theme/styles/lato.scss` to the global styles instead (see the README).
 */
@Component({
    selector: 'm-mantic-lato-local',
    template: '',
    styleUrl: './mantic-lato-local.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ManticLatoLocalComponent {}

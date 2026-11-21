import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Self-hosted Lato font, Latin Extended part (opt-in next to m-mantic-lato-local).
 * @deprecated Inlines the font into the component styles, so it is part of the main bundle and downloaded again with
 * every release. Add `@mantic-ui/theme/styles/lato.scss` to the global styles instead (see the README), it contains
 * Latin Extended.
 */
@Component({
    selector: 'm-mantic-lato-ext-local',
    template: '',
    styleUrl: './mantic-lato-ext-local.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ManticLatoExtLocalComponent {}

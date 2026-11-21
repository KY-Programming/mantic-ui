import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Self-hosted brand icon font: enables brand icon names like `<m-icon icon="github" />`.
 * @deprecated Inlines the font into the component styles, so it is part of the main bundle and downloaded again with
 * every release. Add `@mantic-ui/theme/styles/brand-icons.scss` to the global styles instead (see the README).
 */
@Component({
    selector: 'm-mantic-brand-icons-local',
    template: '',
    styleUrl: './mantic-brand-icons-local.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ManticBrandIconsLocalComponent {}

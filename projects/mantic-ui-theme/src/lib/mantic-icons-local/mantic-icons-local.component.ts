import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Self-hosted icon font: enables icon names like `<m-icon icon="home" />`. Not needed when you only use Font Awesome.
 * @deprecated Inlines the font into the component styles, so it is part of the main bundle and downloaded again with
 * every release. Add `@mantic-ui/theme/styles/icons.scss` to the global styles instead (see the README).
 */
@Component({
    selector: 'm-mantic-icons-local',
    template: '',
    styleUrl: './mantic-icons-local.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ManticIconsLocalComponent {}

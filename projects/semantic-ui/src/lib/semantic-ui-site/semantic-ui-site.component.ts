import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'm-semantic-ui-site',
    template: '',
    styleUrls: ['./semantic-ui-site.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.version]': '5'
    }
})
export class SemanticUiSiteComponent {}

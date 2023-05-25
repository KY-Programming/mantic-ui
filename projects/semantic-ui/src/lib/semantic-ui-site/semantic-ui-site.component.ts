import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'm-semantic-ui-site',
    standalone: true,
    template: '',
    styleUrls: ['./semantic-ui-site.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SemanticUiSiteComponent {
    @HostBinding('attr.version')
    public version = 5;
}

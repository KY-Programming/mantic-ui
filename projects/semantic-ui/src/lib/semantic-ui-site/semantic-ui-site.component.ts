import { Component, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'm-semantic-ui-site',
    template: '',
    styleUrls: ['./semantic-ui-site.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    encapsulation: ViewEncapsulation.None
})
export class SemanticUiSiteComponent {
    @HostBinding('attr.version')
    public version = 5;
}

import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'm-semantic-ui-site',
  template: '',
  styleUrls: ['./semantic-ui-site.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SemanticUiSiteComponent {
    @HostBinding('attr.version')
    public version = 5;
}

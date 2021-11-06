import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '@mantic-ui/angular';

@Component({
  selector: 'm-semantic-ui-theme',
  template: '<ng-content></ng-content>',
  styleUrls: ['./semantic-ui-theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SemanticUiThemeComponent {
  constructor(
    themeService: ThemeService
  ) {
    themeService.setVersion('2.4.2');
  }
}

import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from 'projects/mantic-ui/src/lib/services/theme.service';

@Component({
  selector: 'ky-semantic-ui-theme',
  template: '',
  styleUrls: ['./semantic-ui-theme.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SemanticUiThemeComponent {
  constructor(
    themeService: ThemeService
  ) {
    themeService.setVersion('2.4.2');
  }
}

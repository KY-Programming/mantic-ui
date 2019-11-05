import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from 'projects/mantic-ui/src/lib/services/theme.service';

@Component({
  selector: 'ky-fomantic-ui-theme',
  template: '',
  styleUrls: ['./fomantic-ui-theme.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FomanticUiThemeComponent {
  constructor(
    themeService: ThemeService
  ) {
    themeService.setVersion('2.7.0');
  }
}

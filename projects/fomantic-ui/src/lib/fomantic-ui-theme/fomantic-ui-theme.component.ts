import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '@mantic-ui/angular';

@Component({
    selector: 'm-fomantic-ui-theme',
    template: '',
    styleUrls: ['./fomantic-ui-theme.component.less'],
    changeDetection: ChangeDetectionStrategy.Eager,
    encapsulation: ViewEncapsulation.None
})
export class FomanticUiThemeComponent {
    public constructor(
        themeService: ThemeService
    ) {
        themeService.setVersion('2.9.0');
    }
}

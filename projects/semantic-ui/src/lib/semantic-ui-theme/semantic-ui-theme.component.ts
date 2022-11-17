import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BooleanLike, ThemeService, toBoolean } from '@mantic-ui/angular';

@Component({
    selector: 'm-semantic-ui-theme',
    templateUrl: './semantic-ui-theme.component.html',
    styleUrls: ['./semantic-ui-theme.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SemanticUiThemeComponent {
    private isDark: boolean;
    private isAuto: boolean;

    @Input()
    public get dark(): boolean {
        return this.isDark;
    }

    public set dark(value: BooleanLike) {
        this.isDark = toBoolean(value);
    }

    @Input()
    public get auto(): boolean {
        return this.isAuto;
    }

    public set auto(value: BooleanLike) {
        this.isAuto = toBoolean(value);
        if (this.isAuto) {
            this.isDark = this.themeService.prefersDark();
        }
    }

    public constructor(
        private readonly themeService: ThemeService
    ) {
        themeService.setVersion('2.4.2');
    }
}

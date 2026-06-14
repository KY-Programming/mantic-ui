import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { BooleanLike, ButtonDefaultsComponent, CheckboxDefaultsComponent, DropdownDefaultsComponent, FormDefaultsComponent, InputDefaultsComponent, MessageDefaultsComponent, ModalDefaultsComponent, SegmentDefaultsComponent, TabGroupDefaultsComponent, TableDefaultsComponent, TextareaDefaultsComponent, ThemeService, toBoolean } from '@mantic-ui/angular';

@Component({
    selector: 'm-semantic-ui-theme',
    imports: [SegmentDefaultsComponent, TableDefaultsComponent, FormDefaultsComponent, InputDefaultsComponent, CheckboxDefaultsComponent, DropdownDefaultsComponent, TextareaDefaultsComponent, TabGroupDefaultsComponent, ModalDefaultsComponent, ButtonDefaultsComponent, MessageDefaultsComponent],
    templateUrl: './semantic-ui-theme.component.html',
    styleUrls: ['./semantic-ui-theme.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SemanticUiThemeComponent {
    private readonly themeService = inject(ThemeService);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly darkInput = input<boolean, BooleanLike>(false, { alias: 'dark', transform: toBoolean });
    public readonly auto = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly dark = computed(() => this.auto() ? this.themeService.prefersDark() : this.darkInput());

    public constructor() {
        this.themeService.setVersion('2.4.2');
    }
}

import { Directive, effect } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { ButtonComponent } from './button.component';

@Directive({
    selector: '[m-button]',
    providers: [...ButtonBaseComponent.providers]
})
export class ButtonDirective extends ButtonBaseComponent {
    public constructor() {
        super();
        this.validateAttributes = false;
        effect(() => this.refreshInverted(ButtonComponent.defaults.inverted()));
    }
}

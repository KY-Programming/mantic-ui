import { Directive } from '@angular/core';
import { ButtonBaseComponent } from '../base/button-base.component';

@Directive({
    selector: '[m-button]',
    standalone: true,
    hostDirectives: [...ButtonBaseComponent.directives],
    providers: [...ButtonBaseComponent.providers]
})
export class ButtonDirective extends ButtonBaseComponent {
    public constructor() {
        super();
        this.validateAttributes = false;
    }
}

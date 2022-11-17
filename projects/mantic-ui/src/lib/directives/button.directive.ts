import { Directive } from '@angular/core';
import { ButtonBaseComponent } from '../base/button-base.component';

@Directive({
    selector: '[m-button]'
})
export class ButtonDirective extends ButtonBaseComponent {
    public constructor() {
        super();
        this.validateAttributes = false;
    }
}

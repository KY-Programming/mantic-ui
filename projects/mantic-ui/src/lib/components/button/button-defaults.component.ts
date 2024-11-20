import { Component, Input } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
    selector: 'm-button-defaults',
    template: ''
})
export class ButtonDefaultsComponent {
    @Input()
    public set inverted(value: boolean) {
        ButtonComponent.defaults.inverted = value;
        ButtonComponent.defaults.invertedChange.next(value);
    }
}

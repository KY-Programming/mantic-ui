import { Component, Input } from '@angular/core';
import { InputBaseComponent } from './input-base.component';

@Component({
    selector: 'm-input-defaults',
    template: '',
    standalone: true
})
export class InputDefaultsComponent {

    @Input()
    public set inverted(value: boolean) {
        InputBaseComponent.defaults.inverted = value;
        InputBaseComponent.defaults.invertedChange.next(value);
    }
}

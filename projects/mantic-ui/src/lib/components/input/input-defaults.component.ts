import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { InputBaseComponent } from './input-base.component';

@Component({
    selector: 'm-input-defaults',
    changeDetection: ChangeDetectionStrategy.Eager,
    template: '',
    })
export class InputDefaultsComponent {

    @Input()
    public set inverted(value: boolean) {
        InputBaseComponent.defaults.inverted = value;
        InputBaseComponent.defaults.invertedChange.next(value);
    }
}

import { Component, Input } from '@angular/core';
import { DimmerComponent } from './dimmer.component';

@Component({
    selector: 'm-dimmer-defaults',
    template: ''
})
export class DimmerDefaultsComponent {

    @Input()
    public set inverted(value: boolean) {
        DimmerComponent.defaults.inverted = value;
        DimmerComponent.defaults.invertedChange.next(value);
    }

}

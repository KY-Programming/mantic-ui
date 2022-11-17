import { Component, Input } from '@angular/core';
import { TabGroupComponent } from './tab-group.component';

@Component({
    selector: 'm-tab-group-defaults',
    template: ''
})
export class TabGroupDefaultsComponent {
    @Input()
    public set inverted(value: boolean) {
        TabGroupComponent.defaults.inverted = value;
        TabGroupComponent.defaults.invertedChange.next(value);
    }
}

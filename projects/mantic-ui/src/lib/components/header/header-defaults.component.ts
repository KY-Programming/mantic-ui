import { Component, Input } from '@angular/core';
import { HeaderComponent } from './header.component';

@Component({
    selector: 'm-header-defaults',
    template: '',
    })
export class HeaderDefaultsComponent {
    @Input()
    public set inverted(value: boolean) {
        HeaderComponent.defaults.inverted = value;
        HeaderComponent.defaults.invertedChange.next(value);
    }
}

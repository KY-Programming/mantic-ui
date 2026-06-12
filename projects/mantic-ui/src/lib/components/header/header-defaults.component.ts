import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from './header.component';

@Component({
    selector: 'm-header-defaults',
    changeDetection: ChangeDetectionStrategy.Eager,
    template: '',
    })
export class HeaderDefaultsComponent {
    @Input()
    public set inverted(value: boolean) {
        HeaderComponent.defaults.inverted = value;
        HeaderComponent.defaults.invertedChange.next(value);
    }
}

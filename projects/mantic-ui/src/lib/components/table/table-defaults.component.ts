import { Component, Input } from '@angular/core';
import { TableComponent } from './table.component';

@Component({
    selector: 'm-table-defaults',
    template: '',
    })
export class TableDefaultsComponent {
    @Input()
    public set inverted(value: boolean) {
        TableComponent.defaults.inverted = value;
        TableComponent.defaults.invertedChange.next(value);
    }
}

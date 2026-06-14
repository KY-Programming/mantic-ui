import { Component, effect, input, OnDestroy } from '@angular/core';
import { TableComponent } from './table.component';

@Component({
    selector: 'm-table-defaults',
    template: ''
})
export class TableDefaultsComponent implements OnDestroy {
    private readonly previousInverted = TableComponent.defaults.inverted();
    private currentInverted?: boolean;
    public readonly inverted = input<boolean>();

    public constructor() {
        effect(() => {
            const value = this.inverted();
            if (value !== undefined) {
                this.currentInverted = value;
                TableComponent.defaults.inverted.set(value);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.currentInverted === TableComponent.defaults.inverted()) {
            TableComponent.defaults.inverted.set(this.previousInverted);
        }
    }
}

import { JsonPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-value',
    imports: [
        JsonPipe
    ],
    templateUrl: './value.component.html',
    styleUrls: ['./value.component.scss']
})
export class ValueComponent {
    public readonly value = input<unknown>();

    protected readonly type = computed(() => {
        const value = this.value();
        const type = typeof value;
        return type === 'object' && value ? (value as { constructor: { name: string } }).constructor.name : type;
    });
}

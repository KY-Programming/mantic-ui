import { Component, inject, Input } from '@angular/core';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { FlexDirective } from './flex.directive';

@Component({
    selector: 'm-flex',
    template: '<ng-content/>',
    standalone: true,
    hostDirectives: [FlexDirective.default]
})
export class FlexComponent {
    private readonly flexDirective = inject(FlexDirective);

    @Input()
    public get column(): boolean {
        return this.flexDirective.direction === 'column';
    }

    public set column(value: BooleanLike) {
        this.flexDirective.direction = toBoolean(value) ? 'column' : 'row';
    }

    @Input()
    public get row(): boolean {
        return this.flexDirective.direction === 'row';
    }

    public set row(value: BooleanLike) {
        this.flexDirective.direction = toBoolean(value) ? 'row' : 'column';
    }
}

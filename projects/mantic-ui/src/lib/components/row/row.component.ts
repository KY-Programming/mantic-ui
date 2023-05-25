import { Component, HostBinding, Input } from '@angular/core';
import { FieldSize, ParsableFieldSize, parseFieldSize } from '../../models/field-size';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-row',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class RowComponent extends BaseComponent {
    private columnsValue: FieldSize | undefined;
    private isStretched = false;

    @Input()
    @HostBinding('class.column')
    public get columns(): FieldSize | undefined {
        return this.columnsValue;
    }

    public set columns(value: ParsableFieldSize) {
        this.columnsValue = parseFieldSize(value);
        this.classes.set('columns', this.columnsValue);
    }

    @Input()
    @HostBinding('class.stretched')
    public get stretched(): boolean {
        return this.isStretched;
    }

    public set stretched(value: BooleanLike) {
        this.isStretched = this.toBoolean(value);
    }

    public constructor() {
        super(false);
        this.classes.register('columns', 'stretched')
            .registerFixed('row');
    }

}

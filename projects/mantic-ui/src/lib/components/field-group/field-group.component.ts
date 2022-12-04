import { Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { InlineDirective } from '../../directives/inline.directive';

export declare type FieldsType =
    ''
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
    | 'nine'
    | 'ten'
    | number;

@Component({
    selector: 'm-field-group',
    templateUrl: './field-group.component.html',
    styleUrls: ['./field-group.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives, InlineDirective.default],
    providers: [...BaseComponent.providers]
})
export class FieldGroupComponent extends BaseComponent {
    private readonly fieldClasses: FieldsType[] = ['', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    private fieldsValue: FieldsType;
    private fieldsAutoValue: FieldsType;
    private isGrouped: boolean;

    @Input()
    public get fields(): FieldsType {
        return this.fieldsValue || this.fieldsAutoValue;
    }

    public set fields(value: FieldsType) {
        // TODO: Parse number as string e.g. '2'
        if (typeof value === 'number') {
            this.fieldsValue = this.fieldClasses[value];
        } else {
            this.fieldsValue = value;
        }
    }

    @ContentChildren(FieldComponent)
    protected set fieldComponents(query: QueryList<FieldComponent>) {
        if (query) {
            this.refreshFields(query.length);
            query.changes.subscribe(() => this.refreshFields(query.length));
        }
    }

    @Input()
    @HostBinding('class.grouped')
    public get grouped(): boolean {
        return this.isGrouped;
    }

    public set grouped(value: BooleanLike) {
        this.isGrouped = this.toBoolean(value);
    }

    public constructor() {
        super(false);
        this.classes.register('grouped', 'fields')
            .registerFixed('fields');
    }

    private refreshFields(count: number): void {
        this.fieldsAutoValue = this.fieldClasses[count];
    }

}

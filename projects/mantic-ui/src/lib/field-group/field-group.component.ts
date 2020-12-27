import { Component, ContentChildren, ElementRef, HostBinding, Input, QueryList } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { BaseComponent } from '../base/base.component';

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
    styleUrls: ['./field-group.component.scss']
})
export class FieldGroupComponent extends BaseComponent {
    private readonly fieldClasses: FieldsType[] = ['', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    private fieldsValue: FieldsType;
    private fieldsAutoValue: FieldsType;
    private isInline: boolean;
    private isGrouped: boolean;

    public get fields(): FieldsType {
        return this.fieldsValue || this.fieldsAutoValue;
    }

    @Input()
    public set fields(value: FieldsType) {
        // TODO: Parse number as string e.g. '2'
        if (typeof value === 'number') {
            this.fieldsValue = this.fieldClasses[value];
        }
        else {
            this.fieldsValue = value;
        }
    }

    @ContentChildren(FieldComponent)
    public set fieldComponents(query: QueryList<FieldComponent>) {
        if (query) {
            this.refreshFields(query.length);
            query.changes.subscribe(() => this.refreshFields(query.length));
        }
    }

    @Input()
    @HostBinding('class.inline')
    public get inline(): boolean | string {
        return this.isInline;
    }

    public set inline(value: string | boolean) {
        this.isInline = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.grouped')
    public get grouped(): boolean | string {
        return this.isGrouped;
    }

    public set grouped(value: string | boolean) {
        this.isGrouped = this.toBoolean(value);
    }

    @HostBinding('class.fields')
    public readonly fieldsHost = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef, false);
        this.classList.register('inline', 'grouped', 'fields');
    }

    private refreshFields(count: number): void {
        this.fieldsAutoValue = this.fieldClasses[count];
    }

}

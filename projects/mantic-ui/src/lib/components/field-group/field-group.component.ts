import { Component, ContentChildren, EventEmitter, HostBinding, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';
import { InlineDirective } from '../../directives/inline.directive';
import { BooleanLike } from '../../models/boolean-like';
import { FieldComponent } from '../field/field.component';

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
    hostDirectives: [InlineDirective.default],
    providers: [...BaseComponent.providers]
})
export class FieldGroupComponent extends BaseComponent {
    private readonly fieldClasses: FieldsType[] = ['', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    private fieldsValue: FieldsType | undefined;
    private fieldsAutoValue: FieldsType | undefined;
    private isGrouped = false;
    private isInlineValidation = false;
    private errorValue = false;
    private changeSubscriptions: Subscription[] = [];
    private fieldComponentsValue?: QueryList<FieldComponent>;

    @Input()
    public get fields(): FieldsType | undefined {
        return this.fieldsValue || this.fieldsAutoValue;
    }

    public set fields(value: FieldsType | undefined) {
        // TODO: Parse number as string e.g. '2'
        if (typeof value === 'number') {
            this.fieldsValue = this.fieldClasses[value];
        }
        else {
            this.fieldsValue = value;
        }
    }

    @ContentChildren(FieldComponent)
    public get fieldComponents(): QueryList<FieldComponent> | undefined {
        return this.fieldComponentsValue;
    }

    public set fieldComponents(value: QueryList<FieldComponent> | undefined) {
        this.fieldComponentsValue = value;
        this.refreshInlineValidation();
        this.refreshChangeSubscriptions();
        this.refreshIsValid();
        if (this.fieldComponentsValue) {
            this.refreshFields(this.fieldComponentsValue.length);
            this.fieldComponentsValue.changes.subscribe(() => {
                this.refreshFields(this.fieldComponentsValue?.length ?? 0);
                this.refreshInlineValidation();
                this.refreshChangeSubscriptions();
                this.refreshIsValid();
            });
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

    @Input()
    public get inlineValidation(): boolean {
        return this.isInlineValidation;
    }

    public set inlineValidation(value: BooleanLike) {
        this.isInlineValidation = this.toBoolean(value);
        this.refreshInlineValidation();
    }

    @Input()
    public get error(): boolean {
        return this.errorValue;
    }

    public set error(value: BooleanLike) {
        value = this.toBoolean(value);
        if (this.errorValue === value) {
            return;
        }
        this.errorValue = value;
        this.errorChange.emit(value);
    }

    @Output()
    public readonly errorChange = new EventEmitter<boolean>();

    @Output()
    public readonly change = new EventEmitter<void>();

    public constructor() {
        super(false);
        this.classes.register('grouped')
            .registerFixed('fields');
    }

    private refreshFields(count: number): void {
        this.fieldsAutoValue = this.fieldClasses[count];
    }

    private refreshInlineValidation(): void {
        this.fieldComponents?.forEach(field => field.inlineValidation = this.inlineValidation);
    }

    private refreshChangeSubscriptions(): void {
        this.changeSubscriptions.forEach(subscription => subscription.unsubscribe());
        this.fieldComponents?.forEach(field =>
            this.changeSubscriptions.push(
                field.change.pipe(takeUntil(this.destroy)).subscribe(() => this.change.emit()),
                field.errorChange.pipe(takeUntil(this.destroy)).subscribe(() => this.refreshIsValid())
            ));
    }

    private refreshIsValid(): void {
        this.error = this.fieldComponents?.some(component => component.error);
    }
}

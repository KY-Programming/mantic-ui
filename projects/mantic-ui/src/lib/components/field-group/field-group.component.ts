import { Component, computed, contentChildren, effect, input, OnDestroy, output, OutputRefSubscription, signal, untracked } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { FieldComponent } from '../field/field.component';
import { FieldsType } from './models/fields-type';

@Component({
    selector: 'm-field-group',
    templateUrl: './field-group.component.html',
    styleUrls: ['./field-group.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.grouped]': 'grouped()'
    }
})
export class FieldGroupComponent extends BaseComponent implements OnDestroy {
    private static readonly fieldClasses: FieldsType[] = ['', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    private readonly changeSubscriptions: OutputRefSubscription[] = [];
    public readonly fieldComponents = contentChildren(FieldComponent);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly fieldsInput = input<FieldsType | undefined, FieldsType>(undefined, { alias: 'fields', transform: value => typeof value === 'number' ? FieldGroupComponent.fieldClasses[value] : value });
    private readonly fieldsAutoValue = signal<FieldsType | undefined>(undefined);
    public readonly fields = computed(() => this.fieldsInput() || this.fieldsAutoValue());
    public readonly grouped = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly inline = input<boolean, BooleanLike>(false, { transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly inlineValidationInput = input<boolean, BooleanLike>(false, { alias: 'inlineValidation', transform: toBoolean });
    public readonly inlineValidationChange = output<boolean>();
    public readonly inlineValidation = transformableModel(this.inlineValidationInput, this.inlineValidationChange, toBoolean);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly errorInput = input<boolean, BooleanLike>(false, { alias: 'error', transform: toBoolean });
    private readonly errorState = signal(false);
    public readonly error = this.errorState.asReadonly();
    public readonly errorChange = output<boolean>();
    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly change = output();

    public constructor() {
        super(false);
        this.classes.register('inline', 'grouped')
            .registerFixed('fields');
        effect(() => this.classes.set('inline', this.inline()));

        // React to the projected fields: derive the column-count class, re-wire change/error subscriptions, recheck validity.
        effect(() => {
            const fields = this.fieldComponents();
            untracked(() => {
                this.fieldsAutoValue.set(FieldGroupComponent.fieldClasses[fields.length]);
                this.refreshChangeSubscriptions(fields);
                this.refreshIsValid();
            });
        });

        // Propagate inlineValidation to child fields when it or the field set changes.
        effect(() => {
            const inlineValidation = this.inlineValidation();
            const fields = this.fieldComponents();
            untracked(() => {
                for (const field of fields) {
                    field.inlineValidation.set(inlineValidation);
                }
            });
        });

        // External [error] binding flows through the same dedupe/emit the old setter did.
        effect(() => {
            const value = this.errorInput();
            untracked(() => this.setError(value));
        });
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.unsubscribeAllChanges();
    }

    private refreshChangeSubscriptions(fields: readonly FieldComponent[]): void {
        this.unsubscribeAllChanges();
        for (const field of fields) {
            this.changeSubscriptions.push(
                field.change.subscribe(() => this.change.emit()),
                field.errorChange.subscribe(() => this.refreshIsValid())
            );
        }
    }

    private unsubscribeAllChanges(): void {
        for (const subscription of this.changeSubscriptions) {
            subscription.unsubscribe();
        }
        this.changeSubscriptions.length = 0;
    }

    private refreshIsValid(): void {
        this.setError(this.fieldComponents().some(component => component.error()));
    }

    private setError(value: boolean): void {
        if (this.errorState() === value) {
            return;
        }
        this.errorState.set(value);
        this.errorChange.emit(value);
    }
}

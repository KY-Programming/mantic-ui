import { Component, contentChildren, effect, inject, input, output, OutputRefSubscription, signal, untracked } from '@angular/core';
import { delay, Subject, Subscription, throttleTime } from 'rxjs';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { FieldGroupComponent } from '../field-group/field-group.component';
import { FieldComponent } from '../field/field.component';
import { FillDirective } from '../flex/fill/fill.directive';
import { FlexDirective } from '../flex/flex.directive';
import { FormValidationNotifier } from './form-validation-notifier';

@Component({
    selector: 'm-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    imports: [FlexDirective, FillDirective],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class.success]': 'success()',
        '[class.error]': 'error()',
        '[class.warning]': 'warning()'
    }
})
export class FormComponent extends InvertibleComponent {
    public static readonly defaults = {
        inverted: signal(false)
    };
    protected readonly flexDirective = inject(FlexDirective, { self: true, optional: true });
    private readonly formValidationNotifier = inject(FormValidationNotifier, { optional: true });
    private readonly fieldSubscriptions: OutputRefSubscription[] = [];
    private readonly groupSubscriptions: OutputRefSubscription[] = [];
    private readonly autoSubmitSubject = new Subject<void>();
    private autoSubmitSubscription: Subscription | undefined;
    public readonly fieldComponents = contentChildren(FieldComponent);
    public readonly fieldGroupsComponents = contentChildren(FieldGroupComponent);
    public readonly loading = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly action = input<string>();
    public readonly autocomplete = input<'on' | 'off'>();
    public readonly enctype = input<'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'>();
    public readonly method = input<'get' | 'post'>();
    public readonly name = input<string>();
    public readonly novalidate = input(false);
    public readonly success = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly warning = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly target = input<'_blank' | '_self' | '_parent' | '_top'>();
    public readonly autoSubmit = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly autoSubmitThrottle = input(1000);
    public readonly inlineValidation = input<boolean, BooleanLike>(false, { transform: toBoolean });
    private readonly errorState = signal(false);
    public readonly error = this.errorState.asReadonly();
    private readonly isValidState = signal(false);
    public readonly isValid = this.isValidState.asReadonly();
    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly submit = output();
    public readonly isValidChange = output<boolean>();

    public constructor() {
        super(false);
        this.classes.register('loading', 'success', 'warning', 'error', 'autoSubmit');
        effect(() => this.classes.set('loading', this.loading()));
        effect(() => this.refreshInverted(FormComponent.defaults.inverted()));

        // Subscribe to each projected field's error/change, re-wiring when the field set changes.
        effect(onCleanup => {
            const fields = this.fieldComponents();
            untracked(() => {
                this.subscribeFields(fields);
                this.refreshIsValid();
            });
            onCleanup(() => this.releaseFields());
        });

        // Same for field groups.
        effect(onCleanup => {
            const groups = this.fieldGroupsComponents();
            untracked(() => {
                this.subscribeGroups(groups);
                this.refreshIsValid();
            });
            onCleanup(() => this.releaseGroups());
        });

        // Propagate inlineValidation to children when it or the child set changes.
        effect(() => {
            this.inlineValidation();
            this.fieldComponents();
            this.fieldGroupsComponents();
            untracked(() => this.refreshInlineValidation());
        });

        // Re-arm the throttled auto-submit pipeline when the throttle changes.
        effect(() => {
            this.autoSubmitThrottle();
            untracked(() => this.refreshAutoSubmitSubscription());
        });
    }

    public changed(): void {
        this.autoSubmitSubject.next();
    }

    public validateAndSubmit(): void {
        if (this.error()) {
            for (const field of this.fieldComponents()) {
                field.forceValidation();
            }
        }
        else {
            this.submit.emit();
        }
    }

    protected onSubmit(event: SubmitEvent): void {
        event.preventDefault();
        // TODO: Implement
    }

    private releaseFields(): void {
        for (const subscription of this.fieldSubscriptions) {
            subscription.unsubscribe();
        }
        this.fieldSubscriptions.length = 0;
    }

    private subscribeFields(fields: readonly FieldComponent[]): void {
        this.fieldSubscriptions.push(
            ...fields.map(field => field.errorChange.subscribe(() => this.refreshIsValid())),
            ...(this.autoSubmit() ? fields.map(field => field.change.subscribe(() => this.changed())) : [])
        );
    }

    private releaseGroups(): void {
        for (const subscription of this.groupSubscriptions) {
            subscription.unsubscribe();
        }
        this.groupSubscriptions.length = 0;
    }

    private subscribeGroups(groups: readonly FieldGroupComponent[]): void {
        this.groupSubscriptions.push(
            ...groups.map(group => group.errorChange.subscribe(() => this.refreshIsValid())),
            ...(this.autoSubmit() ? groups.map(group => group.change.subscribe(() => this.changed())) : [])
        );
    }

    private refreshAutoSubmitSubscription(): void {
        this.autoSubmitSubscription?.unsubscribe();
        this.autoSubmitSubscription = this.autoSubmitSubject.pipe(
            throttleTime(this.autoSubmitThrottle(), undefined, { leading: true, trailing: true }),
            // Delay a little bit to let all bindings be executed and the values written to the objects
            delay(1)
        ).subscribe(() => this.validateAndSubmit());
    }

    private refreshIsValid(): void {
        const hasError = this.fieldComponents().some(field => field.error()) || this.fieldGroupsComponents().some(group => group.error());
        const isValid = !hasError;
        this.errorState.set(hasError);
        if (this.isValidState() !== isValid) {
            this.isValidState.set(isValid);
            this.formValidationNotifier?.set(isValid);
            // Delay the notification to fire the change outside the check to ensure a change detection run will be started
            setTimeout(() => this.isValidChange.emit(isValid));
        }
    }

    private refreshInlineValidation(): void {
        const inlineValidation = this.inlineValidation();
        for (const field of this.fieldComponents()) {
            field.inlineValidation.set(inlineValidation);
        }
        for (const group of this.fieldGroupsComponents()) {
            group.inlineValidation.set(inlineValidation);
        }
    }
}

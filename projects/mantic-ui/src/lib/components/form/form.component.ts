
import { Component, ContentChildren, EventEmitter, HostBinding, inject, Input, OnInit, Output, QueryList } from '@angular/core';
import { delay, ReplaySubject, Subject, Subscription, throttleTime } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { LoadingDirective } from '../../directives/loading.directive';
import { BooleanLike } from '../../models/boolean-like';
import { FieldGroupComponent } from '../field-group/field-group.component';
import { FieldComponent } from '../field/field.component';
import { FillDirective } from '../flex/fill/fill.directive';
import { FlexDirective } from '../flex/flex.directive';
import { FlexDirection } from '../flex/flex.types';
import { FormValidationNotifier } from './form-validation-notifier';

@Component({
    selector: 'm-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    imports: [
    FlexDirective,
    FillDirective
],
    hostDirectives: [LoadingDirective.default],
    providers: [...InvertibleComponent.providers]
})
export class FormComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    private readonly loadingDirective = inject(LoadingDirective, { self: true });
    private readonly flexDirective = inject(FlexDirective, { self: true, optional: true });
    private readonly formValidationNotifier = inject(FormValidationNotifier, { optional: true });
    private fieldComponentsValue?: QueryList<FieldComponent>;
    private fieldGroupsComponentsValue?: QueryList<FieldGroupComponent>;
    private fieldSubscriptions?: Subscription[];
    private groupSubscriptions?: Subscription[];
    private isValidValue = false;
    private isSuccess = false;
    private isWarning = false;
    private isError = false;
    private isAutoSubmit = false;
    private readonly autoSubmitSubject = new Subject<void>();
    private autoSubmitThrottleValue = 1000;
    private autoSubmitSubscription: Subscription | undefined;
    private isInlineValidation = false;

    protected get loading(): boolean {
        return this.loadingDirective.loading;
    }

    protected get flexDirection(): FlexDirection | '' | undefined {
        return this.flexDirective?.direction;
    }

    @ContentChildren(FieldComponent)
    public get fieldComponents(): QueryList<FieldComponent> | undefined {
        return this.fieldComponentsValue;
    }

    protected set fieldComponents(value: QueryList<FieldComponent> | undefined) {
        this.releaseFields();
        this.fieldComponentsValue = value;
        this.subscribeFields();
        this.refreshIsValid();
        this.refreshInlineValidation();
        if (this.fieldComponentsValue) {
            this.fieldComponentsValue.changes.subscribe(() => {
                this.releaseFields();
                this.subscribeFields();
                this.refreshInlineValidation();
            });
        }
    }

    @ContentChildren(FieldGroupComponent)
    public get fieldGroupsComponents(): QueryList<FieldGroupComponent> | undefined {
        return this.fieldGroupsComponentsValue;
    }

    protected set fieldGroupsComponents(value: QueryList<FieldGroupComponent> | undefined) {
        this.releaseGroups();
        this.fieldGroupsComponentsValue = value;
        this.subscribeGroups();
        this.refreshIsValid();
        this.refreshInlineValidation();
        if (this.fieldGroupsComponentsValue) {
            this.fieldGroupsComponentsValue.changes.subscribe(() => {
                this.releaseGroups();
                this.subscribeGroups();
                this.refreshInlineValidation();
            });
        }
    }

    @Input()
    public action?: string;

    @Input()
    public autocomplete?: 'on' | 'off';

    @Input()
    public enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

    @Input()
    public method?: 'get' | 'post';

    @Input()
    public name?: string;

    @Input()
    public novalidate = false;

    @Input()
    @HostBinding('class.success')
    public get success(): boolean {
        return this.isSuccess;
    }

    public set success(value: BooleanLike) {
        this.isSuccess = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.error')
    public get error(): boolean {
        return this.isError;
    }

    public set error(value: BooleanLike) {
        this.isError = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.warning')
    public get warning(): boolean {
        return this.isWarning;
    }

    public set warning(value: BooleanLike) {
        this.isWarning = this.toBoolean(value);
    }

    @Input()
    public target?: '_blank' | '_self' | '_parent' | '_top';

    @Input()
    public get isValid(): boolean {
        return this.isValidValue;
    }

    public set isValid(_: boolean) {
        // Ignore the value from the binding
    }

    @Input()
    public get autoSubmit(): boolean {
        return this.isAutoSubmit;
    }

    public set autoSubmit(value: BooleanLike) {
        this.isAutoSubmit = this.toBoolean(value);
    }

    @Input()
    public get autoSubmitThrottle(): number {
        return this.autoSubmitThrottleValue;
    }

    public set autoSubmitThrottle(value: number) {
        this.autoSubmitThrottleValue = value;
        this.refreshAutoSubmitSubscription();
    }

    @Input()
    public get inlineValidation(): boolean {
        return this.isInlineValidation;
    }

    public set inlineValidation(value: BooleanLike) {
        this.isInlineValidation = this.toBoolean(value);
        this.refreshInlineValidation();
    }

    @Output()
    public readonly submit = new EventEmitter<void>();

    @Output()
    public readonly isValidChange = new EventEmitter<boolean>();

    public constructor() {
        super(false);
        this.classes.register('success', 'warning', 'error', 'autoSubmit');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        FormComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
        this.refreshAutoSubmitSubscription();
    }

    private releaseFields(): void {
        if (this.fieldSubscriptions) {
            this.fieldSubscriptions.forEach(subscription => subscription.unsubscribe());
            this.fieldSubscriptions = undefined;
        }
    }

    private subscribeFields(): void {
        if (this.fieldComponents) {
            this.fieldSubscriptions = [
                ...this.fieldComponents.map(field => field.errorChange.subscribe(() => this.refreshIsValid())),
                ...(this.isAutoSubmit ? this.fieldComponents.map(field => field.change.subscribe(() => this.changed())) : [])
            ];
        }
    }

    private releaseGroups(): void {
        if (this.groupSubscriptions) {
            this.groupSubscriptions.forEach(subscription => subscription.unsubscribe());
            this.groupSubscriptions = undefined;
        }
    }

    private subscribeGroups(): void {
        if (this.fieldGroupsComponents) {
            this.groupSubscriptions = [
                ...this.fieldGroupsComponents.map(group => group.errorChange.subscribe(() => this.refreshIsValid())),
                ...(this.isAutoSubmit ? this.fieldGroupsComponents.map(group => group.change.subscribe(() => this.changed())) : [])
            ];
        }
    }

    public changed(): void {
        this.autoSubmitSubject.next();
    }

    private refreshAutoSubmitSubscription(): void {
        this.autoSubmitSubscription?.unsubscribe();
        this.autoSubmitSubscription = this.autoSubmitSubject.pipe(
            throttleTime(this.autoSubmitThrottleValue, undefined, { leading: true, trailing: true }),
            // Delay a little bit to let all bindings be executed and the values written to the objects
            delay(1)
        ).subscribe(() => this.validateAndSubmit());
    }

    private refreshIsValid(): void {
        const hasError = this.fieldComponents?.some(field => field.error) || this.fieldGroupsComponents?.some(group => group.error);
        const isValid = !hasError;
        this.error = hasError;
        if (this.isValidValue !== isValid) {
            this.isValidValue = isValid;
            this.formValidationNotifier?.set(isValid);
            // Delay the notification be fire the change outside the check to ensure a change detection run will be started
            setTimeout(() => this.isValidChange.emit(isValid));
        }
    }

    public validateAndSubmit(): void {
        if (this.error) {
            this.fieldComponents?.forEach(field => field.forceValidation());
        }
        else {
            this.submit.emit();
        }
    }

    protected onSubmit(event: SubmitEvent): void {
        event.preventDefault();
        // TODO: Implement
    }

    private refreshInlineValidation(): void {
        this.fieldComponents?.forEach(field => field.inlineValidation = this.inlineValidation);
        this.fieldGroupsComponents?.forEach(group => group.inlineValidation = this.inlineValidation);
    }
}

import { Component, ContentChildren, EventEmitter, HostBinding, inject, Input, OnInit, Output, QueryList } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { FieldComponent } from '../field/field.component';
import { BooleanLike } from '../../models/boolean-like';
import { InvertibleComponent } from '../../base/invertible.component';
import { takeUntil } from 'rxjs/operators';
import { FlexDirective } from '../flex/flex.directive';
import { LoadingDirective } from '../../directives/loading.directive';
import { CommonModule } from '@angular/common';
import { FillDirective } from '../flex/fill/fill.directive';
import { FlexDirection } from '../flex/flex.types';

@Component({
    selector: 'm-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FlexDirective,
        FillDirective
    ],
    hostDirectives: [...InvertibleComponent.directives, LoadingDirective.default],
    providers: [...InvertibleComponent.providers]
})
export class FormComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    private readonly loadingDirective = inject(LoadingDirective, { self: true });
    private readonly flexDirective = inject(FlexDirective, { self: true, optional: true });
    private fieldComponentsValue: QueryList<FieldComponent>;
    private subscriptions: Subscription[];
    private isValidValue = false;
    private isSuccess: boolean;
    private isWarning: boolean;
    private isError: boolean;

    protected get loading(): boolean {
        return this.loadingDirective.loading;
    }

    protected get flexDirection(): FlexDirection | '' | undefined {
        return this.flexDirective?.direction;
    }

    @ContentChildren(FieldComponent)
    public get fieldComponents(): QueryList<FieldComponent> {
        return this.fieldComponentsValue;
    }

    protected set fieldComponents(value: QueryList<FieldComponent>) {
        this.releaseFields();
        this.fieldComponentsValue = value;
        this.subscribeFields();
        this.refreshIsValid();
        if (this.fieldComponentsValue) {
            this.fieldComponentsValue.changes.subscribe(() => {
                this.releaseFields();
                this.subscribeFields();
            });
        }
    }

    @Input()
    public action: string;

    @Input()
    public autocomplete: 'on' | 'off';

    @Input()
    public enctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

    @Input()
    public method: 'get' | 'post';

    @Input()
    public name: string;

    @Input()
    public novalidate: boolean;

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
    public target: '_blank' | '_self' | '_parent' | '_top';

    public get isValid(): boolean {
        return this.isValidValue;
    }

    @Input()
    public set isValid(_: boolean) {
        // Ignore the value from the binding
    }

    @Output()
    public readonly submit = new EventEmitter<void>();

    @Output()
    public readonly isValidChange = new EventEmitter<boolean>();

    public constructor() {
        super(false);
        this.classes.register('success', 'warning', 'error');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        FormComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    private releaseFields(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(subscription => subscription.unsubscribe());
            this.subscriptions = undefined;
        }
    }

    private subscribeFields(): void {
        if (this.fieldComponents) {
            this.subscriptions = this.fieldComponents.map(field => field.errorChange.subscribe(() => this.refreshIsValid()));
        }
    }

    private refreshIsValid(): void {
        const hasError = this.fieldComponents.some(field => field.error);
        const isValid = !hasError;
        this.error = hasError;
        if (this.isValidValue !== isValid) {
            this.isValidValue = isValid;
            // Delay the notification be fire the change outside the check to ensure a change detection run will be started
            setTimeout(() => this.isValidChange.emit(isValid));
        }
    }

    public validateAndSubmit(): void {
        if (this.error) {
            this.fieldComponents.forEach(field => field.forceValidation());
        } else {
            this.submit.emit();
        }
    }
}

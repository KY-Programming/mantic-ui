import { Component, EventEmitter, HostBinding, HostListener, inject, Input, Output } from '@angular/core';
import { Key } from '../../models/key';
import { BooleanLike } from '../../models/boolean-like';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { InvertibleComponent } from '../../base/invertible.component';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { DisabledDirective } from '../../directives/disabled.directive';
import { ReadOnlyDirective } from '../../directives/read-only.directive';

@Component({
    selector: 'm-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        FormsModule
    ],
    hostDirectives: CheckboxComponent.directives,
    providers: CheckboxComponent.providers
})
export class CheckboxComponent extends InvertibleComponent {
    public static readonly defaults = {
        checkIcon: <IconType>'check',
        checkIconSize: <IconSize>'small',
        indeterminateIcon: <IconType>'minus',
        indeterminateIconSize: <IconSize>'small',
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    protected static override readonly providers = [...InvertibleComponent.providers];
    protected static override readonly directives = [...InvertibleComponent.directives, DisabledDirective.default, ReadOnlyDirective.default];

    private readonly readOnlyDirective = inject(ReadOnlyDirective, { self: true });
    private readonly disabledDirective = inject(DisabledDirective, { self: true });
    private nameValue?: string;
    private labelValue?: string;
    private isChecked = false;
    private isIndeterminate = false;
    protected readonly defaults = CheckboxComponent.defaults;

    public get readonly(): boolean {
        return this.readOnlyDirective.readonly;
    }

    public set readonly(value: BooleanLike) {
        this.readOnlyDirective.readonly = value;
    }

    public get disabled(): boolean {
        return this.disabledDirective.disabled;
    }

    public set disabled(value: BooleanLike) {
        this.disabledDirective.disabled = value;
    }

    @Input()
    public get value(): boolean {
        return this.isChecked;
    }

    public set value(value: BooleanLike) {
        this.isChecked = this.toBoolean(value);
    }

    @Output()
    public readonly valueChange = new EventEmitter<boolean>();

    @Input()
    public get name(): string {
        return this.nameValue ?? '';
    }

    public set name(value: string | undefined) {
        this.nameValue = value;
        this.classes.set('name', value);
    }

    @Input()
    public get label(): string | undefined {
        return this.labelValue;
    }

    public set label(value: string | undefined) {
        this.labelValue = value;
        this.classes.set('label', value);
    }

    @Input()
    @HostBinding('class.checked')
    public get checked(): boolean {
        return this.isChecked;
    }

    public set checked(value: BooleanLike) {
        this.isChecked = this.toBoolean(value);
    }

    @Output()
    public readonly checkedChange = this.valueChange;

    @Input()
    @HostBinding('class.indeterminate')
    public get indeterminate(): boolean {
        return this.isIndeterminate;
    }

    public set indeterminate(value: BooleanLike) {
        this.isIndeterminate = this.toBoolean(value);
    }

    @Output()
    public readonly indeterminateChange = this.valueChange;

    @Input()
    public canUncheck = true;

    @Input()
    public checkIcon?: IconType;

    @Input()
    public checkIconSize?: IconSize;

    @Input()
    public indeterminateIcon?: IconType;

    @Input()
    public indeterminateIconSize?: IconSize;

    @HostBinding('class.checkbox')
    public readonly checkbox = true;

    public constructor() {
        super();
        this.classes.register('indeterminate', 'fitted', 'checked', 'value', 'name', 'label', 'readonly');
        CheckboxComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    @HostListener('click', ['$event'])
    protected onClick(event: MouseEvent): void {
        if (event.target instanceof HTMLInputElement || this.readOnlyDirective.readonly || this.disabledDirective.disabled) {
            return;
        }
        this.set(!this.value);
    }

    @HostListener('keydown', ['$event'])
    protected onKeyDown(event: KeyboardEvent): void {
        if (this.readOnlyDirective.readonly || this.disabledDirective.disabled || !Key.space.is(event)) {
            return;
        }
        event.preventDefault();
        this.set(!this.value);
    }

    protected set(value: boolean): void {
        if (!value && !this.canUncheck) {
            return;
        }
        this.indeterminate = false;
        if (this.value !== value) {
            this.value = value;
            this.onChange();
        }
        this.refreshClasses();
    }

    protected onChange(): void {
        this.valueChange.emit(this.isChecked);
    }

}

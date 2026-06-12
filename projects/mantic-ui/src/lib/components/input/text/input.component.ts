import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { IconComponent } from '../../icon/icon.component';
import { InputBaseComponent } from '../input-base.component';

export declare type InputIconPosition =
    'left'
    | 'right';

export declare type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'urlweek';

@Component({
    selector: 'm-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    imports: [IconComponent, FallbackForDirective, FormsModule, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...InputBaseComponent.providers]
})
export class InputComponent extends InputBaseComponent {
    private typeValue?: InputType;

    public readonly value = input<string>();

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get text(): string {
        return this.value() ?? this.default();
    }

    public set text(value: string | undefined) {
        this.value = value;
    }

    public readonly default = input('');

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get type(): InputType | undefined {
        return this.typeValue;
    }

    public set type(value: InputType | undefined) {
        this.typeValue = value;
        this.isColor = value === 'color';
        if (this.isColor) {
            this.label = { position: 'right' };
        }
    }

    public readonly maxlength = input<string | number>();

    @Output()
    public readonly valueChange = new EventEmitter<string | undefined>();

    @Output()
    public readonly textChange = new EventEmitter<string>();

    @ContentChild('input')
    protected set contentInputElement(input: ElementRef<HTMLInputElement>) {
        this.unbindEvents();
        this.inputElement = input;
        this.refreshInput();
        this.bindEvents();
        this.refreshFocus();
    }

    @ViewChild('input')
    protected set viewInputElement(input: ElementRef<HTMLInputElement>) {
        this.unbindEvents();
        this.inputElement = input;
        this.bindEvents();
        this.refreshFocus();
    }

    public constructor() {
        super();
        this.classes.register('maxlength', 'type', 'defaultValue', 'value', 'text');
    }

    protected onChange(): void {
        value ??= this.default();
        this.valueChange.emit(value);
        this.textChange.emit(this.text);
    }
}

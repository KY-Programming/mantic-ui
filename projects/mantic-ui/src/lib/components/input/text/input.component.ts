import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        FallbackForDirective,
        FormsModule
    ],
    providers: [...InputBaseComponent.providers]
})
export class InputComponent extends InputBaseComponent {
    private typeValue?: InputType;

    @Input()
    public value: string | undefined;

    @Input()
    public get text(): string {
        return this.value ?? this.default;
    }

    public set text(value: string | undefined) {
        this.value = value;
    }

    @Input()
    public default = '';

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

    @Input()
    public maxlength: string | number | undefined;

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
        this.value ??= this.default;
        this.valueChange.emit(this.value);
        this.textChange.emit(this.text);
    }
}

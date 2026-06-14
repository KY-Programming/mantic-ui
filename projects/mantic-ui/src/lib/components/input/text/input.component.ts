import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, ContentChild, effect, ElementRef, input, output, signal, untracked, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { LabelPosition } from '../../../models/label-position';
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
    providers: [...InputBaseComponent.providers]
})
export class InputComponent extends InputBaseComponent {
    protected readonly valueState = signal<string | undefined>(undefined);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly valueInput = input<string | undefined>(undefined, { alias: 'value' });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly textInput = input<string | undefined>(undefined, { alias: 'text' });
    public readonly default = input('');
    public readonly type = input<InputType>();
    public readonly maxlength = input<string | number>();
    public readonly value = computed(() => this.valueState());
    public readonly text = computed(() => this.valueState() ?? this.default());
    public readonly valueChange = output<string | undefined>();
    public readonly textChange = output<string>();

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
        // [value] flows into the shared state; [text] is guarded so an unbound alias can't clobber [value].
        effect(() => {
            const value = this.valueInput();
            untracked(() => this.valueState.set(value));
        });
        effect(() => {
            const value = this.textInput();
            untracked(() => {
                if (value !== undefined) {
                    this.valueState.set(value);
                }
            });
        });
        // type === 'color' toggles the color layout and forces the label to the right.
        effect(() => {
            const isColor = this.type() === 'color';
            this.isColor.set(isColor);
            if (isColor) {
                this.label.set({ position: signal<LabelPosition>('right') });
            }
        });
    }

    protected setValue(value: string | undefined): void {
        this.valueState.set(value);
        this.onChange();
    }

    protected onChange(): void {
        this.valueChange.emit(this.value() ?? this.default());
        this.textChange.emit(this.text());
    }
}

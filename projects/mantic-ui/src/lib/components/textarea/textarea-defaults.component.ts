import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TextareaComponent } from './textarea.component';

@Component({
    selector: 'm-textarea-defaults',
    changeDetection: ChangeDetectionStrategy.Eager,
    template: '',
    })
export class TextareaDefaultsComponent {
    @Input()
    public set inverted(value: boolean) {
        TextareaComponent.defaults.inverted = value;
        TextareaComponent.defaults.invertedChange.next(value);
    }
}

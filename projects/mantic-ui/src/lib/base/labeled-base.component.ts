import { ContentChild, Directive, HostBinding, Input } from '@angular/core';
import { LabelDropdownComponent } from '../components/label-dropdown/label-dropdown.component';
import { LabelComponent } from '../components/label/label.component';
import { IconButtonComponent } from '../components/icon-button/icon-button.component';
import { ButtonComponent } from '../components/button/button.component';
import { LabelOptions } from '../models/label-options';
import { InvertibleComponent } from './invertible.component';

@Directive()
export abstract class LabeledBaseComponent extends InvertibleComponent {
    private labelValue: LabelOptions;
    private labelDropdownValue: LabelDropdownComponent;

    @ContentChild(LabelComponent)
    public get label(): LabelOptions {
        return this.labelValue;
    }

    public set label(value: LabelOptions) {
        this.labelValue = value;
        if (value) {
            this.classList.set('labeled', (value.position ?? '') + ' labeled');
        }
    }

    @ContentChild(LabelDropdownComponent)
    public get labelDropdown(): LabelDropdownComponent {
        return this.labelDropdownValue;
    }

    public set labelDropdown(value: LabelDropdownComponent) {
        this.labelDropdownValue = value;
        if (value) {
            this.classList.set('labeled', (value.position ?? '') + ' labeled');
        }
    }

    @ContentChild(IconButtonComponent)
    public iconButton: IconButtonComponent;

    @ContentChild(ButtonComponent)
    public button: ButtonComponent;

    public get isRight(): boolean {
        return this.label && this.label.position === 'right' || this.labelDropdown && this.labelDropdown.position === 'right';
    }

    @Input()
    public buttonPosition: 'left' | 'right' = 'right';

    @HostBinding('class.action')
    public get isAction(): boolean {
        return !!this.button || !!this.iconButton;
    }

    protected constructor() {
        super();
        this.classList.register('labeled');
        //TODO: Implement actions
        // .registerAction('labelDropdown', (entry) => entry.classes = this.labelDropdown ? ((this.labelDropdown.position || '') + ' labeled').trim() : undefined);
    }

}

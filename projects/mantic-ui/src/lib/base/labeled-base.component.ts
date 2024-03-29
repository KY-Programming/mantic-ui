import { ContentChild, Directive, HostBinding, Input } from '@angular/core';
import { ButtonComponent } from '../components/button/button.component';
import { IconButtonComponent } from '../components/icon-button/icon-button.component';
import { LabelDropdownComponent } from '../components/label-dropdown/label-dropdown.component';
import { LabelComponent } from '../components/label/label.component';
import { LabelOptions } from '../models/label-options';
import { InvertibleComponent } from './invertible.component';

@Directive()
export abstract class LabeledBaseComponent extends InvertibleComponent {
    protected static override readonly providers = [...InvertibleComponent.providers];

    private labelValue: LabelOptions | undefined;
    private labelDropdownValue: LabelDropdownComponent | undefined;

    @ContentChild(LabelComponent)
    public get label(): LabelOptions | undefined {
        return this.labelValue;
    }

    public set label(value: LabelOptions | undefined) {
        this.labelValue = value;
        if (value) {
            this.classes.set('labeled', (value.position ?? '') + ' labeled');
        }
    }

    @ContentChild(LabelDropdownComponent)
    public get labelDropdown(): LabelDropdownComponent | undefined {
        return this.labelDropdownValue;
    }

    public set labelDropdown(value: LabelDropdownComponent | undefined) {
        this.labelDropdownValue = value;
        if (value) {
            this.classes.set('labeled', (value.position ?? '') + ' labeled');
        }
    }

    @ContentChild(IconButtonComponent)
    protected iconButton: IconButtonComponent | undefined;

    @ContentChild(ButtonComponent)
    protected button: ButtonComponent | undefined;

    public get isRight(): boolean {
        return !!this.label && this.label.position === 'right' || !!this.labelDropdown && this.labelDropdown.position === 'right';
    }

    @Input()
    public buttonPosition: 'left' | 'right' = 'right';

    @HostBinding('class.action')
    public get isAction(): boolean {
        return !!this.button || !!this.iconButton;
    }

    protected constructor() {
        super();
        this.classes.register('labeled');
        //TODO: Implement actions
        // .registerAction('labelDropdown', (entry) => entry.classes = this.labelDropdown ? ((this.labelDropdown.position || '') + ' labeled').trim() : undefined);
    }

}

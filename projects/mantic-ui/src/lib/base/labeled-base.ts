import { ContentChild, ElementRef } from '@angular/core';
import { LabelDropdownComponent } from '../label-dropdown/label-dropdown.component';
import { LabelComponent } from '../label/label.component';
import { ElementBase } from './element-base';

export class LabeledBase extends ElementBase {

    @ContentChild(LabelComponent, { static: true })
    public label: LabelComponent;

    @ContentChild(LabelDropdownComponent, { static: true })
    public labelDropdown: LabelDropdownComponent;

    public constructor(
        readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            .registerAction('label', (entry) => entry.classes = this.label ? (this.label.position || '') + ' labeled' : undefined)
            .registerAction('labelDropdown', (entry) => entry.classes = this.labelDropdown ? (this.labelDropdown.position || '') + ' labeled' : undefined);
    }

}

import { Component, ContentChild, ElementRef } from '@angular/core';
import { LabelDropdownComponent } from '../label-dropdown/label-dropdown.component';
import { LabelComponent } from '../label/label.component';
import { BaseComponent } from './base.component';

@Component({
    template: ''
})
export class LabeledBaseComponent extends BaseComponent {

    @ContentChild(LabelComponent)
    public label: LabelComponent;

    @ContentChild(LabelDropdownComponent)
    public labelDropdown: LabelDropdownComponent;

    public get isRight(): boolean {
        return this.label && this.label.position === 'right' || this.labelDropdown && this.labelDropdown.position === 'right';
    }

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            //TODO: Implement actions
            // .registerAction('label', (entry) => entry.classes = this.label ? ((this.label.position || '') + ' labeled').trim() : undefined)
        // .registerAction('labelDropdown', (entry) => entry.classes = this.labelDropdown ? ((this.labelDropdown.position || '') + ' labeled').trim() : undefined);
    }

}

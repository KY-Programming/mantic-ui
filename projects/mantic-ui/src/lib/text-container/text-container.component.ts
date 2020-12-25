import { Component, ElementRef, HostBinding } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-text-container',
    templateUrl: './text-container.component.html',
    styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent extends BaseComponent {
    @HostBinding('class.text')
    @HostBinding('class.container')
    public readonly menu = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
    }

}

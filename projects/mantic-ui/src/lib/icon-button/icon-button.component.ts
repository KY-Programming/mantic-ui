import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ButtonBaseComponent } from '../base/button-base.component';
import { IconSize } from '../icon/icon.component';

@Component({
    selector: 'm-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent extends ButtonBaseComponent {

    @Input()
    public icon: string;

    @Input()
    public iconSize: IconSize;

    @Input()
    @HostBinding('class.social')
    public social: string;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('icon', 'iconSize', 'social').registerFixed('icon');
    }
}

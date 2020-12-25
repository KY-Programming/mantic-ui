import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ButtonBaseComponent } from '../base/button-base.component';

@Component({
    selector: 'm-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent extends ButtonBaseComponent {

    @Input()
    public icon: string;

    @Input()
    @HostBinding('class.social')
    public social: string;

    @HostBinding('class.icon')
    public readonly iconHost = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            .register('icon')
            .register('social');
    }
}

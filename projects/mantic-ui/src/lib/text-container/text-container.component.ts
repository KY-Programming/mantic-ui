import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-text-container',
    templateUrl: './text-container.component.html',
    styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent extends BaseComponent {
    private isFluid = false;

    @Input()
    @HostBinding('class.fluid')
    public get fluid(): boolean | string {
        return this.isFluid;
    }

    public set fluid(value: string | boolean) {
        this.isFluid = this.toBoolean(value);
    }


    @HostBinding('class.text')
    @HostBinding('class.container')
    public readonly menu = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
    }

}

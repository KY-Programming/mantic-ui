import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends BaseComponent {
    private isActive = true;

    public get active(): boolean | string {
        return this.isActive;
    }

    @Input()
    @HostBinding('class.active')
    public set active(value: boolean | string) {
        this.isActive = this.toBoolean(value);
    }

    @HostBinding('class.loader')
    public readonly loader = true;

    constructor(
        element: ElementRef<HTMLElement>
    ) {
        super(element);
    }

}

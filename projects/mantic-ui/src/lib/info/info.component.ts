import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent extends BaseComponent {
    private isIgnored: boolean;

    @Input()
    @HostBinding('class.ignored')
    public get ignored(): boolean | string {
        return this.isIgnored;
    }

    public set ignored(value: string | boolean) {
        this.isIgnored = this.toBoolean(value);
    }

    @HostBinding('class.info')
    @HostBinding('class.message')
    public readonly message = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            .registerBoolean('ignored');
    }
}

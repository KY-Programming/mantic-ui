import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

@Component({
    selector: 'm-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent extends BaseComponent {
    private isIgnored: boolean;

    @Input()
    @HostBinding('class.ignored')
    public get ignored(): boolean {
        return this.isIgnored;
    }

    public set ignored(value: BooleanLike) {
        this.isIgnored = this.toBoolean(value);
    }

    @HostBinding('class.visible')
    @HostBinding('class.info')
    @HostBinding('class.message')
    public readonly message = true;

    public constructor() {
        super();
        this.classList.register('ignored');
    }
}

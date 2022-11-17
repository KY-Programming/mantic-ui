import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';

export declare type HeaderSize = 'huge' | 'large' | 'medium' | 'small' | 'tiny';

@Component({
    selector: 'm-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
    private sizeValue: HeaderSize;

    @Input()
    public icon: IconType;

    @Input()
    public iconSize: IconSize;

    @Input()
    public get size(): HeaderSize {
        return this.sizeValue;
    }

    public set size(value: HeaderSize) {
        this.sizeValue = value;
        this.classList.set('size', value);
    }

    @HostBinding('class.header')
    public readonly header = true;

    public constructor() {
        super();
        this.classList.register('size');
    }
}

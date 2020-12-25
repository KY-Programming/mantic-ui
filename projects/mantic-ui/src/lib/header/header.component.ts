import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ColorName } from '../models/color';

export declare type HeaderSize = 'huge' | 'large' | 'medium' | 'small' | 'tiny';

@Component({
    selector: 'm-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
    private sizeValue: HeaderSize;

    public get size(): HeaderSize {
        return this.sizeValue;
    }

    @Input()
    public set size(value: HeaderSize) {
        this.sizeValue = value;
        this.classList.set('size', value);
        this.refreshClasses();
    }

    @HostBinding('class.header')
    public readonly header = true;

    constructor(elementRef: ElementRef<HTMLElement>) {
        super(elementRef);
        this.classList
            .register('size');
    }
}

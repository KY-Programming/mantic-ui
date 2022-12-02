import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';

export declare type LoaderSize = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';

@Component({
    selector: 'm-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends BaseComponent {
    private isActive = true;
    private textValue: string;
    private isInline: boolean;
    private isInverted: boolean;
    private sizeValue: LoaderSize;

    public get active(): boolean {
        return this.isActive;
    }

    @Input()
    @HostBinding('class.active')
    public set active(value: BooleanLike) {
        this.isActive = this.toBoolean(value);
    }

    public get inline(): boolean {
        return this.isInline;
    }

    @Input()
    @HostBinding('class.inline')
    public set inline(value: BooleanLike) {
        this.isInline = this.toBoolean(value);
    }

    public get inverted(): boolean {
        return this.isInverted;
    }

    @Input()
    @HostBinding('class.inverted')
    public set inverted(value: BooleanLike) {
        this.isInverted = this.toBoolean(value);
    }

    public get text(): string {
        return this.textValue;
    }

    @Input()
    public set text(value: string) {
        this.textValue = value;
        this.classList.set('text', value || value === '');
    }

    public get size(): LoaderSize {
        return this.sizeValue;
    }

    @Input()
    public set size(value: LoaderSize) {
        this.sizeValue = value;
        this.classList.set('size', value);
    }

    @HostBinding('class.loader')
    public readonly loader = true;

    public constructor() {
        super();
        this.classList.register('active', 'inline', 'inverted', 'text', 'size');
    }

}

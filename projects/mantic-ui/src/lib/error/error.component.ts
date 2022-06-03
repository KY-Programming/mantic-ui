import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

@Component({
    selector: 'm-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent extends BaseComponent {
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
    @HostBinding('class.error')
    @HostBinding('class.message')
    public readonly message = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('ignored');
    }
}

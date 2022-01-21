import { Component, ElementRef, Inject, Input, Optional } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent extends BaseComponent {
    private isActive: boolean;

    @Input()
    public get active(): boolean {
        return this.isActive;
    }

    public set active(value: string | boolean) {
        this.isActive = this.toBoolean(value);
        this.classList.set('active', this.isActive);
    }

    constructor(
        elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject('none') useUiClass = true
    ) {
        super(elementRef, useUiClass);
        this.classList.register('active').registerFixed('item');
    }
}

import { Component, EventEmitter, HostBinding, Inject, Input, Optional, Output } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent extends BaseComponent {
    private isActive: boolean;
    private isLink: boolean;

    @Input()
    public get active(): boolean {
        return this.isActive;
    }

    public set active(value: BooleanLike) {
        this.isActive = this.toBoolean(value);
        this.classList.set('active', this.isActive);
    }

    @Input()
    @HostBinding('class.link')
    public get link(): boolean {
        return this.isLink;
    }

    public set link(value: BooleanLike) {
        this.isLink = this.toBoolean(value);
    }

    @Output()
    public readonly activeChange = new EventEmitter<boolean>();

    public constructor(
        @Optional() @Inject('none') useUiClass = true
    ) {
        super(useUiClass);
        this.classList.register('active', 'link').registerFixed('item');
    }
}

import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { BaseComponent } from '../base/base.component';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { ExpanderIconComponent } from '../expander-icon/expander-icon.component';

@Component({
    selector: 'm-expander-part',
    templateUrl: './expander-part.component.html',
    styleUrls: ['./expander-part.component.scss']
})
export class ExpanderPartComponent extends BaseComponent {
    private isExpanded: boolean;

    @Input()
    @HostBinding('class.expandable')
    public expandable? = true;

    @Input()
    @HostBinding('class.expanded')
    public get expanded(): boolean {
        return this.isExpanded && this.expandable !== false;
    }

    public set expanded(value: BooleanLike) {
        this.isExpanded = this.toBoolean(value);
    }

    @Input()
    public dropdownIcon: IconType;

    @Input()
    public dropdownIconSize: IconSize;

    @Output()
    public readonly expandedChange = new EventEmitter<boolean>();

    @ViewChild(ExpanderIconComponent)
    protected icon: ExpanderIconComponent;

    public constructor() {
        super(false);
        this.classList.register('expanded', 'expandable');
    }

    @HostListener('click')
    protected onClick(): void {
        if (this.expandable === false) {
            return;
        }
        this.icon.toggle();
    }
}

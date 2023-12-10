import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { ExpanderIconComponent } from '../expander-icon/expander-icon.component';
import { FillComponent } from '../flex/fill/fill.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';

@Component({
    selector: 'm-expander-part',
    templateUrl: './expander-part.component.html',
    styleUrls: ['./expander-part.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FillComponent,
        ExpanderIconComponent
    ],
    providers: [...BaseComponent.providers]
})
export class ExpanderPartComponent extends BaseComponent {
    private isExpanded = false;

    @Input()
    @HostBinding('class.expandable')
    public expandable: boolean | undefined = true;

    @Input()
    @HostBinding('class.expanded')
    public get expanded(): boolean {
        return this.isExpanded && this.expandable !== false;
    }

    public set expanded(value: BooleanLike) {
        this.isExpanded = this.toBoolean(value);
    }

    @Input()
    public dropdownIcon: IconType | undefined;

    @Input()
    public dropdownIconSize: IconSize;

    @Output()
    public readonly expandedChange = new EventEmitter<boolean>();

    @ViewChild(ExpanderIconComponent)
    protected icon: ExpanderIconComponent | undefined;

    public constructor() {
        super(false);
        this.classes.register('expanded', 'expandable');
    }

    @HostListener('click')
    private onClick(): void {
        if (this.expandable === false) {
            return;
        }
        this.icon?.toggle();
    }
}

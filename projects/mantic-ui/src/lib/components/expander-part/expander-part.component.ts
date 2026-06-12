import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ChangeDetectionStrategy, input, viewChild } from '@angular/core';
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
    imports: [
        FillComponent,
        ExpanderIconComponent
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...BaseComponent.providers]
})
export class ExpanderPartComponent extends BaseComponent {
    private isExpanded = false;

    @HostBinding('class.expandable')
public readonly expandable = input<boolean | undefined>(true);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.expanded')
    public get expanded(): boolean {
        return this.isExpanded && this.expandable() !== false;
    }

    public set expanded(value: BooleanLike) {
        this.isExpanded = this.toBoolean(value);
    }

    public readonly dropdownIcon = input<IconType>();

    public readonly dropdownIconSize = input<IconSize>();

    @Output()
    public readonly expandedChange = new EventEmitter<boolean>();

    protected readonly icon = viewChild(ExpanderIconComponent);

    public constructor() {
        super(false);
        this.classes.register('expanded', 'expandable');
    }

    @HostListener('click')
    protected onClick(): void {
        if (this.expandable() === false) {
            return;
        }
        this.icon()?.toggle();
    }
}

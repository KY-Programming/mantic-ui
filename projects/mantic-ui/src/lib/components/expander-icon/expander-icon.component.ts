import { Component, EventEmitter, HostBinding, Input, Output, ChangeDetectionStrategy, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { ExpanderComponent } from '../expander/expander.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'm-expander-icon',
    templateUrl: './expander-icon.component.html',
    styleUrls: ['./expander-icon.component.scss'],
    imports: [
        IconComponent
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...BaseComponent.providers]
})
export class ExpanderIconComponent extends BaseComponent {
    private isExpanded = false;
    protected readonly defaults = ExpanderComponent.defaults;

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    @HostBinding('class.expanded')
    public get expanded(): boolean {
        return this.isExpanded;
    }

    public set expanded(value: BooleanLike) {
        this.isExpanded = this.toBoolean(value);
    }

    public readonly dropdownIcon = input<IconType>();

    public readonly dropdownIconSize = input<IconSize>();

    @Output()
    public readonly expandedChange = new EventEmitter<boolean>();

    public constructor() {
        super();
    }

    public toggle(): void {
        if (this.isExpanded) {
            this.collapse();
        }
        else {
            this.expand();
        }
    }

    public collapse(): void {
        this.isExpanded = false;
        this.expandedChange.emit(this.isExpanded);
    }

    public expand(): void {
        this.isExpanded = true;
        this.expandedChange.emit(this.isExpanded);
    }
}

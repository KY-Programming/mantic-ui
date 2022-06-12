import { Component, ContentChild, Input } from '@angular/core';
import { ExpanderHeaderComponent } from './expander-header.component';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';

@Component({
    selector: 'm-expander',
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss']
})
export class ExpanderComponent extends BaseComponent {
    public static readonly defaults = { dropdownIcon: <IconType>'dropdown', dropdownIconSize: <IconSize>undefined };
    private isExpanded: boolean;
    protected readonly defaults = ExpanderComponent.defaults;

    @Input()
    public header: string | undefined;

    @ContentChild(ExpanderHeaderComponent)
    public headerTemplate: ExpanderHeaderComponent | undefined;

    @Input()
    public get expanded(): boolean {
        return this.isExpanded;
    }

    public set expanded(value: BooleanLike) {
        this.isExpanded = this.toBoolean(value);
    }

    @Input()
    public dropdownIcon: IconType;

    @Input()
    public dropdownIconSize: IconSize;

    public constructor() {
        super();
        this.classList.registerFixed('fluid', 'styled', 'accordion');
    }

    public toggle(): void {
        if (this.isExpanded) {
            this.collapse();
        } else {
            this.expand();
        }
    }

    public collapse(): void {
        this.isExpanded = false;
    }

    public expand(): void {
        this.isExpanded = true;
    }
}

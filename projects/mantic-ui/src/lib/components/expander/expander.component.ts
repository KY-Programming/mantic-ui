import { Component, ContentChild, Input } from '@angular/core';
import { ExpanderHeaderComponent } from './expander-header.component';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-expander',
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent
    ],
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class ExpanderComponent extends BaseComponent {
    public static readonly defaults = {
        dropdownIcon: <IconType>'caret right',
        dropdownIconSize: <IconSize>undefined
    };
    private isExpanded: boolean;
    protected readonly defaults = ExpanderComponent.defaults;

    @Input()
    public header: string | undefined;

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

    @ContentChild(ExpanderHeaderComponent)
    protected headerTemplate: ExpanderHeaderComponent | undefined;

    public constructor() {
        super();
        this.classes.register('header', 'expanded', 'dropdownIcon', 'dropdownIconSize')
            .registerFixed('fluid', 'styled', 'accordion');
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

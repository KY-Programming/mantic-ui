import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { BooleanLike } from '../../models/boolean-like';
import { FillComponent } from '../flex/fill/fill.component';
import { FlexComponent } from '../flex/flex.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';
import { ExpanderHeaderComponent } from './expander-header.component';

@Component({
    selector: 'm-expander',
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss'],
    standalone: true,
    imports: [CommonModule, IconComponent, FlexComponent, FillComponent],
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class ExpanderComponent extends BaseComponent {
    public static readonly defaults = {
        dropdownIcon: <IconType>'caret right',
        dropdownIconSize: <IconSize>undefined
    };
    private isExpanded = false;
    private isBasic = false;
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
    public dropdownIcon: IconType | undefined;

    @Input()
    public dropdownIconSize: IconSize;

    @Input()
    public get basic(): boolean {
        return this.isBasic;
    }

    public set basic(value: BooleanLike) {
        this.isBasic = this.toBoolean(value);
        this.classes.set('styled', !this.isBasic);
    }

    @Input()
    public iconPosition: 'left' | 'right' = 'left';

    @ContentChild(ExpanderHeaderComponent)
    protected headerTemplate: ExpanderHeaderComponent | undefined;

    public constructor() {
        super();
        this.classes.register('header', 'expanded', 'dropdownIcon', 'dropdownIconSize', 'styled')
            .registerFixed('fluid', 'accordion');
        this.classes.set('styled', true);
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
    }

    public expand(): void {
        this.isExpanded = true;
    }
}

import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, effect, input, output, signal } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { transformableModel } from '../../helpers/transformable-model';
import { BooleanLike } from '../../models/boolean-like';
import { FillComponent } from '../flex/fill/fill.component';
import { FlexComponent } from '../flex/flex.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { ExpanderHeaderComponent } from './expander-header.component';

@Component({
    selector: 'm-expander',
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss'],
    imports: [IconComponent, FlexComponent, FillComponent, NgTemplateOutlet],
    providers: [...BaseComponent.providers]
})
export class ExpanderComponent extends BaseComponent {
    public static readonly defaults = {
        dropdownIcon: signal<IconType>('caret right'),
        dropdownIconSize: signal<IconSize>(undefined)
    };
    protected readonly defaults = ExpanderComponent.defaults;
    public readonly header = input<string>();
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly expandedInput = input<boolean, BooleanLike>(false, { alias: 'expanded', transform: toBoolean });
    public readonly expandedChange = output<boolean>();
    public readonly expanded = transformableModel(this.expandedInput, this.expandedChange, toBoolean);
    public readonly dropdownIcon = input<IconType>();
    public readonly dropdownIconSize = input<IconSize>();
    public readonly basic = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly iconPosition = input<'left' | 'right'>('left');
    protected readonly headerTemplate = contentChild(ExpanderHeaderComponent);

    public constructor() {
        super();
        this.classes.register('header', 'expanded', 'dropdownIcon', 'dropdownIconSize', 'styled')
            .registerFixed('fluid', 'accordion');
        effect(() => this.classes.set('styled', !this.basic()));
    }

    public toggle(): void {
        if (this.expanded()) {
            this.collapse();
        }
        else {
            this.expand();
        }
    }

    public collapse(): void {
        this.expanded.set(false);
    }

    public expand(): void {
        this.expanded.set(true);
    }
}

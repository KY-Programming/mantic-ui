import { Component, input, model, signal } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { LabelPosition } from '../../models/label-position';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';

// TODO: Enable animation
// TODO: Enable active state
@Component({
    selector: 'm-label-dropdown',
    templateUrl: './label-dropdown.component.html',
    styleUrls: ['./label-dropdown.component.scss'],
    imports: [IconComponent],
    providers: [...BaseComponent.providers],
    host: {
        '(click)': 'onClick($event)'
    }
})
export class LabelDropdownComponent extends BaseComponent {
    public static readonly defaults = { dropdownIcon: signal<IconType>('dropdown'), dropdownIconSize: signal<IconSize>(undefined) };
    protected readonly defaults = LabelDropdownComponent.defaults;
    public readonly isOpen = signal(false);
    public readonly position = input<LabelPosition>();
    public readonly dropdownIcon = input<IconType>();
    public readonly dropdownIconSize = input<IconSize>();
    public readonly value = model<string>();
    public readonly items = input<string[]>();

    public constructor() {
        super();
        this.classes.registerFixed('dropdown', 'label');
    }

    private readonly onOutsideClickHandler = (): void => this.close();

    protected onClick(event: MouseEvent): void {
        // TODO: Replace prevent
        event.preventDefault();
        event.stopPropagation();
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.isOpen.set(true);
            globalThis.addEventListener('click', this.onOutsideClickHandler);
        }
    }

    private close(): void {
        globalThis.removeEventListener('click', this.onOutsideClickHandler);
        this.isOpen.set(false);
    }

    public select(value: string): void {
        this.value.set(value);
    }
}

import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { LabelPosition } from '../../models/label-position';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';

// TODO: Enable animation
// TODO: Enable active state
@Component({
    selector: 'm-label-dropdown',
    templateUrl: './label-dropdown.component.html',
    styleUrls: ['./label-dropdown.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent
    ],
    providers: [...BaseComponent.providers]
})
export class LabelDropdownComponent extends BaseComponent {
    public static readonly defaults = { dropdownIcon: <IconType>'dropdown', dropdownIconSize: <IconSize>undefined };
    protected readonly defaults = LabelDropdownComponent.defaults;

    public isOpen = false;

    @Input()
    public position: LabelPosition;

    @Input()
    public dropdownIcon: IconType | undefined;

    @Input()
    public dropdownIconSize: IconSize;

    @Input()
    public value: string | undefined;

    @Input()
    public items: string[] | undefined;

    public constructor() {
        super();
        this.classes.registerFixed('dropdown', 'label');
    }

    private readonly onOutsideClickHandler = () => this.close();

    @HostListener('click', ['$event'])
    private onClick(event: MouseEvent): void {
        // TODO: Replace prevent
        event.preventDefault();
        event.stopPropagation();
        if (this.isOpen) {
            this.close();
        }
        else {
            this.isOpen = true;
            window.addEventListener('click', this.onOutsideClickHandler);
        }
    }

    private close(): void {
        window.removeEventListener('click', this.onOutsideClickHandler);
        this.isOpen = false;
    }

    public select(value: string): void {
        this.value = value;
    }
}

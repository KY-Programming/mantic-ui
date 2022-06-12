import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { LabelPosition } from '../label/label-position';
import { BaseComponent } from '../base/base.component';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';

// TODO: Enable animation
// TODO: Enable active state
@Component({
    selector: 'm-label-dropdown',
    templateUrl: './label-dropdown.component.html',
    styleUrls: ['./label-dropdown.component.scss']
})
export class LabelDropdownComponent extends BaseComponent {
    public static readonly defaults = { dropdownIcon: <IconType>'dropdown', dropdownIconSize: <IconSize>undefined };
    protected readonly defaults = LabelDropdownComponent.defaults;

    public isOpen = false;

    @Input()
    public position: LabelPosition;

    @Input()
    public dropdownIcon: IconType;

    @Input()
    public dropdownIconSize: IconSize;

    @Input()
    public value: string;

    @Input()
    public items: string[];

    private readonly onOutsideClickHandler = () => this.close();

    @HostBinding('class.dropdown')
    @HostBinding('class.label')
    public readonly label = true;

    public constructor() {
        super();
    }

    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        // TODO: Replace prevent
        event.preventDefault();
        event.stopPropagation();
        if (this.isOpen) {
            this.close();
        } else {
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

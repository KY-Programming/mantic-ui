import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef } from '@angular/core';
import { Key } from '../models/key';
import { ButtonBaseComponent } from '../base/button-base.component';
import { NgIfContext } from '@angular/common';

@Component({
    selector: 'm-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent extends ButtonBaseComponent {

    @ContentChild('active')
    public activeTemplate: TemplateRef<NgIfContext<boolean>>;

    public get checked(): boolean | string {
        return this.active;
    }

    @Input()
    @HostBinding('class.checked')
    public set checked(value: boolean | string) {
        this.active = value;
    }

    @Output()
    public readonly checkedChange = new EventEmitter<boolean>();

    @HostBinding('class.toggle')
    public readonly toggleButton = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('checked');
    }

    @HostListener('click')
    public toggle(): void {
        if (this.checked) {
            this.uncheck();
        }
        else {
            this.check();
        }
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (event.code === Key.space || event.code === Key.enter) {
            this.toggle();
            event.preventDefault();
        }
    }

    public check(): void {
        if (this.checked) {
            return;
        }
        this.checked = true;
        this.checkedChange.emit(this.checked);
    }

    public uncheck(): void {
        if (!this.checked) {
            return;
        }
        this.checked = false;
        this.checkedChange.emit(this.checked);
    }
}

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
        // this.checkedChange.emit(value);
        // this.refreshClasses();
    }

    @Output()
    public readonly checkedChange = new EventEmitter<boolean>();

    @HostBinding('class.toggle')
    public readonly toggleButton = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            .registerBoolean('checked');
    }

    @HostListener('click')
    public toggle(): void {
        this.checked = !this.checked;
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (event.code === Key.space || event.code === Key.enter) {
            this.checked = true;
            event.preventDefault();
        }
    }
}

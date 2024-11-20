import { CommonModule, NgIfContext } from '@angular/common';
import { Component, ContentChild, EventEmitter, HostBinding, HostListener, inject, Input, Output, TemplateRef } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { ActiveDirective } from '../../directives/active.directive';
import { BooleanLike } from '../../models/boolean-like';
import { Key } from '../../models/key';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'm-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: ['./toggle-button.component.scss'],
    imports: [
        CommonModule,
        IconComponent
    ],
    providers: [...ButtonBaseComponent.providers]
})
export class ToggleButtonComponent extends ButtonBaseComponent {
    private readonly activeDirective = inject(ActiveDirective, { self: true });

    @ContentChild('active')
    // eslint-disable-next-line no-null/no-null
    public activeTemplate: TemplateRef<NgIfContext<boolean>> | null = null;

    protected get active(): boolean {
        return this.activeDirective.active;
    }

    protected set active(value: BooleanLike) {
        this.activeDirective.active = value;
    }

    public get checked(): boolean {
        return this.active;
    }

    @Input()
    @HostBinding('class.checked')
    public set checked(value: BooleanLike) {
        this.active = value;
    }

    @Output()
    public readonly checkedChange = new EventEmitter<boolean>();

    public constructor() {
        super();
        this.classes.register('checked')
            .registerFixed('toggle');
    }

    @HostListener('click')
    private toggle(): void {
        if (this.checked) {
            this.uncheck();
        }
        else {
            this.check();
        }
    }

    @HostListener('keydown', ['$event'])
    private onKeyDown(event: KeyboardEvent): void {
        if (Key.is(event, Key.space, Key.enter)) {
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

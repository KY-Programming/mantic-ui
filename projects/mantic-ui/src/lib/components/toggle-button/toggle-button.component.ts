import { NgIfContext } from '@angular/common';
import { Component, contentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { BooleanLike } from '../../models/boolean-like';
import { Key } from '../../models/key';

@Component({
    selector: 'm-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: ['./toggle-button.component.scss'],
    imports: [],
    providers: [...ButtonBaseComponent.providers],
    host: {
        '[class.checked]': 'checked',
        '(click)': 'toggle()',
        '(keydown)': 'onKeyDown($event)'
    }
})
export class ToggleButtonComponent extends ButtonBaseComponent {
    public readonly activeTemplate = contentChild<TemplateRef<NgIfContext<boolean>> | null>('active');

    public get checked(): boolean {
        return this.active();
    }

    // Kept as accessor: assigned imperatively inside the class (check()/uncheck()) and has a paired checkedChange output; signal inputs are read-only.
    @Input()
    public set checked(value: BooleanLike) {
        this.active.set(value);
    }

    @Output()
    public readonly checkedChange = new EventEmitter<boolean>();

    public constructor() {
        super();
        this.classes.register('checked')
            .registerFixed('toggle');
    }

    protected toggle(): void {
        if (this.checked) {
            this.uncheck();
        }
        else {
            this.check();
        }
    }

    protected onKeyDown(event: KeyboardEvent): void {
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

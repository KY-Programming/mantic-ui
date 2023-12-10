import { CommonModule } from '@angular/common';
import { Component, HostListener, Optional } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { Key } from '../../models/key';
import { FormComponent } from '../form/form.component';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'm-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent
    ],
    providers: [...ButtonBaseComponent.providers]
})
export class SubmitComponent extends ButtonBaseComponent {

    public constructor(
        @Optional() private readonly form: FormComponent
    ) {
        super();
    }

    @HostListener('click')
    private onClick(): void {
        this.submit();
    }

    @HostListener('keydown', ['$event'])
    private onKeyDown(event: KeyboardEvent): void {
        if (Key.is(event, Key.space, Key.enter)) {
            this.submit();
            event.preventDefault();
        }
    }

    protected submit(): void {
        if (!this.form) {
            return;
        }
        this.form.validateAndSubmit();
    }
}

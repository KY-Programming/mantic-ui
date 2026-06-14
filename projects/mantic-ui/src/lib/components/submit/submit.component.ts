import { Component, inject } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { Key } from '../../models/key';
import { FormComponent } from '../form/form.component';

@Component({
    selector: 'm-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss'],
    imports: [],
    providers: [...ButtonBaseComponent.providers],
    host: {
        '(click)': 'onClick()',
        '(keydown)': 'onKeyDown($event)'
    }
})
export class SubmitComponent extends ButtonBaseComponent {
    private readonly form = inject(FormComponent, { optional: true });

    public constructor() {
        super();
    }

    protected onClick(): void {
        this.submit();
    }

    protected onKeyDown(event: KeyboardEvent): void {
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

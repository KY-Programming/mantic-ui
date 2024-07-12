import { Directive, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ButtonBaseComponent } from '../base/button-base.component';
import { ButtonComponent } from '../components/button/button.component';

@Directive({
    selector: '[m-button]',
    standalone: true,
    providers: [...ButtonBaseComponent.providers]
})
export class ButtonDirective extends ButtonBaseComponent implements OnInit {
    public constructor() {
        super();
        this.validateAttributes = false;
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        ButtonComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }
}

import { Component, ElementRef, HostBinding } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioService } from '../services/radio.service';

@Component({
    selector: 'm-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent extends CheckboxComponent {
    @HostBinding('class.toggle')
    public readonly toggle = true;

    constructor(
        elementRef: ElementRef<HTMLElement>,
        private readonly radioService: RadioService
    ) {
        super(elementRef);
        this.radioService.checked.pipe(
            filter(event => event.group && event.group === this.name && event.value !== this),
            takeUntil(this.destroy)
        ).subscribe(() => this.checked = false);
        this.valueChange.pipe(filter(checked => checked)).subscribe(() => this.radioService.check(this.name, this));
    }
}

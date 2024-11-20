import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { RadioService } from '../../services/radio.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
    selector: 'm-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    imports: [
        FormsModule
    ],
    providers: [...CheckboxComponent.providers]
})
export class RadioComponent extends CheckboxComponent {

    public constructor(
        private readonly radioService: RadioService
    ) {
        super();
        this.classes.registerFixed('radio');
        this.canUncheck = false;
        this.radioService.checked.pipe(
            filter(event => !!event.group && event.group === this.name && event.value !== this),
            takeUntil(this.destroy)
        ).subscribe(() => this.checked = false);
        this.valueChange.pipe(filter(checked => !!checked)).subscribe(() => this.radioService.check(this.name, this));
    }
}

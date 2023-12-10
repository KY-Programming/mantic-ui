import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { RadioService } from '../../services/radio.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
    selector: 'm-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    standalone: true,
    imports: [
        FormsModule
    ],
    providers: [...CheckboxComponent.providers]
})
export class ToggleComponent extends CheckboxComponent {
    public constructor(
        private readonly radioService: RadioService
    ) {
        super();
        this.classes.registerFixed('toggle');
        this.radioService.checked.pipe(
            filter(event => !!event.group && event.group === this.name && event.value !== this),
            takeUntil(this.destroy)
        ).subscribe(() => this.checked = false);
        this.valueChange.pipe(filter(checked => !!checked)).subscribe(() => this.radioService.check(this.name, this));
    }
}

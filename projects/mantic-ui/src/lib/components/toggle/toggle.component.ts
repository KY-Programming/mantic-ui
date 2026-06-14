import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { RadioService } from '../../services/radio.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
    selector: 'm-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    imports: [FormsModule],
    providers: [...CheckboxComponent.providers]
})
export class ToggleComponent extends CheckboxComponent {
    private readonly radioService = inject(RadioService);

    public constructor() {
        super();
        this.classes.registerFixed('toggle');
        this.radioService.checked.pipe(
            filter(event => !!event.group && event.group === (this.name() ?? '') && event.value !== this),
            takeUntil(this.destroy)
        ).subscribe(() => this.checkedState.set(false));
        this.valueChange.subscribe(value => {
            if (value) {
                this.radioService.check(this.name() ?? '', this);
            }
        });
    }
}

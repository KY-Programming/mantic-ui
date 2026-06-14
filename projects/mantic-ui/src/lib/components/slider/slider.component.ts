import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { RadioService } from '../../services/radio.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
    selector: 'm-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    imports: [FormsModule],
    providers: [...CheckboxComponent.providers]
})
export class SliderComponent extends CheckboxComponent {
    private readonly radioService = inject(RadioService);

    public constructor() {
        super();
        this.classes.registerFixed('slider');
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

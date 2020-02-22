import { Component, ElementRef } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioService } from '../services/radio.service';

@Component({
  selector: 'm-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent extends CheckboxComponent {

  constructor(
    elementRef: ElementRef<HTMLElement>,
    private readonly radioService: RadioService
  ) {
    super(elementRef);
    this.classList.registerFixed('slider');
    this.radioService.checked.pipe(
      filter(event => event.group && event.group === this.name && event.value !== this),
      takeUntil(this.destroy)
    ).subscribe(() => this.checked = false);
    this.valueChange.pipe(filter(checked => checked)).subscribe(() => this.radioService.check(this.name, this));
  }
}

import { Directive, Optional } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Directive({
  selector: '[mFluid]'
})
export class FluidDirective {
  constructor(
    @Optional() dropDown: DropdownComponent
  ) {
    if (dropDown) {
      dropDown.isFluid = true;
    }
  }
}

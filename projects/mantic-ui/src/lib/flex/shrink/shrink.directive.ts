import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[m-shrink]'
})
export class ShrinkDirective {

  @HostBinding('style.flex')
  public readonly flex = '0 1 auto';

}

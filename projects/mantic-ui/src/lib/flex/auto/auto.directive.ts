import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[m-auto]'
})
export class AutoDirective {

  @HostBinding('style.flex')
  public readonly flex = '0 0 auto';

}

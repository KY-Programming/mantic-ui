import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'm-or',
  templateUrl: './or.component.html'
})
export class OrComponent {
  @HostBinding('class.or')
  public readonly ui = true;
}

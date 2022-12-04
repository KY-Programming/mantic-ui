import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'm-or',
    templateUrl: './or.component.html',
    standalone: true
})
export class OrComponent {
    @HostBinding('class.or')
    public readonly ui = true;
}

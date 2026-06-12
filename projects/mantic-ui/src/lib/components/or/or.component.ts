import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'm-or',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './or.component.html',
    })
export class OrComponent {
    @HostBinding('class.or')
    public readonly ui = true;
}

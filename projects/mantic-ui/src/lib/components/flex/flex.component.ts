import { Component } from '@angular/core';
import { FlexDirective } from './flex.directive';

@Component({
    selector: 'm-flex',
    template: '<ng-content/>',
    standalone: true,
    hostDirectives: [FlexDirective.default]
})
export class FlexComponent {
}

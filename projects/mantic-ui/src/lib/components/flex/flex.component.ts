import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FlexDirective } from './flex.directive';

@Component({
    selector: 'm-flex',
    template: '<ng-content/>',
    changeDetection: ChangeDetectionStrategy.Eager,
    hostDirectives: [FlexDirective.default]
})
export class FlexComponent {
}

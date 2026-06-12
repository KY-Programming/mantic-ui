import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'm-modal-header',
    changeDetection: ChangeDetectionStrategy.Eager,
    template: '<ng-content/>'
})
export class ModalHeaderComponent {

}

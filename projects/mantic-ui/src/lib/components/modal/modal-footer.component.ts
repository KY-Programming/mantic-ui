import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'm-modal-footer',
    changeDetection: ChangeDetectionStrategy.Eager,
    template: '<ng-content />'
})
export class ModalFooterComponent {
}

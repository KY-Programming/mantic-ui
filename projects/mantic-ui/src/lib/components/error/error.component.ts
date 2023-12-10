import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { IgnoredDirective } from '../../directives/ignored.directive';

@Component({
    selector: 'm-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    standalone: true,
    hostDirectives: [IgnoredDirective.default],
    providers: [...BaseComponent.providers]
})
export class ErrorComponent extends BaseComponent {
    public constructor() {
        super();
        this.classes.registerFixed('visible', 'error', 'message');
    }
}

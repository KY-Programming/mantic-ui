import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { IgnoredDirective } from '../../directives/ignored.directive';

@Component({
    selector: 'm-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives, IgnoredDirective.default],
    providers: [...BaseComponent.providers]
})
export class InfoComponent extends BaseComponent {
    public constructor() {
        super();
        this.classes.registerFixed('visible', 'info', 'message');
    }
}

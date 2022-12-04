import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FluidDirective } from '../../directives/fluid.directive';

@Component({
    selector: 'm-text-container',
    templateUrl: './text-container.component.html',
    styleUrls: ['./text-container.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives, FluidDirective.default],
    providers: [...BaseComponent.providers]
})
export class TextContainerComponent extends BaseComponent {
    public constructor() {
        super();
        this.classes.registerFixed('text', 'container');
    }
}

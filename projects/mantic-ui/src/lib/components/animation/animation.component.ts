import { Component, HostBinding, Input } from '@angular/core';
import { AnimationDirection } from './animation-direction';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'm-animation',
    templateUrl: './animation.component.html',
    styleUrls: ['./animation.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class AnimationComponent extends BaseComponent {

    @Input()
    @HostBinding('class.hidden')
    public hidden = true;

    @Input()
    public direction: AnimationDirection;

    public constructor() {
        super(false);
        this.classes.registerFixed('content');
        this.classes.register('hidden', 'direction');
    }
}

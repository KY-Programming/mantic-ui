import { Component, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { AnimationDirection } from './models/animation-direction';

@Component({
    selector: 'm-animation',
    templateUrl: './animation.component.html',
    styleUrls: ['./animation.component.scss'],
    host: { '[class.hidden]': 'hidden()' },
    providers: [...BaseComponent.providers]
})
export class AnimationComponent extends BaseComponent {
    public readonly hidden = input(true);
    public readonly direction = input<AnimationDirection>();

    public constructor() {
        super(false);
        this.classes.registerFixed('content');
        this.classes.register('hidden', 'direction');
    }
}

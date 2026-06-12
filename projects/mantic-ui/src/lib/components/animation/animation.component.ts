import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { AnimationDirection } from './animation-direction';

@Component({
    selector: 'm-animation',
    templateUrl: './animation.component.html',
    styleUrls: ['./animation.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...BaseComponent.providers]
})
export class AnimationComponent extends BaseComponent {

    @HostBinding('class.hidden')
    public readonly hidden = input(true);

    public readonly direction = input<AnimationDirection>();

    public constructor() {
        super(false);
        this.classes.registerFixed('content');
        this.classes.register('hidden', 'direction');
    }
}

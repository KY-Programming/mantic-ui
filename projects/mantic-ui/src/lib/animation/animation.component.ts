import { Component, HostBinding, Input } from '@angular/core';
import { AnimationDirection } from './animation-direction';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-animation',
    templateUrl: './animation.component.html',
    styleUrls: ['./animation.component.scss']
})
export class AnimationComponent extends BaseComponent {

    @Input()
    @HostBinding('class.hidden')
    public hidden = true;

    @Input()
    public direction: AnimationDirection;

    @HostBinding('class.content')
    public readonly content = true;

    public constructor() {
        super(false);
        this.classList.register('hidden');
    }
}

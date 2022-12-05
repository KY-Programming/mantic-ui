import { Component, HostBinding, Input } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'm-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent
    ],
    hostDirectives: [...ButtonBaseComponent.directives],
    providers: [...ButtonBaseComponent.providers]
})
export class IconButtonComponent extends ButtonBaseComponent {

    @Input()
    public icon: IconType;

    @Input()
    public iconSize: IconSize;

    @Input()
    @HostBinding('class.social')
    public social: string;

    public constructor() {
        super();
        this.classes.register('iconSize', 'social')
            .registerFixed('icon');
    }
}

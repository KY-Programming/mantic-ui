import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
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
    providers: [...ButtonBaseComponent.providers]
})
export class IconButtonComponent extends ButtonBaseComponent {

    @Input()
    public icon: IconType | undefined;

    @Input()
    public iconSize: IconSize;

    @Input()
    @HostBinding('class.social')
    public social: string | undefined;

    public constructor() {
        super();
        this.classes.register('iconSize', 'social', 'title')
            .registerFixed('icon');
    }
}

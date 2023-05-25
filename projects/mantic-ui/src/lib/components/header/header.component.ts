import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export declare type HeaderSize = 'huge' | 'large' | 'medium' | 'small' | 'tiny';

@Component({
    selector: 'm-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent
    ],
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class HeaderComponent extends BaseComponent {
    private sizeValue: HeaderSize | undefined;

    @Input()
    public icon: IconType | undefined;

    @Input()
    public iconSize: IconSize;

    @Input()
    public get size(): HeaderSize | undefined {
        return this.sizeValue;
    }

    public set size(value: HeaderSize | undefined) {
        this.sizeValue = value;
        this.classes.set('size', value);
    }

    public constructor() {
        super();
        this.classes.register('size', 'iconSize')
            .registerFixed('header');
    }
}

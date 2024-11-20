import { Component, Input } from '@angular/core';
import { IconType } from './icon-type';
import { IconSize } from './icon-size';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'm-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    imports: [
        CommonModule,
        FontAwesomeModule
    ]
})
export class IconComponent {
    protected mIcon?: string;
    protected mSize?: IconSize;
    protected faIcon?: IconProp;
    protected faSize?: SizeProp;

    @Input()
    public get icon(): IconType | undefined {
        return this.mIcon ?? this.faIcon;
    }

    public set icon(value: IconType | undefined) {
        if (typeof value === 'string') {
            this.mIcon = value;
        } else {
            this.faIcon = value;
        }
    }

    @Input()
    public get size(): IconSize {
        return this.mSize ?? this.faSize;
    }

    public set size(value: IconSize) {
        switch (value) {
            case 'mini':
            case 'tiny':
            case 'small':
                this.mSize = value;
                this.faSize = 'xs';
                break;
            case 'large':
            case 'lg':
                this.mSize = 'large';
                this.faSize = 'lg';
                break;
            case 'big':
            case '2x':
                this.mSize = 'big';
                this.faSize = '2x';
                break;
            case 'huge':
            case '4x':
                this.mSize = 'huge';
                this.faSize = '4x';
                break;
            case 'massive':
            case '8x':
                this.mSize = 'massive';
                this.faSize = '8x';
                break;
            case 'xs':
            case 'sm':
            case '1x':
                this.mSize = 'small';
                this.faSize = value;
                break;
            case '3x':
                this.mSize = 'big';
                this.faSize = value;
                break;
            case '5x':
            case '6x':
                this.mSize = 'huge';
                this.faSize = value;
                break;
            case '7x':
            case '9x':
            case '10x':
                this.mSize = 'massive';
                this.faSize = value;
                break;
        }
    }

    @Input()
    public iconClass?: string = 'icon';
}

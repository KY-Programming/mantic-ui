import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconSize, ManticIconSize } from './models/icon-size';
import { IconType } from './models/icon-type';

@Component({
    selector: 'm-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    imports: [FontAwesomeModule, NgClass]
})
export class IconComponent {
    public readonly icon = input<IconType>();
    public readonly size = input<IconSize>();
    public readonly iconClass = input<string | undefined>('icon');
    protected readonly mIcon = computed(() => {
        const icon = this.icon();
        return typeof icon === 'string' ? icon : undefined;
    });
    protected readonly faIcon = computed(() => {
        const icon = this.icon();
        return typeof icon === 'string' ? undefined : icon;
    });
    private readonly mappedSize = computed(() => IconComponent.mapSize(this.size()));
    protected readonly mSize = computed(() => this.mappedSize().mSize);
    protected readonly faSize = computed(() => this.mappedSize().faSize);

    private static mapSize(value: IconSize): { mSize: ManticIconSize; faSize: SizeProp | undefined } {
        switch (value) {
            case 'mini':
            case 'tiny':
            case 'small':
                return { mSize: value, faSize: 'xs' };
            case 'large':
            case 'lg':
                return { mSize: 'large', faSize: 'lg' };
            case 'big':
            case '2x':
                return { mSize: 'big', faSize: '2x' };
            case 'huge':
            case '4x':
                return { mSize: 'huge', faSize: '4x' };
            case 'massive':
            case '8x':
                return { mSize: 'massive', faSize: '8x' };
            case 'xs':
            case 'sm':
            case '1x':
                return { mSize: 'small', faSize: value };
            case '3x':
                return { mSize: 'big', faSize: value };
            case '5x':
            case '6x':
                return { mSize: 'huge', faSize: value };
            case '7x':
            case '9x':
            case '10x':
                return { mSize: 'massive', faSize: value };
            default:
                return { mSize: undefined, faSize: undefined };
        }
    }
}

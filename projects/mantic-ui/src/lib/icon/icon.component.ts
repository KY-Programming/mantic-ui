import { Component, Input } from '@angular/core';

export declare type IconSize =
    'mini'
    | 'tiny'
    | 'small'
    | 'large'
    | 'big'
    | 'huge'
    | 'massive'
    | undefined;

@Component({
    selector: 'm-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent {
    @Input()
    public icon: string;

    @Input()
    public size: IconSize;
}

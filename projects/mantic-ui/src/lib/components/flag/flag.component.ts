import { Component, Input } from '@angular/core';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-flag',
    templateUrl: './flag.component.html',
    styleUrls: ['./flag.component.scss'],
    })
export class FlagComponent {
    @Input()
    public flag: string | undefined;

    @Input()
    public size: IconSize;
}

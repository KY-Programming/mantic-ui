import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-flag',
    templateUrl: './flag.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./flag.component.scss'],
    })
export class FlagComponent {
    @Input()
    public flag: string | undefined;

    @Input()
    public size: IconSize;
}

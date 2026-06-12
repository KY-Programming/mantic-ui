import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-flag',
    templateUrl: './flag.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./flag.component.scss'],
    })
export class FlagComponent {
    public readonly flag = input<string>();

    public readonly size = input<IconSize>();
}

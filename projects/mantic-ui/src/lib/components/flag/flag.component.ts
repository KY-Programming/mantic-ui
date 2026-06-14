import { Component, input } from '@angular/core';
import { IconSize } from '../icon/models/icon-size';

@Component({
    selector: 'm-flag',
    templateUrl: './flag.component.html',
    styleUrls: ['./flag.component.scss']
})
export class FlagComponent {
    public readonly flag = input<string>();
    public readonly size = input<IconSize>();
}

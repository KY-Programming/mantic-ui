import { Component, Input, OnInit } from '@angular/core';
import { IconSize } from '../icon/icon.component';

@Component({
  selector: 'm-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent {
    @Input()
    public flag: string;

    @Input()
    public size: IconSize;
}

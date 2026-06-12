import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'm-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: []
})
export class CardComponent {

    @HostBinding('class.ui')
    @HostBinding('class.card')
    protected readonly host = true;
}

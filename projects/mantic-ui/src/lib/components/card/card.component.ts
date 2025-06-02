import { Component, HostBinding } from '@angular/core';


@Component({
    selector: 'm-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: []
})
export class CardComponent {

    @HostBinding('class.ui')
    @HostBinding('class.card')
    protected readonly host = true;
}

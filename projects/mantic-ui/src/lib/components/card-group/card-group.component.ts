import { Component, HostBinding } from '@angular/core';


@Component({
    selector: 'm-card-group',
    imports: [],
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent {
    @HostBinding('class.ui')
    @HostBinding('class.cards')
    protected readonly host = true;
}

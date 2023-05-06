import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-card-group',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent {
    @HostBinding('class.ui')
    @HostBinding('class.cards')
    protected readonly host = true;
}

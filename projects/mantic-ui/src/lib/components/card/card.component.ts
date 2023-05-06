import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class CardComponent {

    @HostBinding('class.ui')
    @HostBinding('class.card')
    protected readonly host = true;
}

import { Component } from '@angular/core';

@Component({
    selector: 'm-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    host: {
        'class': 'ui card'
    }
})
export class CardComponent {
}

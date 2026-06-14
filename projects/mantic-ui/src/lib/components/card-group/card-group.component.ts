import { Component } from '@angular/core';

@Component({
    selector: 'm-card-group',
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss'],
    host: {
        'class': 'ui cards'
    }
})
export class CardGroupComponent {
}

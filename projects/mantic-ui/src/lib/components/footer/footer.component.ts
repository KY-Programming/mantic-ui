import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'm-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    providers: [...BaseComponent.providers]
})
export class FooterComponent extends BaseComponent {

    public constructor() {
        super();
        this.classes.registerFixed('footer ui segment vertical');
    }

}

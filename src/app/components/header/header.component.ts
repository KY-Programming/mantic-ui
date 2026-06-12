import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { HeaderDirective } from '@mantic-ui/angular';

@Component({
    selector: 'app-header',
    imports: [HeaderDirective],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Input()
    public header?: string;

    @Input()
    public subHeader?: string;

    @Input()
    public showPlaceholder?: boolean;

}

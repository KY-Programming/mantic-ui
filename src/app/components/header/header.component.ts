import { Component, ChangeDetectionStrategy, input } from '@angular/core';

import { HeaderDirective } from '@mantic-ui/angular';

@Component({
    selector: 'app-header',
    imports: [HeaderDirective],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public readonly header = input<string>();

    public readonly subHeader = input<string>();

    public readonly showPlaceholder = input<boolean>();

}

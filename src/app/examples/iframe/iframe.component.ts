import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-iframe',
    imports: [RouterOutlet],
    templateUrl: './iframe.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./iframe.component.scss']
})
export class SemanticIframeComponent {

}

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { SafePipe } from '@mantic-ui/angular';

@Component({
    selector: 'm-example-frame',
    templateUrl: './example-frame.component.html',
    styleUrls: ['./example-frame.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        SafePipe
    ]
})
export class ExampleFrameComponent {

    public readonly src = input.required<string>();

}

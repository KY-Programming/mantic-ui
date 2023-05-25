import { Component, Input } from '@angular/core';
import { SafePipe } from '@mantic-ui/angular';

@Component({
    selector: 'm-example-frame',
    templateUrl: './example-frame.component.html',
    styleUrls: ['./example-frame.component.scss'],
    standalone: true,
    imports: [
        SafePipe
    ]
})
export class ExampleFrameComponent {

    @Input({ required: true })
    public src = '';

}

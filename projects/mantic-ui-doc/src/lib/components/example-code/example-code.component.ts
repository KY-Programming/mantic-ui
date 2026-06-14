import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { BooleanLike, ButtonComponent, SegmentComponent, toBoolean } from '@mantic-ui/angular';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
    selector: 'm-example-code',
    templateUrl: './example-code.component.html',
    styleUrls: ['./example-code.component.scss'],
    imports: [
        HighlightModule,
        ButtonComponent
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [...SegmentComponent.providers]
})
export class ExampleCodeComponent extends SegmentComponent {
    public readonly label = input<string>();
    public readonly code = input<string>();
    public readonly languages = input(['html']);
    public readonly live = input<boolean, BooleanLike>(false, { transform: toBoolean });

    @Output()
    public readonly liveClick = new EventEmitter<MouseEvent>();

    public constructor() {
        super();
        this.classes.register('label', 'code', 'languages');
    }
}

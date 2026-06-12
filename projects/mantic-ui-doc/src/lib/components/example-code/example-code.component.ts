
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, input } from '@angular/core';
import { BooleanLike, ButtonComponent, SegmentComponent } from '@mantic-ui/angular';
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
    private isLive = false;

    public readonly label = input<string>();

    public readonly code = input<string>();

    public readonly languages = input(['html']);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get live(): boolean {
        return this.isLive;
    }

    public set live(value: BooleanLike) {
        this.isLive = this.toBoolean(value);
    }

    @Output()
    public readonly liveClick = new EventEmitter<MouseEvent>();

    public constructor() {
        super();
        this.classes.register('label', 'code', 'languages');
    }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanLike, ButtonComponent, SegmentComponent } from '@mantic-ui/angular';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
    selector: 'm-example-code',
    templateUrl: './example-code.component.html',
    styleUrls: ['./example-code.component.scss'],
    imports: [
        CommonModule,
        HighlightModule,
        ButtonComponent
    ],
    providers: [...SegmentComponent.providers]
})
export class ExampleCodeComponent extends SegmentComponent {
    private isLive = false;

    @Input()
    public label: string | undefined;

    @Input()
    public code: string | undefined;

    @Input()
    public languages = ['html'];

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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanLike, SegmentComponent } from '@mantic-ui/angular';

@Component({
    selector: 'm-example-code',
    templateUrl: './example-code.component.html',
    styleUrls: ['./example-code.component.scss']
})
export class ExampleCodeComponent extends SegmentComponent {
    private isLive = false;

    @Input()
    public label: string;

    @Input()
    public code: string;

    @Input()
    public languages: string[] = ['html'];

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
        this.classList.register('label', 'code', 'languages');
    }
}

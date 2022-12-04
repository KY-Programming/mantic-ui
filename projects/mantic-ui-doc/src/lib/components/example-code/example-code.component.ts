import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanLike, ButtonComponent, SegmentComponent } from '@mantic-ui/angular';
import { CommonModule } from '@angular/common';
import { HighlightModule } from 'ngx-highlightjs';
import { highlightJsProviders } from '../../highlightjs.providers';

@Component({
    selector: 'm-example-code',
    templateUrl: './example-code.component.html',
    styleUrls: ['./example-code.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        HighlightModule,
        ButtonComponent
    ],
    hostDirectives: [...SegmentComponent.directives],
    providers: [...SegmentComponent.providers, ...highlightJsProviders]
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
        this.classes.register('label', 'code', 'languages');
    }
}


import { Component, HostBinding, Input, ChangeDetectionStrategy, input } from '@angular/core';
import { HeaderDirective } from '@mantic-ui/angular';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
    selector: 'm-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    HighlightModule,
    HeaderDirective
]
})
export class ExampleComponent {
    private headerField: string | undefined;

    public get header(): string | undefined {
        return this.headerField;
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public set header(value: string | undefined) {
        this.headerField = value;
        this.refreshId();
    }

    public readonly description = input<string>();

    public readonly code = input<string>();

    public readonly showCode = input(false);

    public readonly languages = input(['html']);

    @HostBinding('id')
    public id: string | undefined;

    public readonly hint = input<string>();

    public readonly hintClass = input('black');

    public readonly hintLink = input<string>();

    public readonly hintTarget = input('_blank');

    public toggleCode(): void {
        this.showCode = !this.showCode();
    }

    private refreshId(): void {
        this.id = this.header ? this.header.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase() : undefined;
    }
}

import { ChangeDetectionStrategy, Component, Input, input, model } from '@angular/core';
import { HeaderDirective } from '@mantic-ui/angular';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
    selector: 'm-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    host: {
        '[id]': 'id'
    },
    imports: [HighlightModule, HeaderDirective]
})
export class ExampleComponent {
    private headerField: string | undefined;

    public get header(): string | undefined {
        return this.headerField;
    }

    @Input()
    public set header(value: string | undefined) {
        this.headerField = value;
        this.refreshId();
    }

    public readonly description = input<string>();
    public readonly code = input<string>();
    public readonly showCode = model(false);
    public readonly languages = input(['html']);
    public id: string | undefined;
    public readonly hint = input<string>();
    public readonly hintClass = input('black');
    public readonly hintLink = input<string>();
    public readonly hintTarget = input('_blank');

    public toggleCode(): void {
        this.showCode.set(!this.showCode());
    }

    private refreshId(): void {
        this.id = this.header ? this.header.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase() : undefined;
    }
}

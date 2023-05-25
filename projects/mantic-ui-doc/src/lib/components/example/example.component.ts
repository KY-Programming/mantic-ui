import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule } from 'ngx-highlightjs';
import { highlightJsProviders } from '../../highlightjs.providers';
import { HeaderDirective } from '@mantic-ui/angular';

@Component({
    selector: 'm-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        HighlightModule,
        HeaderDirective
    ],
    providers: [...highlightJsProviders]
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

    @Input()
    public description: string | undefined;

    @Input()
    public code: string | undefined;

    @Input()
    public showCode = false;

    @Input()
    public languages: string[] = ['html'];

    @HostBinding('id')
    public id: string | undefined;

    @Input()
    public hint: string | undefined;

    @Input()
    public hintClass = 'black';

    @Input()
    public hintLink: string | undefined;

    @Input()
    public hintTarget = '_blank';

    public toggleCode(): void {
        this.showCode = !this.showCode;
    }

    private refreshId(): void {
        this.id = this.header ? this.header.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase() : undefined;
    }
}

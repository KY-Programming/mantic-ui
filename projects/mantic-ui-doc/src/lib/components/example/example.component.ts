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
    private headerField: string;

    public get header(): string {
        return this.headerField;
    }

    @Input()
    public set header(value: string) {
        this.headerField = value;
        this.refreshId();
    }

    @Input()
    public description: string;

    @Input()
    public code: string;

    @Input()
    public showCode: boolean;

    @Input()
    public languages: string[] = ['html'];

    @HostBinding('id')
    public id: string;

    @Input()
    public hint: string;

    @Input()
    public hintClass = 'black';

    @Input()
    public hintLink: string;

    @Input()
    public hintTarget = '_blank';

    public toggleCode(): void {
        this.showCode = !this.showCode;
    }

    private refreshId(): void {
        this.id = this.header ? this.header.replace(/[^\a-zA-Z0-9]/g, '').toLocaleLowerCase() : undefined;
    }
}

import { Component, DoCheck, ElementRef, Input, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * @deprecated Use Route.title instead
 */
@Component({
    selector: 'm-document-title',
    templateUrl: './document-title.component.html',
    styleUrls: ['./document-title.component.scss'],
    standalone: true
})
export class DocumentTitleComponent implements DoCheck, OnDestroy {
    private previousTitle: string;
    private value: string;
    private title: string;

    public static globalPostfix = '';
    public static globalPrefix = '';

    @Input()
    public get postfix(): string {
        return DocumentTitleComponent.globalPostfix;
    }

    public set postfix(value: string) {
        DocumentTitleComponent.globalPostfix = value;
    }

    @Input()
    public get prefix(): string {
        return DocumentTitleComponent.globalPrefix;
    }

    public set prefix(value: string) {
        DocumentTitleComponent.globalPrefix = value;
    }

    public constructor(
        private readonly element: ElementRef<HTMLElement>,
        private readonly titleService: Title
    ) {
    }

    public ngDoCheck(): void {
        const newValue = this.prefix + this.element.nativeElement.innerText + this.postfix;
        if (newValue !== this.value) {
            this.value = newValue;
            if (this.previousTitle === undefined) {
                this.previousTitle = this.titleService.getTitle();
            }
            this.title = this.value;
            this.titleService.setTitle(this.title);
        }
    }

    public ngOnDestroy(): void {
        if (this.titleService.getTitle() === this.title) {
            this.titleService.setTitle(this.previousTitle);
        }
    }
}

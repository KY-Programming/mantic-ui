import { Component, DoCheck, ElementRef, Input, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * @deprecated Use Route.title instead
 */
@Component({
    selector: 'm-document-title',
    templateUrl: './document-title.component.html',
    styleUrls: ['./document-title.component.scss']
})
export class DocumentTitleComponent implements DoCheck, OnDestroy {
    public static globalPostfix = '';
    public static globalPrefix = '';
    private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly titleService = inject(Title);
    private previousTitle: string | undefined;
    private value: string | undefined;
    private title: string | undefined;

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

    public ngDoCheck(): void {
        const newValue = this.prefix + this.element.nativeElement.innerText + this.postfix;
        if (newValue === this.value) {
            return;
        }
        this.value = newValue;
        if (this.previousTitle === undefined) {
            this.previousTitle = this.titleService.getTitle();
        }
        this.title = this.value;
        this.titleService.setTitle(this.title);
    }

    public ngOnDestroy(): void {
        if (this.titleService.getTitle() === this.title) {
            this.titleService.setTitle(this.previousTitle ?? '');
        }
    }
}

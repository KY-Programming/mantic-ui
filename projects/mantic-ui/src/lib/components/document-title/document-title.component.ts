import { Component, ElementRef, Input, OnDestroy, afterNextRender, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * @deprecated Use Route.title instead
 */
@Component({
    selector: 'm-document-title',
    templateUrl: './document-title.component.html',
    styleUrls: ['./document-title.component.scss']
})
export class DocumentTitleComponent implements OnDestroy {
    public static globalPostfix = '';
    public static globalPrefix = '';
    private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly titleService = inject(Title);
    private observer: MutationObserver | undefined;
    private previousTitle: string | undefined;
    private title: string | undefined;

    @Input()
    public get postfix(): string {
        return DocumentTitleComponent.globalPostfix;
    }

    public set postfix(value: string) {
        DocumentTitleComponent.globalPostfix = value;
        this.refresh();
    }

    @Input()
    public get prefix(): string {
        return DocumentTitleComponent.globalPrefix;
    }

    public set prefix(value: string) {
        DocumentTitleComponent.globalPrefix = value;
        this.refresh();
    }

    public constructor() {
        // The title is read from the rendered content, not in a lifecycle hook: the projected text
        // (e.g. `{{ item()?.name }}`) is written after this component's hooks ran, and without zone.js
        // no further change detection follows, so a hook would keep the previous text.
        afterNextRender(() => {
            this.observer = new MutationObserver(() => this.refresh());
            this.observer.observe(this.element.nativeElement, { characterData: true, childList: true, subtree: true });
            this.refresh();
        });
    }

    public ngOnDestroy(): void {
        this.observer?.disconnect();
        this.observer = undefined;
        if (this.titleService.getTitle() === this.title) {
            this.titleService.setTitle(this.previousTitle ?? '');
        }
    }

    private refresh(): void {
        // Not rendered yet (an input set before the first render) or already destroyed
        if (!this.observer) {
            return;
        }
        const title = this.prefix + this.element.nativeElement.textContent.trim() + this.postfix;
        if (title === this.title) {
            return;
        }
        if (this.previousTitle === undefined) {
            this.previousTitle = this.titleService.getTitle();
        }
        this.title = title;
        this.titleService.setTitle(title);
    }
}

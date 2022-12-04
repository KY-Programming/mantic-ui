import { AfterViewInit, Directive, EmbeddedViewRef, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[m-to-body]',
    standalone: true
})
export class ToBodyDirective implements AfterViewInit, OnDestroy {
    private embeddedViewRef: EmbeddedViewRef<unknown>;

    public constructor(
        private readonly template: TemplateRef<unknown>,
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    public ngAfterViewInit(): void {
        this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.template);
        this.embeddedViewRef.detectChanges();
        for (const node of this.embeddedViewRef.rootNodes) {
            document.body.appendChild(node);
        }
    }

    public ngOnDestroy(): void {
        for (const node of this.embeddedViewRef.rootNodes) {
            if (document.body.contains(node)) {
                document.body.removeChild(node);
            }
        }
        this.embeddedViewRef.destroy();
        this.embeddedViewRef = undefined;
    }
}

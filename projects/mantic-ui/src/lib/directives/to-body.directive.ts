import { AfterViewInit, Directive, EmbeddedViewRef, OnDestroy, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
    selector: '[m-to-body]',
    })
export class ToBodyDirective implements AfterViewInit, OnDestroy {
    private readonly template = inject<TemplateRef<unknown>>(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);

    private embeddedViewRef: EmbeddedViewRef<unknown> | undefined;

    public ngAfterViewInit(): void {
        this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.template);
        this.embeddedViewRef.detectChanges();
        for (const node of this.rootNodes()) {
            document.body.append(node);
        }
    }

    public ngOnDestroy(): void {
        for (const node of this.rootNodes()) {
            if (document.body.contains(node)) {
                node.remove();
            }
        }
        this.embeddedViewRef?.destroy();
        this.embeddedViewRef = undefined;
    }

    /** The template's top-level nodes; EmbeddedViewRef types them as any[]. */
    private rootNodes(): ChildNode[] {
        return (this.embeddedViewRef?.rootNodes ?? []) as ChildNode[];
    }
}

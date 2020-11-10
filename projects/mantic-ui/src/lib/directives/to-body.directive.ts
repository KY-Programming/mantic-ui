import { AfterViewInit, Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[m-to-body]'
})
export class ToBodyDirective implements AfterViewInit {

    constructor(
        private readonly template: TemplateRef<unknown>,
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    public ngAfterViewInit(): void {
        const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.template);
        embeddedViewRef.detectChanges();
        for (const node of embeddedViewRef.rootNodes) {
            document.body.appendChild(node);
        }
    }
}

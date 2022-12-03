import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[m-fallback-for]',
    standalone: true
})
export class FallbackForDirective {

    @Input('m-fallback-for')
    public set fallback(selector: string) {
        const foundElement = this.elementRef.nativeElement.parentElement?.querySelector(selector);
        if (foundElement) {
            this.viewContainer.clear();
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }

    public constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly templateRef: TemplateRef<unknown>,
        private readonly viewContainer: ViewContainerRef
    ) { }

}

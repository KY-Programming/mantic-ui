import { Directive, effect, ElementRef, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[m-fallback-for]'
})
export class FallbackForDirective {
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);
    public readonly fallback = input.required<string>({ alias: 'm-fallback-for' });

    public constructor() {
        effect(() => {
            const foundElement = this.elementRef.nativeElement.parentElement?.querySelector(this.fallback());
            if (foundElement) {
                this.viewContainerRef.clear();
            }
            else {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
    }
}

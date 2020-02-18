import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[m-fallback-for]'
})
export class FallbackForDirective {

  @Input()
  public set 'm-fallback-for'(selector: string) {
    const foundElement = this.elemntRef.nativeElement.parentElement.querySelector(selector);
    if (foundElement) {
      this.viewContainer.clear();
    }
    else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private readonly elemntRef: ElementRef<HTMLElement>,
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef
  ) { }

}

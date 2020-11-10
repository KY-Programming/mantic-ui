import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
    selector: '[m-position-absolute]'
})
export class PositionAbsoluteDirective implements AfterViewInit, OnDestroy {
    private readonly observer = new MutationObserver(() => this.refresh());
    private parent: HTMLElement;

    @Input('m-position-absolute')
    public position: 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
    }

    public ngAfterViewInit(): void {
        this.parent = this.elementRef.nativeElement.parentElement;
        this.observer.observe(this.parent, { attributes: true });
        setTimeout(() => this.refresh());
    }

    public ngOnDestroy(): void {
        this.observer.disconnect();
    }

    private refresh(): void {
        if (!this.elementRef.nativeElement.style.position) {
            this.elementRef.nativeElement.style.position = 'absolute';
        }

        const rect = this.parent.getBoundingClientRect();
        switch (this.position) {
            case 'top-left':
            case 'top-center':
            case 'top-right':
                this.setTop(rect.top);
                break;
            case 'middle-left':
            case 'middle-center':
            case 'middle-right':
                this.setTop(rect.top + rect.height / 2);
                break;
            case 'bottom-left':
            case 'bottom-center':
            case 'bottom-right':
                this.setTop(rect.bottom);
                break;
        }
        switch (this.position) {
            case 'top-left':
            case 'middle-left':
            case 'bottom-left':
                this.setLeft(rect.left);
                break;
            case 'top-center':
            case 'middle-center':
            case 'bottom-center':
                this.setLeft(rect.left + rect.width / 2);
                break;
            case 'top-right':
            case 'middle-right':
            case 'bottom-right':
                this.setLeft(rect.right);
                break;
        }
    }

    private setTop(top: number): void {
        this.elementRef.nativeElement.style.top = top === undefined ? undefined : top + 'px';
    }

    private setLeft(left: number): void {
        this.elementRef.nativeElement.style.left = left === undefined ? undefined : left + 'px';
    }
}

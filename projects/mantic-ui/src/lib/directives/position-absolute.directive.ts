import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
    selector: '[m-position-absolute]',
    })
export class PositionAbsoluteDirective implements AfterViewInit, OnDestroy {
    private readonly observer = new MutationObserver(() => this.refresh());
    private parent: HTMLElement | undefined;

    @Input('m-position-absolute')
    public position: 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | undefined;

    @Input()
    public attach: 'left' | 'middle' | 'right' = 'left';

    @Input()
    public parentWidth: 'none' | 'exact' | 'min' | 'max' = 'none';

    @Input()
    public minLeft: number | 'parent-left' | 'parent-center' | 'parent-right' | undefined;

    public constructor(
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
    }

    public ngAfterViewInit(): void {
        this.parent = this.elementRef.nativeElement.parentElement ?? undefined;
        if (this.parent) {
            this.observer.observe(this.parent, { attributes: true });
        }
        setTimeout(() => this.refresh());
    }

    public ngOnDestroy(): void {
        this.observer.disconnect();
    }

    private refresh(): void {
        if (!this.elementRef.nativeElement.style.position) {
            this.elementRef.nativeElement.style.position = 'fixed';//'absolute';
        }

        const rect = this.parent?.getBoundingClientRect();
        switch (this.parentWidth) {
            case 'min':
                this.setMinWidth(rect?.width ?? 0);
                break;
            case 'max':
                this.setMaxWidth(rect?.width ?? 0);
                break;
            case 'exact':
                this.setWidth(rect?.width ?? 0);
                break;
        }
        switch (this.position) {
            case 'top-left':
            case 'top-center':
            case 'top-right':
                this.setTop(rect?.top ?? 0);
                break;
            case 'middle-left':
            case 'middle-center':
            case 'middle-right':
                this.setTop(rect ? rect.top + rect.height / 2 : undefined);
                break;
            case 'bottom-left':
            case 'bottom-center':
            case 'bottom-right':
                this.setTop(rect?.bottom);
                break;
        }
        switch (this.position) {
            case 'top-left':
            case 'middle-left':
            case 'bottom-left':
                this.setLeft(rect?.left);
                break;
            case 'top-center':
            case 'middle-center':
            case 'bottom-center':
                this.setLeft(rect ? rect.left + rect.width / 2 : undefined);
                break;
            case 'top-right':
            case 'middle-right':
            case 'bottom-right':
                this.setLeft(rect?.right);
                break;
        }
    }

    private setTop(top: number | undefined): void {
        const style = this.elementRef.nativeElement.style;
        style.top = top === undefined ? '' : top + 'px';
        style.maxHeight = `calc(100vh - ${top}px)`;
    }

    private setLeft(left: number | undefined): void {
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        const parentRect = this.parent?.getBoundingClientRect();
        const style = this.elementRef.nativeElement.style;
        style.right = '';
        style.right = '';
        if (left !== undefined && parentRect !== undefined) {
            if (this.attach === 'middle') {
                left -= rect.width / 2;
            }
            if (this.attach === 'right') {
                left -= rect.width;
            }
            left = Math.max(0, left);
            if (this.minLeft === 'parent-left') {
                left = Math.max(left, parentRect.left);
            } else if (this.minLeft === 'parent-center') {
                left = Math.max(left, parentRect.left + parentRect.width / 2);
            } else if (this.minLeft === 'parent-right') {
                left = Math.max(left, parentRect.right);
            } else if (typeof this.minLeft === 'number') {
                left = Math.max(left, this.minLeft);
            }
        }
        if (left && rect.width > 0 && left + rect.width > window.innerWidth) {
            style.right = '0px';
            style.left = '';
        } else {
            style.left = left === undefined ? '' : left + 'px';
        }
    }

    private setWidth(width: number): void {
        const style = this.elementRef.nativeElement.style;
        style.width = width === undefined ? '' : width + 'px';
    }

    private setMinWidth(width: number): void {
        const style = this.elementRef.nativeElement.style;
        style.minWidth = width === undefined ? '' : width + 'px';
    }

    private setMaxWidth(width: number): void {
        const style = this.elementRef.nativeElement.style;
        style.maxWidth = width === undefined ? '' : width + 'px';
    }
}

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FaviconService {
    private canvasElement: HTMLCanvasElement | undefined;
    private faviconElement: HTMLLinkElement | undefined;

    public getContext(): CanvasRenderingContext2D | undefined {
        return this.getCanvas().getContext('2d') ?? undefined;
    }

    private getCanvas(): HTMLCanvasElement {
        if (!this.canvasElement) {
            this.canvasElement = document.createElement('canvas');
            this.canvasElement.style.display = 'none';
            this.canvasElement.width = 16;
            this.canvasElement.height = 16;
            document.body.appendChild(this.canvasElement);
        }
        return this.canvasElement;
    }

    public update(): void {
        this.faviconElement ??= this.getFaviconElement();
        if (this.faviconElement) {
            this.faviconElement.href = this.canvasElement?.toDataURL('image/png') ?? '';
        }
    }

    private getFaviconElement(): HTMLLinkElement | undefined {
        const foundElement = document.querySelector('link[rel*="icon"][sizes="16x16"][type="image/png"]')
            ?? document.querySelector('link[rel*="icon"][type="image/png"]')
            ?? document.querySelector('link[rel*="icon"]');
        return foundElement instanceof HTMLLinkElement ? foundElement : undefined;
    }
}

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FaviconService {
    private canvasElement: HTMLCanvasElement;
    private faviconElement: HTMLLinkElement;

    public getContext(): CanvasRenderingContext2D {
        return this.getCanvas().getContext('2d');
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
        if (!this.faviconElement) {
            this.faviconElement = document.querySelector('link[rel*="icon"][sizes="16x16"][type="image/png"]')
                ?? document.querySelector('link[rel*="icon"][type="image/png"]')
                ?? document.querySelector('link[rel*="icon"]');
        }
        this.faviconElement.href = this.canvasElement.toDataURL('image/png');
    }
}

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    private baseUrl?: string;

    public getBaseUrl(): string {
        if (this.baseUrl === undefined) {
            const baseElement = document.querySelector('base');
            this.baseUrl = baseElement ? baseElement.attributes.getNamedItem('href')?.value || '' : '';
            this.baseUrl = this.baseUrl.replace(/\/+$/, '');
        }
        return this.baseUrl;
    }
}

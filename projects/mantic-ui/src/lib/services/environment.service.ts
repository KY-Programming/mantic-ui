import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    private baseUrl: string;

    public getBaseUrl(): string {
        if (this.baseUrl === undefined) {
            const baseElement = document.getElementsByTagName('base')[0];
            this.baseUrl = baseElement ? baseElement.attributes['href'].value || '' : '';
            this.baseUrl = this.baseUrl.replace(/\/+$/, '');
        }
        return this.baseUrl;
    }
}

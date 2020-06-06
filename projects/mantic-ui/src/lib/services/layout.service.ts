import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    public readonly menuTemplates: TemplateRef<unknown>[] = [];
    public readonly footerTemplates: TemplateRef<unknown>[] = [];
}

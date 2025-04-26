import { TemplateRef } from '@angular/core';

export interface Template<T = unknown> {
    ref: TemplateRef<T>;
    class?: string;
}

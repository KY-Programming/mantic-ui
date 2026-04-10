import { TemplateRef, WritableSignal } from '@angular/core';

export interface Template<T = unknown> {
    ref: TemplateRef<T>;
    class?: string;
    visible: WritableSignal<boolean>;
    autoHide?: boolean;
}

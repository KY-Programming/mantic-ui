import { Component, TemplateRef, viewChild } from '@angular/core';

@Component({
    selector: 'm-expander-header',
    template: `
        <ng-template>
            <ng-content />
        </ng-template>
    `
})
export class ExpanderHeaderComponent {
    public readonly template = viewChild(TemplateRef);
}

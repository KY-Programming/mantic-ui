import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, NgIfContext } from '@angular/common';

@Component({
    selector: 'm-expander-header',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    imports: [CommonModule]
})
export class ExpanderHeaderComponent {

    @ViewChild(TemplateRef)
    // eslint-disable-next-line no-null/no-null
    public template: TemplateRef<NgIfContext<boolean>> | null = null;

}

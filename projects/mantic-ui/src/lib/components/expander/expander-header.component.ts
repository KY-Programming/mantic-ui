import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'm-expander-header',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    standalone: true
})
export class ExpanderHeaderComponent {

    @ViewChild(TemplateRef)
    public template: TemplateRef<unknown>;

}

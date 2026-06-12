import { Component, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgIfContext } from '@angular/common';

@Component({
    selector: 'm-expander-header',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: []
})
export class ExpanderHeaderComponent {

    @ViewChild(TemplateRef)
    // eslint-disable-next-line no-null/no-null
    public template: TemplateRef<NgIfContext<boolean>> | null = null;

}

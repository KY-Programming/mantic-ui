import { Component, effect, inject, input, OnDestroy, TemplateRef, viewChild } from '@angular/core';
import { Template } from '../../models/template';
import { TemplateService } from '../../services/template.service';

@Component({
    selector: 'm-template',
    imports: [],
    templateUrl: './template.component.html',
    styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnDestroy {
    private readonly templateService = inject(TemplateService);
    private template: Template | undefined;
    protected readonly contentTemplate = viewChild<TemplateRef<unknown>>('contentTemplate');
    public readonly name = input.required<string | string[]>();
    public readonly class = input<string>();

    public constructor() {
        effect(() => {
            const ref = this.contentTemplate();
            if (this.template) {
                this.templateService.hide(this.name(), this.template);
            }
            this.template = ref ? { ref, class: this.class() } : undefined;
            if (this.template) {
                this.templateService.show(this.name(), this.template);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.template) {
            this.templateService.hide(this.name(), this.template);
        }
    }
}

import { Component, inject, input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
    selector: 'm-template',
    imports: [],
    templateUrl: './template.component.html',
    styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnDestroy {
    private readonly templateService = inject(TemplateService);
    public readonly name = input.required<string | string[]>();
    private template: TemplateRef<unknown> | undefined;

    @ViewChild('contentTemplate')
    protected set contentTemplate(value: TemplateRef<unknown> | undefined) {
        if (this.template) {
            this.templateService.hide(this.name(), this.template);
        }
        this.template = value;
        if (this.template) {
            this.templateService.show(this.name(), this.template);
        }
    }

    public ngOnDestroy(): void {
        if (this.template) {
            this.templateService.hide(this.name(), this.template);
        }
    }
}

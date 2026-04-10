import { Component, effect, inject, input, model, OnDestroy, TemplateRef, untracked, viewChild } from '@angular/core';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
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
    public readonly visible = model(true);

    /**
     * When used, it sets the default visibility of the template to false.
     * @example
     * ```html
     * <m-template hidden />
     * ```
     */
    public readonly hidden = input<boolean, '' | undefined>(false, { transform: toBoolean });

    /* When set to true, it set its visible state to false when another template is shown in the same outlet */
    public readonly autoHide = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        effect(() => {
            const ref = this.contentTemplate();
            untracked(() => {
                if (this.template) {
                    this.templateService.hide(this.name(), this.template);
                }
                this.template = ref ? { ref, class: this.class(), visible: this.visible, autoHide: this.autoHide() } : undefined;
                if (this.template && this.visible()) {
                    this.templateService.show(this.name(), this.template);
                }
            });
        });
        effect(() => this.visible.update(value => this.hidden() ? false : value));
        effect(() => {
            const isVisible = this.visible();
            if (!this.template) {
                return;
            }
            if (isVisible) {
                this.templateService.show(this.name(), this.template);
            }
            else {
                this.templateService.hide(this.name(), this.template);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.template) {
            this.templateService.hide(this.name(), this.template);
        }
    }

    public show(): void {
        if (this.template) {
            this.templateService.show(this.name(), this.template);
        }
    }

    public hide(): void {
        if (this.template) {
            this.templateService.hide(this.name(), this.template);
        }
    }

    public toggle(): void {
        if (this.template) {
            this.templateService.toggle(this.name(), this.template);
        }
    }
}

import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { race, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroyable } from '../base/destroyable';
import { TemplateService } from '../services/template.service';

@Directive({
    selector: '[mHideOnEmptyTemplate]',
    standalone: true
})
export class HideOnEmptyTemplateDirective extends Destroyable {
    private readonly templateService = inject(TemplateService);
    private readonly template = inject(TemplateRef<unknown>);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly nextNameSubject = new Subject<void>();
    private hasTemplate = false;

    public readonly name = input.required<string | string[]>({ alias: 'mHideOnEmptyTemplate' });

    public constructor() {
        super();
        effect(() => {
            this.nextNameSubject.next();
            this.templateService.get(this.name()).pipe(takeUntil(race(this.destroy, this.nextNameSubject))).subscribe(template => {
                this.hasTemplate = !!template;
                this.refreshView();
            });
        });
    }

    private refreshView(): void {
        this.viewContainerRef.clear();
        if (this.hasTemplate) {
            this.viewContainerRef.createEmbeddedView(this.template);
        }
    }
}

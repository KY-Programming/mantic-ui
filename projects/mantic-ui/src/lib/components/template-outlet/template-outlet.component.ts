import { NgTemplateOutlet } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { race, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroyable } from '../../base/destroyable';
import { Template } from '../../models/template';
import { TemplateService } from '../../services/template.service';

@Component({
    selector: 'm-template-outlet',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './template-outlet.component.html',
    styleUrl: './template-outlet.component.scss',
    host: {
        '[class]': 'template?.class'
    }
})
export class TemplateOutletComponent extends Destroyable {
    private readonly templateService = inject(TemplateService);
    private readonly nextNameSubject = new Subject<void>();
    protected template: Template | undefined;
    public readonly name = input.required<string | string[]>();

    public constructor() {
        super();
        effect(() => {
            this.nextNameSubject.next();
            this.templateService.get(this.name()).pipe(takeUntil(race(this.destroy, this.nextNameSubject))).subscribe(template => this.template = template);
        });
    }
}

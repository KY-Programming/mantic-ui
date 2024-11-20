import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, TemplateRef } from '@angular/core';
import { race, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroyable } from '../../base/destroyable';
import { TemplateService } from '../../services/template.service';

@Component({
    selector: 'm-template-outlet',
    imports: [CommonModule],
    templateUrl: './template-outlet.component.html',
    styleUrl: './template-outlet.component.scss'
})
export class TemplateOutletComponent extends Destroyable {
    private readonly templateService = inject(TemplateService);
    private readonly nextNameSubject = new Subject<void>();
    protected template: TemplateRef<unknown> | undefined;
    public readonly name = input.required<string | string[]>();

    public constructor() {
        super();
        effect(() => {
            this.nextNameSubject.next();
            this.templateService.get(this.name()).pipe(takeUntil(race(this.destroy, this.nextNameSubject))).subscribe(template => this.template = template);
        });
    }
}

import { Component, ContentChildren, Input, Output, QueryList } from '@angular/core';
import { FormLayout } from './form-layout';
import { Subject } from 'rxjs';
import { DataSourceComponent } from '../data-source/data-source.component';

import { FormComponent } from '../form/form.component';
import { FormElementRendererComponent } from '../form-element-renderer/form-element-renderer.component';
import { FlexDirective } from '../flex/flex.directive';
import { FillDirective } from '../flex/fill/fill.directive';

@Component({
    selector: 'm-form-renderer',
    templateUrl: './form-renderer.component.html',
    styleUrls: ['./form-renderer.component.scss'],
    imports: [
    FormComponent,
    FormElementRendererComponent,
    FlexDirective,
    FillDirective
]
})
export class FormRendererComponent {
    private readonly dataChangeSubject = new Subject<unknown>();
    private readonly executeSubject = new Subject<string>();
    private layoutValue: FormLayout = { elements: [] };
    private dataValue: Record<string, unknown> = {};
    public dataSources: DataSourceComponent[] = [];

    @Input()
    public get layout(): FormLayout {
        return this.layoutValue;
    }

    public set layout(value: FormLayout | undefined) {
        this.layoutValue = value ?? { elements: [] };
    }

    public get data(): Record<string, unknown> {
        return this.dataValue;
    }

    @Input()
    public set data(value: Record<string, unknown> | any) {
        this.dataValue = value;
        if (!value) {
            setTimeout(() => {
                this.dataValue = {};
                this.dataChangeSubject.next(this.dataValue);
            });
        }
    }

    @Output()
    public readonly dataChange = this.dataChangeSubject.asObservable();

    @Output()
    public readonly execute = this.executeSubject.asObservable();

    @ContentChildren(DataSourceComponent)
    protected set dataSourceElements(query: QueryList<DataSourceComponent>) {
        this.dataSources = Array.from(query);
        query.changes.subscribe(() => this.dataSources = Array.from(query));
    }

    protected onExecute(action: string): void {
        this.executeSubject.next(action);
    }
}

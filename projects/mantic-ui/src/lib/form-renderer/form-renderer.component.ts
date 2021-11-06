import { Component, ContentChildren, Input, Output, QueryList } from '@angular/core';
import { FormLayout } from './form-layout';
import { Subject } from 'rxjs';
import { DataSourceComponent } from '../data-source/data-source.component';

@Component({
    selector: 'm-form-renderer',
    templateUrl: './form-renderer.component.html',
    styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent {
    private readonly dataChangeSubject = new Subject<unknown>();
    private readonly executeSubject = new Subject<string>();
    private dataValue: unknown;
    public dataSources: DataSourceComponent[] = [];

    @ContentChildren(DataSourceComponent)
    public set dataSourceElements(query: QueryList<DataSourceComponent>) {
        this.dataSources = Array.from(query);
        query.changes.subscribe(() => this.dataSources = Array.from(query));
    }

    @Input()
    public layout: FormLayout;

    public get data(): unknown {
        return this.dataValue;
    }

    @Input()
    public set data(value: unknown) {
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

    public onExecute(action: string): void {
        this.executeSubject.next(action);
    }
}

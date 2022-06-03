import { Component, DoCheck, ElementRef, HostBinding, Input, IterableDiffer, IterableDiffers, Output } from '@angular/core';
import { FormElements } from '../form-renderer/form-layout';
import { BaseComponent } from '../base/base.component';
import { DataSourceComponent } from '../data-source/data-source.component';
import { DropdownValue } from '../dropdown/dropdown-value';
import { merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooleanLike } from '../models/boolean-like';

@Component({
    selector: 'm-form-element-renderer',
    templateUrl: './form-element-renderer.component.html',
    styleUrls: ['./form-element-renderer.component.scss']
})
export class FormElementRendererComponent extends BaseComponent implements DoCheck {
    private isFields: boolean;
    private readonly elementsDiffer: IterableDiffer<FormElements>;
    private readonly fieldClasses = ['', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    private readonly dataCache: { [key: string]: Observable<DropdownValue[]> } = {};
    private readonly executeSubject = new Subject<string>();

    @Input()
    public elements: FormElements[];

    @Output()
    public readonly execute = this.executeSubject.asObservable();

    public get fields(): boolean {
        return this.isFields;
    }

    @Input()
    @HostBinding('class.fields')
    public set fields(value: BooleanLike) {
        this.isFields = this.toBoolean(value);
    }

    @Input()
    public data: unknown;

    @Input()
    public dataSources: DataSourceComponent[];

    public constructor(
        element: ElementRef<HTMLElement>,
        iterableDiffers: IterableDiffers
    ) {
        super(element, false);
        this.classList.register('elements', 'fields');
        this.elementsDiffer = iterableDiffers.find([]).create(undefined);
    }

    public ngDoCheck(): void {
        if (this.isFields && this.elementsDiffer.diff(this.elements)) {
            this.classList.set('elements', this.fieldClasses[this.elements.length]);
        }
    }

    public getItems(dataSourceKey: string, valueField: string, textField: string): Observable<DropdownValue[]> {
        if (!this.dataCache[dataSourceKey]) {
            const subject = new ReplaySubject<DropdownValue[]>(1);
            this.dataCache[dataSourceKey] = subject.asObservable();
            merge(...this.dataSources.map(x => x.get(dataSourceKey)).filter(x => x)).pipe(map(data => {
                return data?.map(entry => new DropdownValue<unknown>(entry[valueField], entry[textField]));
            })).subscribe(data => subject.next(data), error => subject.next(error));
        }
        return this.dataCache[dataSourceKey];
    }

    public onExecute(action: string): void {
        this.executeSubject.next(action);
    }
}

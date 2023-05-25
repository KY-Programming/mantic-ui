import { Component, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataSourceRequest } from './data-source-request';

@Component({
    selector: 'm-data-source',
    template: '',
    standalone: true
})
export class DataSourceComponent {
    private readonly requestSubject = new Subject<DataSourceRequest>();

    @Output()
    public readonly request = this.requestSubject.asObservable();

    public get(key: string): Observable<Record<string, unknown>[]> {
        const request = new DataSourceRequest(key);
        this.requestSubject.next(request);
        return request.observable;
    }
}

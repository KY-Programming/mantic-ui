import { Component } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';
import { DataSourceRequest } from './data-source-request';

@Component({
    selector: 'm-data-source',
    template: ''
})
export class DataSourceComponent {
    private readonly requestSubject = new Subject<DataSourceRequest>();
    public readonly request = outputFromObservable(this.requestSubject);

    public get(key: string): Observable<Record<string, unknown>[]> {
        const request = new DataSourceRequest(key);
        this.requestSubject.next(request);
        return request.observable;
    }
}

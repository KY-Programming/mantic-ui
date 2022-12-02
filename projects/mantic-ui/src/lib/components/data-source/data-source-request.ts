import { Observable, ReplaySubject } from 'rxjs';

export class DataSourceRequest {
    private readonly subject = new ReplaySubject<unknown[]>(1);
    public readonly observable = this.subject.asObservable();

    public constructor(
        public readonly key: string
    ) {
    }

    public resolve(data: unknown[] | Observable<unknown[]>): void {
        if (Array.isArray(data)) {
            this.subject.next(data);
        } else {
            data.subscribe({
                next: result => this.subject.next(result),
                error: error => this.subject.error(error)
            });
        }
    }
}

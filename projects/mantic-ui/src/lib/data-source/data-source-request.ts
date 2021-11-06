import { Observable, Subject } from 'rxjs';

export class DataSourceRequest {
  private readonly subject = new Subject<unknown[]>();
  public readonly observable = this.subject.asObservable();

  constructor(
      public readonly key: string
  ) {
  }

  public resolve(data: unknown[] | Observable<unknown[]>): void {
    if (Array.isArray(data)) {
      this.subject.next(data);
    }
    else {
      data.subscribe(result => this.subject.next(result), error => this.subject.error(error));
    }
  }
}

import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class DimmableService {
    private readonly dimmedSubject = new ReplaySubject<boolean>(1);

    public dimmable = false;
    public readonly dimmed = this.dimmedSubject.asObservable();

    public dim(value = true): void {
        this.dimmedSubject.next(value);
    }
}

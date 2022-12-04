import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class Destroyable implements OnDestroy {
    private readonly destroySubject = new Subject<void>();
    protected readonly destroy = this.destroySubject.asObservable();

    public ngOnDestroy(): void {
        this.destroySubject.next();
    }
}

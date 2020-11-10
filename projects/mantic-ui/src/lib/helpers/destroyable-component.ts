import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class DestroyableComponent implements OnDestroy {
    private readonly destroySubject = new Subject<void>();
    protected readonly destroy = this.destroySubject.asObservable();

    public ngOnDestroy(): void {
        this.destroySubject.next();
    }
}

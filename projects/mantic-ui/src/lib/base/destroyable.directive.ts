import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class DestroyableDirective implements OnDestroy {
    private readonly destroySubject = new Subject<void>();
    protected readonly destroy = this.destroySubject.asObservable();

    public ngOnDestroy(): void {
        this.destroySubject.next();
    }
}

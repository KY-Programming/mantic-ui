import { Injectable, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export abstract class Destroyable implements OnDestroy {
    private readonly destroySubject = new Subject<void>();

    /**
     * An observable that emits when the component is destroyed.
     */
    public readonly destroy = this.destroySubject.asObservable();

    /**
     * Pipe this method to a subject to take values until the component is destroyed.
     * Example: `observable.pipe(this.takeUntilDestroy()).subscribe(...);`
     * Equals to `observable.pipe(takeUntil(this.destroy)).subscribe(...);`.
     */
    public takeUntilDestroy<T>(): MonoTypeOperatorFunction<T> {
        return takeUntil(this.destroy);
    }

    public ngOnDestroy(): void {
        this.destroySubject.next();
    }
}

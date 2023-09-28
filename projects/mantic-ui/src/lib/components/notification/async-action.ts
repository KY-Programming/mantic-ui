import { InteropObservable, Subject, Subscribable } from 'rxjs';

export class AsyncAction implements InteropObservable<void> {
    private readonly subject = new Subject<void>();

    public readonly event = this.subject.asObservable();

    /**
     * Alias for done to support rxjs.Observer<void>
     * @deprecated
     */
    public readonly next = this.done;

    public done(): void {
        this.subject.next();
        this.subject.complete();
    }

    public error(message?: string): void {
        this.subject.error(message);
    }

    public [Symbol.observable](): Subscribable<void> {
        return this.subject;
    }
}

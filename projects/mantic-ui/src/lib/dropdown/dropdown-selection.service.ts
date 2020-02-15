import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Use this to solve circular dependency problem
@Injectable()
export class DropwDownSelectionService {
    private readonly selectedSubject = new Subject<{ value: unknown, component: ElementRef }>();
    public readonly selected = this.selectedSubject.asObservable();

    public select(value: unknown, component: ElementRef): void {
        this.selectedSubject.next({ value, component });
    }
}

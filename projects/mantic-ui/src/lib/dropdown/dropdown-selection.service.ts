import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Use this to solve circular dependency problem
@Injectable()
export class DropDownSelectionService {
    private readonly selectedSubject = new Subject<unknown>();
    public readonly selected = this.selectedSubject.asObservable();

    public select(value: unknown): void {
        this.selectedSubject.next(value);
    }
}

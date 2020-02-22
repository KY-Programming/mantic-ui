import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RadioCheckEvent } from '../models/radio-check-event';

@Injectable({
    providedIn: 'root'
})
export class RadioService {
    private readonly checkedSubject = new Subject<RadioCheckEvent>();
    public readonly checked = this.checkedSubject.asObservable();

    public check(group: string, value: unknown): void {
        this.checkedSubject.next({ group, value });
    }
}

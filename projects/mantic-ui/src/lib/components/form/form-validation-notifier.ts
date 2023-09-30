import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormValidationNotifier {
    private isValidValue = true;
    private readonly isValidSubject = new BehaviorSubject<boolean>(this.isValidValue);
    public readonly isValid$ = this.isValidSubject.asObservable();

    public get isValid(): boolean {
        return this.isValidValue;
    }

    public set(value: boolean): void {
        this.isValidValue = value;
        this.isValidSubject.next(value);
    }

}

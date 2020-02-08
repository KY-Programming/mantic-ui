import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly versionSubject = new ReplaySubject<string>(1);
    public version: Observable<string> = this.versionSubject.asObservable();

    public setVersion(version: string): void {
        this.versionSubject.next(version);
    }
}

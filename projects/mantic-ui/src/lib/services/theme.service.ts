import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly versionSubject = new ReplaySubject<string>(1);
    public version = this.versionSubject.asObservable();

    public setVersion(version: string): void {
        this.versionSubject.next(version);
    }

    public prefersDark(): boolean {
        return matchMedia('(prefers-color-scheme: dark)').matches;
    }
}

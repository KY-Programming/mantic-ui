import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs';
import { NpmPackageResponse } from '../models/npm-package-response';

@Injectable({
    providedIn: 'root'
})
export class NpmApiService {
    private readonly http = inject(HttpClient);

    private readonly cache = new Map<string, ReplaySubject<string[]>>();

    public find(packageName: string, version?: string): Observable<string[]> {
        return this.get(packageName).pipe(
            map(infos => infos.filter(info => !version || info.startsWith(version)))
        );
    }

    public get(packageName: string): Observable<string[]> {
        packageName = packageName.toLowerCase();
        let subject = this.cache.get(packageName);
        if (!subject) {
            const created = new ReplaySubject<string[]>(1);
            subject = created;
            this.cache.set(packageName, created);
            this.http.get<NpmPackageResponse>(`https://registry.npmjs.org/${packageName}`).subscribe(response => {
                const versions: string[] = Object.keys(response.versions);
                created.next(versions.sort(sortByPackageVersionDesc));
            });
        }
        return subject.asObservable();
    }
}

const sortByPackageVersionDesc = (left: string, right: string) => left > right ? -1 : left < right ? 1 : 0;

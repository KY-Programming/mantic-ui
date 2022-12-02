import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NpmPackageResponse } from '../models/npm-package-response';

@Injectable({
    providedIn: 'root'
})
export class NpmApiService {
    private readonly cache: Record<string, ReplaySubject<string[]>> = {};

    public constructor(
        private readonly http: HttpClient
    ) {}

    public find(packageName: string, version?: string): Observable<string[]> {
        return this.get(packageName).pipe(
            map(infos => infos.filter(info => !version || info.startsWith(version)))
        );
    }

    public get(packageName: string): Observable<string[]> {
        packageName = packageName.toLowerCase();
        if (!this.cache[packageName]) {
            this.cache[packageName] = new ReplaySubject<string[]>(1);
            this.http.get<NpmPackageResponse>(`https://registry.npmjs.org/${packageName}`).subscribe(response => {
                const versions: string[] = Object.keys(response.versions);
                this.cache[packageName].next(versions.sort(sortByPackageVersionDesc));
            });
        }
        return this.cache[packageName].asObservable();
    }
}

const sortByPackageVersionDesc = (left: string, right: string) => left > right ? -1 : left < right ? 1 : 0;

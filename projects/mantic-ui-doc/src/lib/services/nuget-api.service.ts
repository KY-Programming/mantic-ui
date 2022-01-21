import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { NugetPackageResponse, sortByPackageVersionDesc } from '../models/nuget-package-response';
import { map } from 'rxjs/operators';
import { NugetPackageVersion } from '../models/nuget-package.version';

@Injectable({
    providedIn: 'root'
})
export class NugetApiService {
    private readonly cache: Record<string, ReplaySubject<NugetPackageVersion[]>> = {};

    constructor(
        private readonly http: HttpClient
    ) {}

    public find(packageName: string, version?: string): Observable<NugetPackageVersion[]> {
        return this.get(packageName).pipe(
            map(infos => infos.filter(info => !version || info.version.startsWith(version)))
        );
    }

    public get(packageName: string): Observable<NugetPackageVersion[]> {
        packageName = packageName.toLowerCase();
        if (!this.cache[packageName]) {
            this.cache[packageName] = new ReplaySubject<NugetPackageVersion[]>(1);
            this.http.get<NugetPackageResponse>(`https://api.nuget.org/v3/registration5-gz-semver2/${packageName}/index.json`).subscribe(response => {
                const versions: NugetPackageVersion[] = [];
                for (let page of response.items) {
                    versions.push(...page.items.map(x => x.catalogEntry));
                }
                this.cache[packageName].next(versions.sort(sortByPackageVersionDesc));
            });
        }
        return this.cache[packageName].asObservable();
    }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { NugetPackageResponse, sortByPackageVersionDesc } from '../models/nuget-package-response';
import { map } from 'rxjs';
import { NugetPackageVersion } from '../models/nuget-package.version';

@Injectable({
    providedIn: 'root'
})
export class NugetApiService {
    private readonly http = inject(HttpClient);

    private readonly cache = new Map<string, ReplaySubject<NugetPackageVersion[]>>();

    public find(packageName: string, version?: string): Observable<NugetPackageVersion[]> {
        return this.get(packageName).pipe(
            map(infos => infos.filter(info => !version || info.version.startsWith(version)))
        );
    }

    public get(packageName: string): Observable<NugetPackageVersion[]> {
        packageName = packageName.toLowerCase();
        let subject = this.cache.get(packageName);
        if (!subject) {
            const created = new ReplaySubject<NugetPackageVersion[]>(1);
            subject = created;
            this.cache.set(packageName, created);
            this.http.get<NugetPackageResponse>(`https://api.nuget.org/v3/registration5-gz-semver2/${packageName}/index.json`).subscribe(response => {
                const versions: NugetPackageVersion[] = [];
                for (const page of response.items) {
                    versions.push(...page.items.map(x => x.catalogEntry));
                }
                created.next(versions.sort(sortByPackageVersionDesc));
            });
        }
        return subject.asObservable();
    }
}

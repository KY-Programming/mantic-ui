import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-intro',
    imports: [RouterLink],
    templateUrl: './intro.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
    private static readonly versionPattern = /(\d+\.\d+\.\d+)/;

    public readonly version = signal('?.?.?');

    public constructor(
        private readonly http: HttpClient
    ) {
        const favicon = <HTMLLinkElement>document.getElementById('favicon');
        favicon.href = window.location.origin + '/assets/mantic.png';
    }

    public ngOnInit(): void {
        // The repository also releases other packages (e.g. "ESLint Config v22.0.8"), so /releases/latest can not be used.
        // Mantic releases are tagged "mantic-v22.0.5" and the older ones just "22.0.5".
        this.http.get<{ name: string, tag_name: string }[]>('https://api.github.com/repos/ky-programming/mantic-ui/releases?per_page=100').subscribe(releases => {
            const latest = releases.find(entry => /^(mantic-)?v?\d+\.\d+\.\d+$/.test(entry.tag_name));
            const version = IntroComponent.versionPattern.exec(latest?.tag_name ?? '')?.[1];
            if (version) {
                this.version.set(version);
            }
        });
    }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-intro',
    imports: [RouterLink],
    templateUrl: './intro.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

    public version = '?.?.?';

    public constructor(
        private readonly http: HttpClient
    ) {
        const favicon = <HTMLLinkElement>document.getElementById('favicon');
        favicon.href = window.location.origin + '/assets/mantic.png';
    }

    public ngOnInit(): void {
        this.http.get<{ name: string }>('https://api.github.com/repos/ky-programming/mantic-ui/releases/latest').subscribe(result => this.version = result.name);
    }
}

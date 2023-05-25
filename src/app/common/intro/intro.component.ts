import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-intro',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './intro.component.html',
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

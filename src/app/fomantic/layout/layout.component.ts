import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-semantic-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class FomanticLayoutComponent {
    public showThemeWarning = true;

    public constructor(
        private readonly router: Router
    ) {
        const favicon = <HTMLLinkElement>document.getElementById('favicon');
        favicon.href = window.location.origin + '/assets/fomantic.png';
    }

    public toSemantic(): void {
        const url = this.router.url.replace('fomantic', 'semantic');
        window.location.href = url;
    }
}

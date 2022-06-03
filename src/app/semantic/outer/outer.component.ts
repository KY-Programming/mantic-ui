import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './outer.component.html',
    styleUrls: ['./outer.component.scss']
})
export class SemanticOuterComponent {
    public constructor(
        private readonly router: Router
    ) {
        const favicon = <HTMLLinkElement>document.getElementById('favicon');
        favicon.href = window.location.origin + '/assets/semantic.png';
    }

    public toFomantic(): void {
        const url = this.router.url.replace('semantic', 'fomantic');
        window.location.href = url;
    }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-semantic-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class SemanticLayoutComponent {
  constructor(
    private readonly router: Router
  ) {
    const favicon = <HTMLLinkElement>document.getElementById('favicon');
    favicon.href = window.location.origin + '/assets/semantic.png';
    document.title = 'Semantic UI Angular';
  }

  public toFomantic(): void {
    const url = this.router.url.replace('semantic', 'fomantic');
    window.location.href = url;
  }
}

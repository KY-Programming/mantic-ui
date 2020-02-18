import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './outer.component.html',
  styleUrls: ['./outer.component.scss']
})
export class SemanticOuterComponent {
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

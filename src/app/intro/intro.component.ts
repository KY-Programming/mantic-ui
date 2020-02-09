import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  constructor() {
    const favicon = <HTMLLinkElement>document.getElementById('favicon');
    favicon.href = window.location.origin + '/assets/mantic.png';
    document.title = 'Mantic UI';
  }
}

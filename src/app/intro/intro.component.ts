import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  public version = '?.?.?';

  constructor(
    private readonly http: HttpClient
  ) {
    const favicon = <HTMLLinkElement>document.getElementById('favicon');
    favicon.href = window.location.origin + '/assets/mantic.png';
    document.title = 'mantic UI';
  }

  public ngOnInit(): void {
    this.http.get<{ name: string }>('https://api.github.com/repos/ky-programming/mantic-ui/releases/latest').subscribe(result => this.version = result.name);
  }
}

import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ExternalRouteData } from './external-route-data';

@Component({
  template: ``,
  styles: []
})
export class ExternalRouteComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    const data = this.route.snapshot.data as ExternalRouteData;
    if (data && data.redirectTo) {
      window.location.href = data.redirectTo;
    }
  }

}

import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalRouteData } from './external-route-data';

@Directive()
export abstract class ExternalRouteComponent implements OnInit {

    protected constructor(
        private readonly route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        const data = this.route.snapshot.data as ExternalRouteData;
        if (data && data.redirectTo) {
            window.location.href = data.redirectTo;
        }
    }

}

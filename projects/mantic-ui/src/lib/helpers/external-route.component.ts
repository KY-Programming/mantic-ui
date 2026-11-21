import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalRouteData } from './external-route-data';

@Directive()
export abstract class ExternalRouteComponent implements OnInit {

    protected constructor(
        // eslint-disable-next-line @angular-eslint/prefer-inject -- public base class: subclasses call super(route), inject() would break them
        private readonly route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        const data = this.route.snapshot.data as ExternalRouteData;
        if (data.redirectTo) {
            globalThis.location.assign(data.redirectTo);
        }
    }

}

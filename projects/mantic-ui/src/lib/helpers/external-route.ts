import { Data, ResolveData, Route } from '@angular/router';
import { ExternalRouteData } from './external-route-data';

export class ExternalRoute implements Route {
    public readonly path: string;
    // tslint:disable-next-line: no-any => Currently there is no better type available
    public readonly component: any = {};
    public readonly data: Data;
    public readonly resolve: ResolveData = { url: 'externalUrlRedirectResolver' };

    public constructor(data: ExternalRouteData) {
        this.path = data.path;
        this.data = data;
    }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ExternalRouteData } from './external-route-data';

@NgModule({
    declarations: [],
    providers: [
        {
            provide: 'externalUrlRedirectResolver',
            useValue: (route: ActivatedRouteSnapshot) => {
                const data = route.data as ExternalRouteData;
                if (data && data.redirectTo) {
                    window.location.href = data.redirectTo;
                }
            }
        }
    ],
    imports: [
        CommonModule
    ]
})
export class ExternalRouteModule { }

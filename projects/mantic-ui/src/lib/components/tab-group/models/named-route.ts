import { Route } from '@angular/router';

export interface NamedRoute extends Route {
    fullPath: string;
    parameters: string[];
}
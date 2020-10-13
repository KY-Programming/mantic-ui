import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    public parse(url: string): UrlTree {
        return super.parse(url ? url.toLowerCase() : url);
    }
}

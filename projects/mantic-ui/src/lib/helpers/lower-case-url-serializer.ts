import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    public override parse(url: string): UrlTree {
        return super.parse(url ? url.toLowerCase() : url);
    }
}

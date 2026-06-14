import { UrlSegment } from '@angular/router';

export class NamedUrlSegment extends UrlSegment {
    public constructor(
        public readonly name: string,
        segment: UrlSegment
    ) {
        super(segment.path, segment.parameters);
        Object.assign(this, segment);
    }
}
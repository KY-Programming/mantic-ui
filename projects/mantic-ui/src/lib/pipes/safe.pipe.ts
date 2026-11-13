import { DOCUMENT, inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const allowedProtocols = ['http:', 'https:'];
const blankUrl = 'about:blank';

/**
 * Trusts a URL as resource URL (e.g. for an iframe's src), but only if it is an http(s) address or a relative one.
 * Anything else (javascript:, data:, blob:, ...) would run with the app's origin or is not meant to be embedded, so it becomes about:blank.
 */
@Pipe({
    name: 'mSafe',
})
export class SafePipe implements PipeTransform {
    private readonly sanitizer = inject(DomSanitizer);
    private readonly document = inject(DOCUMENT);

    public transform(url: string | null | undefined): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.isAllowed(url) ? url : blankUrl);
    }

    private isAllowed(url: string | null | undefined): url is string {
        if (!url) {
            return false;
        }
        try {
            return allowedProtocols.includes(new URL(url, this.document.baseURI).protocol);
        }
        catch {
            return false;
        }
    }
}

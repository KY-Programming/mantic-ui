import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'mSafe',
    })
export class SafePipe implements PipeTransform {
    public constructor(
        private readonly sanitizer: DomSanitizer
    ) {
    }

    public transform(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

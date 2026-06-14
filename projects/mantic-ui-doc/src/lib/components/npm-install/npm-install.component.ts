import { ChangeDetectionStrategy, Component, Input, input, model } from '@angular/core';
import { BooleanLike, SegmentComponent, toBoolean } from '@mantic-ui/angular';
import { NpmApiService } from '../../services/npm-api.service';

@Component({
    selector: 'm-npm-install',
    templateUrl: './npm-install.component.html',
    styleUrls: ['./npm-install.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SegmentComponent]
})
export class NpmInstallComponent {
    private packageValue: string | undefined;
    private searchVersionValue: string | undefined;

    @Input()
    public get package(): string | undefined {
        return this.packageValue;
    }

    public set package(value: string | undefined) {
        this.packageValue = value;
        this.refreshVersion();
    }

    public readonly version = model<string>();

    @Input()
    public get searchVersion(): string | undefined {
        return this.searchVersionValue;
    }

    public set searchVersion(value: string | undefined) {
        this.searchVersionValue = value;
        this.refreshVersion();
    }

    public readonly dev = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor(
        private readonly nugetApiService: NpmApiService
    ) {
    }

    private refreshVersion(): void {
        if (!this.searchVersion || !this.package) {
            return;
        }
        this.nugetApiService.find(this.package, this.searchVersion).subscribe(versions => this.version.set(versions[0]));
    }

}

import { Component, Input, ChangeDetectionStrategy, input } from '@angular/core';
import { NpmApiService } from '../../services/npm-api.service';


@Component({
    selector: 'm-npm',
    templateUrl: './npm.component.html',
    styleUrls: ['./npm.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: []
})
export class NpmComponent {
    private packageValue: string | undefined;
    private searchVersionValue: string | undefined;

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get package(): string | undefined {
        return this.packageValue;
    }

    public set package(value: string | undefined) {
        this.packageValue = value;
        this.refreshVersion();
    }

    public readonly version = input<string>();

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    public get searchVersion(): string | undefined {
        return this.searchVersionValue;
    }

    public set searchVersion(value: string | undefined) {
        this.searchVersionValue = value;
        this.refreshVersion();
    }

    public get npmLink(): string {
        const version = this.version();
        return version ? `https://www.npmjs.com/package/${this.package}/v/${version}` : `https://www.npmjs.com/package/${this.package}`;
    }

    public constructor(
        private readonly npmApiService: NpmApiService
    ) {
    }

    private refreshVersion(): void {
        if (!this.searchVersion || !this.package) {
            return;
        }
        this.npmApiService.find(this.package, this.searchVersion).subscribe(versions => this.version = versions[0]);
    }

}

import { Component, Input, ChangeDetectionStrategy, input } from '@angular/core';
import { NugetApiService } from '../../services/nuget-api.service';


@Component({
    selector: 'm-nuget',
    templateUrl: './nuget.component.html',
    styleUrls: ['./nuget.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: []
})
export class NugetComponent {
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

    public constructor(
        private readonly nugetApiService: NugetApiService
    ) {}

    private refreshVersion(): void {
        if (!this.searchVersion || !this.package) {
            return;
        }
        this.nugetApiService.find(this.package, this.searchVersion).subscribe(versions => this.version = versions[0]?.version);
    }
}

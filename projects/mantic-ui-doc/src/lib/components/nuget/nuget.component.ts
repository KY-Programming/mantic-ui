import { Component, Input } from '@angular/core';
import { NugetApiService } from '../../services/nuget-api.service';


@Component({
    selector: 'm-nuget',
    templateUrl: './nuget.component.html',
    styleUrls: ['./nuget.component.scss'],
    imports: []
})
export class NugetComponent {
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

    @Input()
    public version: string | undefined;

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

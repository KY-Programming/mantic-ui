import { Component, Input } from '@angular/core';
import { DimmableService } from '@mantic-ui/angular';
import { NugetApiService } from '../../services/nuget-api.service';

@Component({
    selector: 'm-nuget-install',
    templateUrl: './nuget-install.component.html',
    styleUrls: ['./nuget-install.component.scss'],
    providers: [DimmableService]
})
export class NugetInstallComponent {
    private packageValue: string;
    private searchVersionValue: string;

    @Input()
    public get package(): string {
        return this.packageValue;
    }

    public set package(value: string) {
        this.packageValue = value;
        this.refreshVersion();
    }

    @Input()
    public version: string;

    @Input()
    public get searchVersion(): string {
        return this.searchVersionValue;
    }

    public set searchVersion(value: string) {
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

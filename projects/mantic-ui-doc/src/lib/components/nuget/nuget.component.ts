import { Component, Input, model, inject } from '@angular/core';
import { NugetApiService } from '../../services/nuget-api.service';

@Component({
    selector: 'm-nuget',
    templateUrl: './nuget.component.html',
    styleUrls: ['./nuget.component.scss']
})
export class NugetComponent {
    private readonly nugetApiService = inject(NugetApiService);

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

    private refreshVersion(): void {
        if (!this.searchVersion || !this.package) {
            return;
        }
        this.nugetApiService.find(this.package, this.searchVersion).subscribe(versions => this.version.set(versions[0]?.version));
    }
}

import { ChangeDetectionStrategy, Component, Input, model } from '@angular/core';

import { TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { NugetApiService } from '../../services/nuget-api.service';

@Component({
    selector: 'm-nuget-install',
    templateUrl: './nuget-install.component.html',
    styleUrls: ['./nuget-install.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [TabComponent, TabGroupComponent]
})
export class NugetInstallComponent {
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

    public constructor(
        private readonly nugetApiService: NugetApiService
    ) {}

    private refreshVersion(): void {
        if (!this.searchVersion || !this.package) {
            return;
        }
        this.nugetApiService.find(this.package, this.searchVersion).subscribe(versions => this.version.set(versions[0]?.version));
    }
}

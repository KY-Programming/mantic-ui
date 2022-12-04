import { Component, Input } from '@angular/core';
import { NugetApiService } from '../../services/nuget-api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-nuget',
    templateUrl: './nuget.component.html',
    styleUrls: ['./nuget.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class NugetComponent {
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

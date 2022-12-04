import { Component, Input } from '@angular/core';
import { BooleanLike, SegmentComponent, toBoolean } from '@mantic-ui/angular';
import { NpmApiService } from '../../services/npm-api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-npm-install',
    templateUrl: './npm-install.component.html',
    styleUrls: ['./npm-install.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SegmentComponent
    ]
})
export class NpmInstallComponent {
    private packageValue: string;
    private searchVersionValue: string;
    private isDev: boolean;

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

    @Input()
    public get dev(): boolean {
        return this.isDev;
    }

    public set dev(value: BooleanLike) {
        this.isDev = toBoolean(value);
    }

    public constructor(
        private readonly nugetApiService: NpmApiService
    ) {
    }

    private refreshVersion(): void {
        if (!this.searchVersion || !this.package) {
            return;
        }
        this.nugetApiService.find(this.package, this.searchVersion).subscribe(versions => this.version = versions[0]);
    }

}

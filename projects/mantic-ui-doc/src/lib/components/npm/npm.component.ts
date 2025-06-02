import { Component, Input } from '@angular/core';
import { NpmApiService } from '../../services/npm-api.service';


@Component({
    selector: 'm-npm',
    templateUrl: './npm.component.html',
    styleUrls: ['./npm.component.scss'],
    imports: []
})
export class NpmComponent {
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

    public get npmLink(): string {
        return this.version ? `https://www.npmjs.com/package/${this.package}/v/${this.version}` : `https://www.npmjs.com/package/${this.package}`;
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

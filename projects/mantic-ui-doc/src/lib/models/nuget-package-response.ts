import { NugetPackageVersion } from './nuget-package.version';
import { NugetPackageResponsePage } from './nuget-package-response.page';

export interface NugetPackageResponse {
    count: number;
    items: NugetPackageResponsePage[];
}

export const sortByPackageVersionAsc = (left: NugetPackageVersion, right: NugetPackageVersion) => left.version > right.version ? 1 : left.version < right.version ? -1 : 0;
export const sortByPackageVersionDesc = (left: NugetPackageVersion, right: NugetPackageVersion) => left.version > right.version ? -1 : left.version < right.version ? 1 : 0;

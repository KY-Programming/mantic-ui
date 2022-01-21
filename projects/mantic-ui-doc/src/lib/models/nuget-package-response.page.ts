import { NugetPackage } from './nuget.package';

export interface NugetPackageResponsePage {
    count: number;
    items: NugetPackage[];
    lower: string;
    upper: string;
}

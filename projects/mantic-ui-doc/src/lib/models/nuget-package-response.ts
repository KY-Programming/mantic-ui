export interface NugetPackageResponse {
    count: number;
    items: NugetPackageResponsePage[];
}

export interface NugetPackageResponsePage {
    count: number;
    items: NugetPackage[];
    lower: string;
    upper: string;
}

export interface NugetPackage {
    catalogEntry: NugetPackageVersion;
}

export interface NugetPackageVersion {
    authors: string;
    description: string;
    iconUrl: string;
    id: string;
    language: string;
    licenseExpression: string;
    licenseUrl: string;
    listed: boolean;
    minClientVersion: string;
    packageContent: string;
    projectUrl: string;
    published: Date;
    requireLicenseAcceptance: boolean;
    summary: string;
    tags: string[];
    title: string;
    version: string;
}

export const sortByPackageVersionAsc = (left: NugetPackageVersion, right: NugetPackageVersion) => left.version > right.version ? 1 : left.version < right.version ? -1 : 0;
export const sortByPackageVersionDesc = (left: NugetPackageVersion, right: NugetPackageVersion) => left.version > right.version ? -1 : left.version < right.version ? 1 : 0;

export interface NpmPackageResponse {
    '_id': string,
    '_rev': string,
    name: string,
    'dist-tags': Record<string, string>,
    versions: Record<string, unknown>,
    time: Record<string, string>,
    maintainers: {
        name: string,
        email: string
    }[],
    description: string,
    author: {
        name: string
    },
    license: string,
    readme: string,
    readmeFilename: string,
    keywords: string[]
}

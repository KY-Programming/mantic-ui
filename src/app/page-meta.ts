import { Data } from '@angular/router';
import { manticMetaKey } from '@mantic-ui/angular';

/** The route data of a page with the given description */
export function createPageMeta(description: string): Data {
    return { [manticMetaKey]: { description } };
}

/** The route data of a component's example page */
export function createExampleMeta(name: string): Data {
    return createPageMeta(`${name} for Angular with mantic UI: examples and API.`);
}

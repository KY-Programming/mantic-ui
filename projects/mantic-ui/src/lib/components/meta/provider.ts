import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { ManticMetaConfiguration } from './mantic-meta-configuration';
import { manticMetaConfigurationToken, ManticMetaService } from './mantic-meta.service';

/**
 * Keeps the meta tags (description, canonical url, Open Graph, Twitter card) in line with the active route. The site-wide
 * defaults come from the configuration, a page's own values from its route (see `ManticMeta` and `manticMetaKey`).
 */
export function provideManticMeta(configuration: ManticMetaConfiguration = {}): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: manticMetaConfigurationToken, useValue: configuration },
        provideEnvironmentInitializer(() => inject(ManticMetaService).start())
    ]);
}

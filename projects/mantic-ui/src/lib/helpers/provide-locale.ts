import { EnvironmentProviders, LOCALE_ID, makeEnvironmentProviders } from '@angular/core';
import { registerLocaleData } from '@angular/common';

/**
 * Register global data to be used internally by Angular. See the
 * ["I18n guide"](guide/i18n-common-format-data-locale) to know how to import additional locale
 * data.
 */
export function provideLocale(locale: any, localeId: string, localeExtra: any): EnvironmentProviders {
    registerLocaleData(locale, localeId, localeExtra);
    return makeEnvironmentProviders([
        { provide: LOCALE_ID, useValue: localeId }
    ]);
}

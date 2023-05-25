import { ManticTitleStrategyConfiguration } from './mantic-title-strategy-configuration';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ManticTitleStrategy } from './mantic-title-strategy';

export function provideManticTitleStrategy(
    configuration: ManticTitleStrategyConfiguration
): EnvironmentProviders {
    const titleStrategy = new ManticTitleStrategy(configuration);
    return makeEnvironmentProviders([
        { provide: TitleStrategy, useValue: titleStrategy },
        { provide: ManticTitleStrategy, useValue: titleStrategy }
    ]);
}

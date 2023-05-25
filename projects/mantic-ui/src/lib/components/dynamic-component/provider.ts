import { EnvironmentProviders, makeEnvironmentProviders, Type } from '@angular/core';
import { ComponentParser } from './component-parser';

export function provideDynamicComponent(
    type: Type<unknown>
): EnvironmentProviders {
    ComponentParser.register(type);
    return makeEnvironmentProviders([]);
}

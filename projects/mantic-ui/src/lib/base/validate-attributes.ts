import { reflectComponentType, Type } from '@angular/core';
import { SortedClassesService } from '../services/sorted-classes.service';

const globalAttributes = new Set(['class', 'style', 'title', 'tabindex']);
const inputNamesByType = new WeakMap<Type<unknown>, ReadonlySet<string>>();

/**
 * Warns about every attribute on the host element that has no effect: neither a registered class, nor an input of the component, nor a global HTML attribute.
 */
export function validateAttributes(element: HTMLElement, type: Type<unknown>, classes: SortedClassesService): void {
    for (const attribute of element.attributes) {
        const name = attribute.name;
        if (name.startsWith('_ng') || name.startsWith('ng-') || name.startsWith('m-') || globalAttributes.has(name)) {
            continue;
        }
        if (!classes.has(name) && !getInputNames(type).has(name)) {
            console.warn(`Unknown attribute '${name}' on <${element.tagName.toLowerCase()}> found.`, element);
        }
    }
}

function getInputNames(type: Type<unknown>): ReadonlySet<string> {
    let names = inputNamesByType.get(type);
    if (!names) {
        // The HTML parser lower-cases attribute names, so input names are compared lower-cased. Directives have no component mirror and only match registered classes.
        names = new Set(reflectComponentType(type)?.inputs.map(input => input.templateName.toLowerCase()) ?? []);
        inputNamesByType.set(type, names);
    }
    return names;
}

import { reflectComponentType, Type } from '@angular/core';
import { FlexDirective } from '../components/flex/flex.directive';
import { SortedClassesService } from '../services/sorted-classes.service';

// Attributes valid on any element, so they are never reported
const globalAttributes = new Set(['class', 'style', 'title', 'tabindex', 'id', 'role', 'hidden']);
// _ng/ng-: Angular's own markers, m-: selector attributes of mantic directives, aria-/data-: global HTML attribute families
const globalAttributePrefixes = ['_ng', 'ng-', 'm-', 'aria-', 'data-'];
const inputNamesByType = new WeakMap<Type<unknown>, ReadonlySet<string>>();
// m-flex sits on other mantic components, and those have no way to see the inputs of a directive next to them
const flexInputNames = new Set(FlexDirective.default.inputs.map(input => input.toLowerCase()));

/**
 * Warns about every attribute on the host element that has no effect: neither a registered class, nor an input of the component or of m-flex, nor a global HTML attribute.
 */
export function validateAttributes(element: HTMLElement, type: Type<unknown>, classes: SortedClassesService): void {
    for (const attribute of element.attributes) {
        const name = attribute.name;
        if (globalAttributes.has(name) || globalAttributePrefixes.some(prefix => name.startsWith(prefix))) {
            continue;
        }
        if (element.hasAttribute('m-flex') && flexInputNames.has(name)) {
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

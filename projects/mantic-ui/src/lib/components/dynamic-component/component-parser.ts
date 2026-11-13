import { ComponentMirror, ComponentRef, reflectComponentType, SecurityContext, Type, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ObjectHelper } from '../../helpers/object-helper';

interface RegisteredComponent {
    readonly mirror: ComponentMirror<unknown>;
    /** Lower-case public input name -> public input name, as `setInput` expects it */
    readonly inputNames: ReadonlyMap<string, string>;
}

interface ParseContext {
    readonly viewContainerRef: ViewContainerRef;
    readonly sanitizer: DomSanitizer;
    readonly data: Record<string, unknown>;
    /** Random per parse, so markup can not forge a placeholder */
    readonly marker: string;
    /** All component elements of this parse, a placeholder holds the index into it */
    readonly componentElements: Element[];
    /** Indexes of the component elements that were already created, so a duplicated placeholder creates nothing */
    readonly created: Set<number>;
}

/**
 * Turns an HTML string into DOM nodes and upgrades the elements of registered components to real Angular components.
 *
 * The string is only ever parsed inert (inside a `<template>`), so nothing in it loads or runs while parsing. Everything
 * that is not a registered component goes through Angular's `DomSanitizer` before it reaches the live document.
 * Attributes of a component element are only mapped to the component's inputs.
 */
export class ComponentParser {
    /** Lower-case tag name -> component */
    private static readonly registeredComponents = new Map<string, RegisteredComponent>();

    public static register<T>(component: Type<T>): void {
        const mirror = reflectComponentType(component);
        if (!mirror) {
            throw new Error(`Can not register component '${component.name}': no definition found`);
        }
        // Only plain element selectors can be matched by tag name, e.g. 'm-button' but not 'button[m-button]'
        const tagNames = mirror.selector.split(',').map(selector => selector.trim().toLowerCase()).filter(selector => /^[a-z][a-z0-9-]*$/.test(selector));
        if (tagNames.length === 0) {
            throw new Error(`Can not register component '${component.name}': its selector '${mirror.selector}' has no element selector`);
        }
        const inputNames = new Map(mirror.inputs.map(input => [input.templateName.toLowerCase(), input.templateName]));
        for (const tagName of tagNames) {
            this.registeredComponents.set(tagName, { mirror, inputNames });
        }
    }

    public static parse(template: string | undefined, viewContainerRef: ViewContainerRef, data?: Record<string, unknown>): Node[] {
        const host = viewContainerRef.element.nativeElement as Element;
        viewContainerRef.clear();
        host.replaceChildren();
        if (!template) {
            return [];
        }
        const fragment = this.parseInert(template);
        const context: ParseContext = {
            viewContainerRef,
            sanitizer: viewContainerRef.injector.get(DomSanitizer),
            // A copy, so the caller's object is never mutated
            data: { ...data, ...this.extractData(fragment) },
            marker: `⁣${Math.random().toString(36).slice(2)}⁣`,
            componentElements: [],
            created: new Set<number>()
        };
        const nodes = this.parseNodes([...fragment.childNodes], context);
        host.append(...nodes);
        return nodes;
    }

    private static parseInert(html: string): DocumentFragment {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content;
    }

    private static extractData(fragment: DocumentFragment): Record<string, unknown> {
        let data: Record<string, unknown> = {};
        // eslint-disable-next-line unicorn/no-useless-spread -- children is live and the loop removes elements from it
        for (const element of [...fragment.children]) {
            if (element.localName !== 'm-json') {
                continue;
            }
            element.remove();
            const value: unknown = JSON.parse(element.textContent || '{}');
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                // Spreading defines properties, so a "__proto__" key can not change the prototype like Object.assign would
                data = { ...data, ...(value as Record<string, unknown>) };
            }
        }
        return data;
    }

    /**
     * Replaces every registered component element with a placeholder text, sanitizes the remaining HTML, and swaps the
     * placeholders that survived for the created components. A component inside content the sanitizer drops
     * (e.g. inside a `<script>`) therefore is never created.
     */
    private static parseNodes(nodes: Node[], context: ParseContext): Node[] {
        const container = document.createElement('template');
        for (const node of nodes) {
            container.content.append(this.replaceComponents(node, context));
        }
        const sanitized = context.sanitizer.sanitize(SecurityContext.HTML, container.innerHTML) ?? '';
        const result = document.importNode(this.parseInert(sanitized), true);
        const walker = document.createTreeWalker(result, NodeFilter.SHOW_TEXT);
        const textNodes: Text[] = [];
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode as Text);
        }
        const placeholder = new RegExp(`${context.marker}(\\d+)${context.marker}`);
        for (const textNode of textNodes) {
            this.restoreComponents(textNode, placeholder, context);
        }
        return [...result.childNodes];
    }

    private static replaceComponents(node: Node, context: ParseContext): Node {
        if (!(node instanceof Element)) {
            return node;
        }
        if (this.registeredComponents.has(node.localName)) {
            context.componentElements.push(node);
            return document.createTextNode(`${context.marker}${String(context.componentElements.length - 1)}${context.marker}`);
        }
        // eslint-disable-next-line unicorn/no-useless-spread -- childNodes is live and the loop replaces nodes in it
        for (const child of [...node.childNodes]) {
            const replacement = this.replaceComponents(child, context);
            if (replacement !== child) {
                child.replaceWith(replacement);
            }
        }
        return node;
    }

    private static restoreComponents(textNode: Text, placeholder: RegExp, context: ParseContext): void {
        // The capture group keeps the indexes in the result: [text, index, text, index, ..., text]
        const parts = textNode.data.split(placeholder);
        if (parts.length === 1) {
            return;
        }
        const replacement: (Node | string)[] = [];
        for (const [position, part] of parts.entries()) {
            const isText = position % 2 === 0;
            const index = Number(part);
            const element = isText ? undefined : context.componentElements.at(index);
            if (isText && part) {
                replacement.push(part);
            }
            else if (element && !context.created.has(index)) {
                context.created.add(index);
                replacement.push(this.createComponent(element, context));
            }
        }
        textNode.replaceWith(...replacement);
    }

    private static createComponent(element: Element, context: ParseContext): Node {
        const component = this.registeredComponents.get(element.localName);
        if (!component) {
            throw new Error(`No component registered for '${element.localName}'`);
        }
        const nodes = this.parseNodes([...element.childNodes], context);
        const unusedNodes = [...nodes];
        const projectableNodes: Node[][] = component.mirror.ngContentSelectors.map(selector => {
            if (selector === '*') {
                return unusedNodes;
            }
            const foundNodes = nodes.filter(node => node.nodeName.toLowerCase() === selector);
            for (const foundNode of foundNodes) {
                const index = unusedNodes.indexOf(foundNode);
                if (index !== -1) {
                    unusedNodes.splice(index, 1);
                }
            }
            return foundNodes;
        });
        const componentReference = context.viewContainerRef.createComponent(component.mirror.type, { projectableNodes });
        this.applyInputs(element, component, componentReference, context.data);
        return componentReference.location.nativeElement as Node;
    }

    /** Attributes that are no input of the component are ignored: markup must never set arbitrary instance properties */
    private static applyInputs(element: Element, component: RegisteredComponent, componentReference: ComponentRef<unknown>, data: Record<string, unknown>): void {
        for (const attribute of element.attributes) {
            const boundAttribute = /^\[(?<name>.*)]$/.exec(attribute.name);
            const attributeName = boundAttribute ? boundAttribute.groups?.['name'] ?? '' : attribute.name;
            const inputName = component.inputNames.get(attributeName.toLowerCase());
            if (inputName) {
                componentReference.setInput(inputName, boundAttribute ? ObjectHelper.get(data, attribute.value) : attribute.value);
            }
        }
    }
}

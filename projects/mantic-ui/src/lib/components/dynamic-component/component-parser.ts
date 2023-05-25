import { Type, ViewContainerRef } from '@angular/core';
import { ObjectHelper } from '../../helpers/object-helper';

interface ComponentDef<T> {
    readonly ngContentSelectors?: string[];
    readonly selectors: string[][];
    readonly type: Type<T>;
    hostDirectives: HostDirectiveDef[] | null;
}

interface HostDirectiveDef<T = unknown> {
    directive: Type<T>;
    inputs: Record<string, string>;
    outputs: Record<string, string>;
}

function getComponentDef<T>(type: Type<T>): ComponentDef<T> | undefined {
    return (type as any)['ɵ' + 'cmp'] || undefined;
}

export class ComponentParser {
    private static readonly registeredComponents: ComponentDef<unknown>[] = [];

    public static register<T>(component: Type<T>): void {
        const componentDef = getComponentDef<T>(component);
        if (!componentDef) {
            throw new Error(`Can not register component '${component.name}': no definition found`);
        }
        this.registeredComponents.push();
    }

    public static parse(template: string | undefined, viewContainerRef: ViewContainerRef, data?: Record<string, unknown>): Node[] {
        if (!template) {
            viewContainerRef.clear();
            return [];
        }
        data ??= {};
        const nodes: Node[] = [];
        const helperNode = document.createElement('div');
        helperNode.innerHTML = template;
        const nodesToParse = Array.from(helperNode.childNodes);
        const dataNode = nodesToParse.find(node => node.nodeName === 'M-JSON');
        const index = dataNode ? nodesToParse.indexOf(dataNode) : -1;
        if (index >= 0) {
            nodesToParse.splice(index, 1);
        }
        if (dataNode instanceof Element) {
            Object.assign(data, JSON.parse(dataNode.innerHTML || '{}'));
        }
        for (const node of nodesToParse) {
            nodes.push(this.parseNode(node, viewContainerRef, data));
        }
        return nodes;
    }

    private static parseNode(node: Node, viewContainerRef: ViewContainerRef, data: Record<string, unknown>): Node {
        const definition = this.registeredComponents.find(d => d.selectors.some(sa => sa.some(s => s.toLowerCase() === node.nodeName.toLowerCase())));
        if (!definition) {
            const target: Node = viewContainerRef.element.nativeElement;
            this.appendTo(target, node);
            return node;
        }

        const nodes: Node[] = [];
        const nodesToParse = Array.from(node.childNodes);
        for (const nodeToParse of nodesToParse) {
            nodes.push(this.parseNode(nodeToParse, viewContainerRef, data));
        }
        const unusedNodes = [...nodes];
        const projectableNodes: Node[][] | undefined = definition.ngContentSelectors?.map(selector => {
            if (selector === '*') {
                return unusedNodes;
            }
            const foundNodes = nodes.filter(node => node.nodeName.toLowerCase() === selector);
            for (const foundNode of foundNodes) {
                const index = unusedNodes.indexOf(foundNode);
                if (index >= 0) {
                    unusedNodes.splice(index, 1);
                }
            }
            return foundNodes;
        });
        const componentRef = viewContainerRef.createComponent(definition.type, {
            projectableNodes
        });
        if (node instanceof Element) {
            for (const attribute of Array.from(node.attributes)) {
                const boundAttribute = /^\[(?<name>.*)]$/.exec(attribute.name);
                const attributeName = boundAttribute ? boundAttribute.groups?.['name'] ?? '' : attribute.name;
                const attributeValue = boundAttribute ? ObjectHelper.get(data, attribute.value) : attribute.value;
                let inputFound = false;
                if (definition.hostDirectives) {
                    for (const hostDirective of definition.hostDirectives) {
                        if (hostDirective.inputs[attributeName]) {
                            (componentRef.instance as any)[attributeName + 'Directive'][attributeName] = attributeValue;
                            inputFound = true;
                        }
                    }
                }
                if (!inputFound) {
                    (componentRef.instance as any)[attributeName] = attributeValue;
                }
            }
        }
        this.appendTo(componentRef.location.nativeElement, node);
        return componentRef.location.nativeElement;
    }

    private static appendTo(target: Node, node: Node): void {
        if (target.nextSibling) {
            target.parentNode?.insertBefore(node, target.nextSibling);
        } else {
            target.parentNode?.appendChild(node);
        }
    }
}

import { MarkdownElement } from './markdown-element';

export interface MarkdownCustomElement extends MarkdownElement {
    type: 'custom-element';
    isBlock: true;
    code: string | undefined;
    data: Record<string, unknown> | undefined;
}

export const markdownCustomElementType = 'custom-element';
export const isMarkdownCustomElement = (element: MarkdownElement): element is MarkdownCustomElement => element?.type === markdownCustomElementType;

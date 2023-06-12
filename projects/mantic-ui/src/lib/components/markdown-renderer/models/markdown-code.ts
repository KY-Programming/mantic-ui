import { MarkdownElement } from './markdown-element';

export interface MarkdownCode extends MarkdownElement {
    type: 'code';
    code: string | undefined;
}

export const markdownCodeType = 'code';
export const isMarkdownCode = (element: MarkdownElement): element is MarkdownCode => element?.type === markdownCodeType;

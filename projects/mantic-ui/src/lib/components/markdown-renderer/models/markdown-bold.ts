import { MarkdownElement } from './markdown-element';

export interface MarkdownBold extends MarkdownElement {
    type: 'bold';
    elements: MarkdownElement[];
}

export const markdownBoldType = 'bold';
export const isMarkdownBold = (element: MarkdownElement): element is MarkdownBold => element.type === markdownBoldType;

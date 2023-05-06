import { MarkdownElement } from './markdown-element';

export interface MarkdownItalic extends MarkdownElement {
    type: 'italic';
    elements: MarkdownElement[];
}

export const markdownItalicType = 'italic';
export const isMarkdownItalic = (element: MarkdownElement): element is MarkdownItalic => element.type === markdownItalicType;

import { MarkdownElement } from './markdown-element';

export interface MarkdownEmpty extends MarkdownElement {
    type: 'empty';
}

export const markdownEmptyType = 'empty';
export const isMarkdownElement = (element: MarkdownElement): element is MarkdownEmpty => element.type === markdownEmptyType;

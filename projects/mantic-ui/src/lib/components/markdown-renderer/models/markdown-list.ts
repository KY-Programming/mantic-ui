import { MarkdownElement } from './markdown-element';

export interface MarkdownList extends MarkdownElement {
    type: 'list';
    style: 'unordered';
    level: number;
    items: MarkdownListItem[];
}

export interface MarkdownListItem extends MarkdownElement {
    type: 'list-item';
    elements: MarkdownElement[];
}

export const markdownListType = 'list';
export const isMarkdownList = (element: MarkdownElement): element is MarkdownList => element?.type === markdownListType;

import { MarkdownElement } from './markdown-element';

export interface MarkdownLink extends MarkdownElement {
    type: 'link';
    elements: MarkdownElement[];
    url: string;
}

export const markdownLinkType = 'link';
export const isMarkdownLink = (element: MarkdownElement): element is MarkdownLink => element.type === markdownLinkType;

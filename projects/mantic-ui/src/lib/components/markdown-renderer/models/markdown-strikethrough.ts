import { MarkdownElement } from './markdown-element';

export interface MarkdownStrikethrough extends MarkdownElement {
    type: 'strikethrough';
    elements: MarkdownElement[];
}

export const markdownStrikethroughType = 'strikethrough';
export const isMarkdownStrikethrough = (element: MarkdownElement): element is MarkdownStrikethrough => element?.type === markdownStrikethroughType;

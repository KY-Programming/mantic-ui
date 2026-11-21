import { MarkdownElement } from './markdown-element';

export interface MarkdownSeparator extends MarkdownElement {
    type: 'separator';
    isBlock: true;
}

export const markdownSeparatorType = 'separator';
export const isMarkdownSeparator = (element: MarkdownElement): element is MarkdownSeparator => element.type === markdownSeparatorType;

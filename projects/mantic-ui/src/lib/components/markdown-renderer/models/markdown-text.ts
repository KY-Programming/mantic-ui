import { MarkdownElement } from './markdown-element';

export interface MarkdownText extends MarkdownElement {
    type: 'text';
    text: string;
}

export const markdownTextType = 'text';
export const isMarkdownText = (element: MarkdownElement): element is MarkdownText => element?.type === markdownTextType;

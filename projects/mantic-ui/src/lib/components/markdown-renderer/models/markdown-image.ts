import { MarkdownElement } from './markdown-element';

export interface MarkdownImage extends MarkdownElement {
    type: 'image';
    alt: string;
    url: string;
}

export const markdownImageType = 'image';
export const isMarkdownImage = (element: MarkdownElement): element is MarkdownImage => element.type === markdownImageType;

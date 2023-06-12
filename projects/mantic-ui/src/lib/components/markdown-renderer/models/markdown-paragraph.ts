import { MarkdownElement } from './markdown-element';

export interface MarkdownParagraph extends MarkdownElement {
    type: 'paragraph';
    elements: MarkdownElement[];
    isBlock: true;
}

export const markdownParagraphType = 'paragraph';
export const isMarkdownParagraph = (element: MarkdownElement): element is MarkdownParagraph => element?.type === markdownParagraphType;

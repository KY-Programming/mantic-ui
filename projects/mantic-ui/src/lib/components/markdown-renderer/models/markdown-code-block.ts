import { MarkdownElement } from './markdown-element';

export interface MarkdownCodeBlock extends MarkdownElement {
    type: 'code-block';
    language: string | undefined;
    code: string | undefined;
    isBlock: true;
}

export const markdownCodeBlockType = 'code-block';
export const isMarkdownCodeBlock = (element: MarkdownElement): element is MarkdownCodeBlock => element.type === markdownCodeBlockType;

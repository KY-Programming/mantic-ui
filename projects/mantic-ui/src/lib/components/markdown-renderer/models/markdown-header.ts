import { MarkdownElement } from './markdown-element';

export interface MarkdownHeader1 extends MarkdownElement {
    type: 'header1';
    elements: MarkdownElement[];
    isBlock: true;
}

export const markdownHeader1Type = 'header1';
export const isMarkdownHeader1 = (element: MarkdownElement): element is MarkdownHeader1 => element?.type === markdownHeader1Type;

export interface MarkdownHeader2 extends MarkdownElement {
    type: 'header2';
    elements: MarkdownElement[];
    isBlock: true;
}

export const markdownHeader2Type = 'header2';
export const isMarkdownHeader2 = (element: MarkdownElement): element is MarkdownHeader2 => element?.type === markdownHeader2Type;

export interface MarkdownHeader3 extends MarkdownElement {
    type: 'header3';
    elements: MarkdownElement[];
    isBlock: true;
}

export const markdownHeader3Type = 'header3';
export const isMarkdownHeader3 = (element: MarkdownElement): element is MarkdownHeader3 => element?.type === markdownHeader3Type;

export interface MarkdownHeader4 extends MarkdownElement {
    type: 'header4';
    elements: MarkdownElement[];
    isBlock: true;
}

export const markdownHeader4Type = 'header4';
export const isMarkdownHeader4 = (element: MarkdownElement): element is MarkdownHeader4 => element?.type === markdownHeader4Type;

export interface MarkdownHeader5 extends MarkdownElement {
    type: 'header5';
    elements: MarkdownElement[];
    isBlock: true;
}

export const markdownHeader5Type = 'header5';
export const isMarkdownHeader5 = (element: MarkdownElement): element is MarkdownHeader5 => element?.type === markdownHeader5Type;

export interface MarkdownHeader6 extends MarkdownElement {
    type: 'header6';
    elements: MarkdownElement[];
    isBlock: true;
}

export const markdownHeader6Type = 'header6';
export const isMarkdownHeader6 = (element: MarkdownElement): element is MarkdownHeader6 => element?.type === markdownHeader6Type;

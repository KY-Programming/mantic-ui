import { MarkdownElement } from './markdown-element';

export interface MarkdownBlockParser {
    regex: RegExp;
    factory: (result: RegExpExecArray) => MarkdownElement;
}

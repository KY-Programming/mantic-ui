import { MarkdownElement } from './markdown-element';

export interface MarkdownInlineParser {
    regex: RegExp;
    factory: (result: RegExpExecArray) => MarkdownElement[];
}

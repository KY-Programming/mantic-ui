import { MarkdownElement } from './markdown-element';

export interface MarkdownBlockParser {
    regex: RegExp;
    factory: (result: RegExpExecArray, data: Record<string, unknown>, previous: MarkdownElement) => MarkdownElement | undefined;
}

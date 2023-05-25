import { Injectable, Type } from '@angular/core';
import { MarkdownBlockParser } from './models/markdown-block-parser';
import { MarkdownInlineParser } from './models/markdown-inline-parser';
import { MarkdownHeader1, markdownHeader1Type, MarkdownHeader2, markdownHeader2Type, MarkdownHeader3, markdownHeader3Type, MarkdownHeader4, markdownHeader4Type, MarkdownHeader5, markdownHeader5Type, MarkdownHeader6, markdownHeader6Type } from './models/markdown-header';
import { MarkdownCodeBlock, markdownCodeBlockType } from './models/markdown-code-block';
import { MarkdownSeparator, markdownSeparatorType } from './models/markdown-separator';
import { MarkdownElement } from './models/markdown-element';
import { cast } from '../../helpers/cast';
import { MarkdownCode, markdownCodeType } from './models/markdown-code';
import { MarkdownImage, markdownImageType } from './models/markdown-image';
import { MarkdownLink, markdownLinkType } from './models/markdown-link';
import { MarkdownItalic, markdownItalicType } from './models/markdown-italic';
import { MarkdownBold, markdownBoldType } from './models/markdown-bold';
import { MarkdownStrikethrough, markdownStrikethroughType } from './models/markdown-strikethrough';
import { MarkdownParagraph } from './models/markdown-paragraph';
import { MarkdownText, markdownTextType } from './models/markdown-text';
import { MarkdownCustomElement, markdownCustomElementType } from './models/markdown-custom-element';
import { MarkdownEmpty, markdownEmptyType } from './models/markdown-empty';
import { ComponentParser } from '../dynamic-component/component-parser';

@Injectable({
    providedIn: 'root'
})
export class MarkdownParser {
    private readonly blockParsers: MarkdownBlockParser[] = [];
    private readonly inlineParsers: MarkdownInlineParser[] = [];

    public constructor() {
        this.registerBlockParser({
            regex: /^\s*#(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader1 => ({
                type: markdownHeader1Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*#{2}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader2 => ({
                type: markdownHeader2Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*#{3}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader3 => ({
                type: markdownHeader3Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*#{4}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader4 => ({
                type: markdownHeader4Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*#{5}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader5 => ({
                type: markdownHeader5Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*#{6}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader6 => ({
                type: markdownHeader6Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*`{3}(?<language>.*?)\r?\n(?<code>.*?)`{3}$/g,
            factory: (result: RegExpExecArray): MarkdownCodeBlock => ({
                type: markdownCodeBlockType,
                language: result.groups?.['language'],
                code: result.groups?.['code'],
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*-{3}\s*$/,
            factory: (): MarkdownSeparator => ({
                type: markdownSeparatorType,
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*(?<code><([^>]+)(.+?)<\/\2>)\s*$/g,
            factory: (result: RegExpExecArray, data?: Record<string, unknown>): MarkdownCustomElement => ({
                type: markdownCustomElementType,
                code: result.groups?.['code'],
                data,
                isBlock: true
            })
        });
        this.registerBlockParser({
            regex: /^\s*<m-json(.+?)<\/m-json>\s*$/g,
            factory: (): MarkdownEmpty => ({
                type: markdownEmptyType
            })
        });

        this.registerInlineParser({
            regex: /`(?<code>[^`].*?)`(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownCode>({
                    type: markdownCodeType,
                    code: result.groups?.['code']
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        });
        this.registerInlineParser({
            regex: /!\[(?<alt>.*)]\((?<url>.*)\)(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownImage>({
                    type: markdownImageType,
                    url: result.groups?.['url'] ?? '',
                    alt: result.groups?.['alt'] ?? ''
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        });
        this.registerInlineParser({
            regex: /\[(?<inline>.*)]\((?<url>.*)\)(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownLink>({
                    type: markdownLinkType,
                    url: result.groups?.['url'] ?? '',
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        });
        this.registerInlineParser({
            regex: /\*(?<inline>.*?)\*(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownItalic>({
                    type: markdownItalicType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        });
        this.registerInlineParser({
            regex: /_(?<inline>.*?)_(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownItalic>({
                    type: markdownItalicType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        });
        this.registerInlineParser({
            regex: /\*\*(?<inline>.*?)\*\*(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownBold>({
                    type: markdownBoldType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        });
        this.registerInlineParser({
            regex: /__(?<inline>.*?)__(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownBold>({
                    type: markdownBoldType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        });
        this.registerInlineParser({
            regex: /~~(?<inline>.*?)~~(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownStrikethrough>({
                    type: markdownStrikethroughType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        });

    }

    public registerBlockParser(parser: MarkdownBlockParser): void {
        this.blockParsers.push(parser);
    }

    public registerInlineParser(parser: MarkdownInlineParser): void {
        this.inlineParsers.push(parser);
    }

    public registerComponent(component: Type<unknown>): void {
        ComponentParser.register(component);
    }

    public parse(value: string): MarkdownElement[] {
        const data = this.parseData(value);
        if (value.includes('\n\n')) {
            const elements: MarkdownElement[] = [];
            const paragraphs = value.split('\n\n');
            for (const paragraph of paragraphs) {
                elements.push(cast<MarkdownParagraph>({
                    type: 'paragraph',
                    elements: this.parseBlock(paragraph, data),
                    isBlock: true
                }));
            }
            return elements;
        }
        return this.parseBlock(value, data);
    }

    private parseData(value: string): Record<string, unknown> {
        const data: Record<string, unknown> = {};
        const regex = /<m-json>(?<json>.*?)<\/m-json> *\r?\n?/gm;
        let match = regex.exec(value);
        while (match) {
            Object.assign(data, JSON.parse(match.groups?.['json'] ?? '{}'));
            match = regex.exec(value);
        }
        return data;
    }

    private parseBlock(text: string, data: Record<string, unknown>): MarkdownElement[] {
        const lines = text.split('\n');
        const elements: MarkdownElement[] = [];
        for (const line of lines) {
            let parsed = false;
            for (const parser of this.blockParsers) {
                const regexResult = parser.regex.exec(line);
                if (regexResult) {
                    elements.push(parser.factory(regexResult, data));
                    parsed = true;
                    break;
                }
            }
            if (!parsed) {
                elements.push(...this.parseInline(line));
            }
            elements[elements.length - 1].breakLine = true;
        }
        return elements;
    }

    private parseInline(text: string | undefined): MarkdownElement[] {
        if (!text) {
            return [];
        }
        const elements: MarkdownElement[] = [];
        let firstResult: RegExpExecArray | undefined;
        let firstParser: MarkdownInlineParser | undefined;
        for (const parser of this.inlineParsers) {
            const regexResult = parser.regex.exec(text);
            if (regexResult && (!firstResult || regexResult.index <= firstResult.index)) {
                firstResult = regexResult;
                firstParser = parser;
            }
        }
        if (firstResult && firstParser) {
            elements.push(...firstParser.factory(firstResult));
        } else {
            elements.push(cast<MarkdownText>({ type: markdownTextType, text }));
        }
        return elements;
    }
}

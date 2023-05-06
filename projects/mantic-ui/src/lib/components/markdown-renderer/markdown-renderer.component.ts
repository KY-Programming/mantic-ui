import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isMarkdownHeader1, isMarkdownHeader2, isMarkdownHeader3, isMarkdownHeader4, isMarkdownHeader5, isMarkdownHeader6, MarkdownHeader1, markdownHeader1Type, MarkdownHeader2, markdownHeader2Type, MarkdownHeader3, markdownHeader3Type, MarkdownHeader4, markdownHeader4Type, MarkdownHeader5, markdownHeader5Type, MarkdownHeader6, markdownHeader6Type } from './models/markdown-header';
import { isMarkdownLink, MarkdownLink, markdownLinkType } from './models/markdown-link';
import { isMarkdownParagraph, MarkdownParagraph, markdownParagraphType } from './models/markdown-paragraph';
import { MarkdownElement } from './models/markdown-element';
import { isMarkdownText, MarkdownText, markdownTextType } from './models/markdown-text';
import { isMarkdownItalic, MarkdownItalic, markdownItalicType } from './models/markdown-italic';
import { isMarkdownBold, MarkdownBold, markdownBoldType } from './models/markdown-bold';
import { MarkdownBlockParser } from './models/markdown-block-parser';
import { MarkdownInlineParser } from './models/markdown-inline-parser';
import { cast } from '../../helpers/cast';
import { isMarkdownImage, MarkdownImage, markdownImageType } from './models/markdown-image';
import { isMarkdownStrikethrough, MarkdownStrikethrough, markdownStrikethroughType } from './models/markdown-strikethrough';
import { isMarkdownCodeBlock, MarkdownCodeBlock, markdownCodeBlockType } from './models/markdown-code-block';
import { isMarkdownCode, MarkdownCode, markdownCodeType } from './models/markdown-code';
import { MarkdownSeparator, markdownSeparatorType } from './models/markdown-separator';

@Component({
    selector: 'm-markdown-renderer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './markdown-renderer.component.html',
    styleUrls: ['./markdown-renderer.component.scss']
})
export class MarkdownRendererComponent {
    private rawValue = '';
    private readonly blockParsers: MarkdownBlockParser[] = [
        {
            regex: /^\s*#(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader1 => ({
                type: markdownHeader1Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        }, {
            regex: /^\s*#{2}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader2 => ({
                type: markdownHeader2Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        }, {
            regex: /^\s*#{3}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader3 => ({
                type: markdownHeader3Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        }, {
            regex: /^\s*#{4}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader4 => ({
                type: markdownHeader4Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        }, {
            regex: /^\s*#{5}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader5 => ({
                type: markdownHeader5Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        }, {
            regex: /^\s*#{6}(?<inline>[^#].*)$/,
            factory: (result: RegExpExecArray): MarkdownHeader6 => ({
                type: markdownHeader6Type,
                elements: this.parseInline(result.groups?.['inline']?.trim()),
                isBlock: true
            })
        }, {
            regex: /^\s*`{3}(?<language>.*?)\r?\n(?<code>.*?)`{3}$/g,
            factory: (result: RegExpExecArray): MarkdownCodeBlock => ({
                type: markdownCodeBlockType,
                language: result.groups?.['language'],
                code: result.groups?.['code'],
                isBlock: true
            })
        }, {
            regex: /^\s*-{3}\s*$/,
            factory: (): MarkdownSeparator => ({
                type: markdownSeparatorType,
                isBlock: true
            })
        }
    ];

    private readonly inlineParsers: MarkdownInlineParser[] = [
        {
            regex: /`(?<code>[^`].*?)`(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownCode>({
                    type: markdownCodeType,
                    code: result.groups?.['code']
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        }, {
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
        }, {
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
        }, {
            regex: /\*(?<inline>.*?)\*(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownItalic>({
                    type: markdownItalicType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        }, {
            regex: /_(?<inline>.*?)_(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownItalic>({
                    type: markdownItalicType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        }, {
            regex: /\*\*(?<inline>.*?)\*\*(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownBold>({
                    type: markdownBoldType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        }, {
            regex: /__(?<inline>.*?)__(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownBold>({
                    type: markdownBoldType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        }, {
            regex: /~~(?<inline>.*?)~~(?<post>.*)/,
            factory: (result: RegExpExecArray): MarkdownElement[] => [
                ...this.parseInline(result.input.substring(0, result.index)),
                cast<MarkdownStrikethrough>({
                    type: markdownStrikethroughType,
                    elements: this.parseInline(result.groups?.['inline'])
                }),
                ...this.parseInline(result.groups?.['post'])
            ]
        }
    ];
    protected readonly elements: MarkdownElement[] = [];
    protected readonly markdownParagraphType = markdownParagraphType;
    protected readonly markdownHeader1Type = markdownHeader1Type;
    protected readonly markdownHeader2Type = markdownHeader2Type;
    protected readonly markdownHeader3Type = markdownHeader3Type;
    protected readonly markdownHeader4Type = markdownHeader4Type;
    protected readonly markdownHeader5Type = markdownHeader5Type;
    protected readonly markdownHeader6Type = markdownHeader6Type;
    protected readonly markdownCodeBlockType = markdownCodeBlockType;
    protected readonly markdownSeparatorType = markdownSeparatorType;
    protected readonly markdownCodeType = markdownCodeType;
    protected readonly markdownImageType = markdownImageType;
    protected readonly markdownLinkType = markdownLinkType;
    protected readonly markdownItalicType = markdownItalicType;
    protected readonly markdownBoldType = markdownBoldType;
    protected readonly markdownStrikethroughType = markdownStrikethroughType;
    protected readonly markdownTextType = markdownTextType;

    @Input()
    public get value(): string {
        return this.rawValue;
    }

    public set value(value: string | undefined) {
        this.rawValue = value ?? '';
        this.elements.length = 0;
        if (!value) {
            return;
        }
        this.parse();
    }

    private parse(): void {
        if (this.value.includes('\n\n')) {
            const paragraphs = this.value.split('\n\n');
            for (const paragraph of paragraphs) {
                this.elements.push(cast<MarkdownParagraph>({
                    type: 'paragraph',
                    elements: this.parseBlock(paragraph),
                    isBlock: true
                }));
            }
        } else {
            this.parseBlock(this.value);
        }
    }

    private parseBlock(text: string): MarkdownElement[] {
        const lines = text.split('\n');
        const elements: MarkdownElement[] = [];
        for (const line of lines) {
            let parsed = false;
            for (const parser of this.blockParsers) {
                const regexResult = parser.regex.exec(line);
                if (regexResult) {
                    elements.push(parser.factory(regexResult));
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

    protected $elements(elements: []): MarkdownElement[] {
        return elements;
    }

    protected $paragraph(element: MarkdownElement): MarkdownParagraph | undefined {
        return isMarkdownParagraph(element) ? element : undefined;
    }

    protected $header1(element: MarkdownElement): MarkdownHeader1 | undefined {
        return isMarkdownHeader1(element) ? element : undefined;
    }

    protected $header2(element: MarkdownElement): MarkdownHeader2 | undefined {
        return isMarkdownHeader2(element) ? element : undefined;
    }

    protected $header3(element: MarkdownElement): MarkdownHeader3 | undefined {
        return isMarkdownHeader3(element) ? element : undefined;
    }

    protected $header4(element: MarkdownElement): MarkdownHeader4 | undefined {
        return isMarkdownHeader4(element) ? element : undefined;
    }

    protected $header5(element: MarkdownElement): MarkdownHeader5 | undefined {
        return isMarkdownHeader5(element) ? element : undefined;
    }

    protected $header6(element: MarkdownElement): MarkdownHeader6 | undefined {
        return isMarkdownHeader6(element) ? element : undefined;
    }

    protected $codeBlock(element: MarkdownElement): MarkdownCodeBlock | undefined {
        return isMarkdownCodeBlock(element) ? element : undefined;
    }

    protected $code(element: MarkdownElement): MarkdownCode | undefined {
        return isMarkdownCode(element) ? element : undefined;
    }

    protected $image(element: MarkdownElement): MarkdownImage | undefined {
        return isMarkdownImage(element) ? element : undefined;
    }

    protected $link(element: MarkdownElement): MarkdownLink | undefined {
        return isMarkdownLink(element) ? element : undefined;
    }

    protected $italic(element: MarkdownElement): MarkdownItalic | undefined {
        return isMarkdownItalic(element) ? element : undefined;
    }

    protected $bold(element: MarkdownElement): MarkdownBold | undefined {
        return isMarkdownBold(element) ? element : undefined;
    }

    protected $strikethrough(element: MarkdownElement): MarkdownStrikethrough | undefined {
        return isMarkdownStrikethrough(element) ? element : undefined;
    }

    protected $text(element: MarkdownElement): MarkdownText | undefined {
        return isMarkdownText(element) ? element : undefined;
    }
}

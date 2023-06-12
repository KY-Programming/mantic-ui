import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isMarkdownHeader1, isMarkdownHeader2, isMarkdownHeader3, isMarkdownHeader4, isMarkdownHeader5, isMarkdownHeader6, MarkdownHeader1, markdownHeader1Type, MarkdownHeader2, markdownHeader2Type, MarkdownHeader3, markdownHeader3Type, MarkdownHeader4, markdownHeader4Type, MarkdownHeader5, markdownHeader5Type, MarkdownHeader6, markdownHeader6Type } from './models/markdown-header';
import { isMarkdownLink, MarkdownLink, markdownLinkType } from './models/markdown-link';
import { isMarkdownParagraph, MarkdownParagraph, markdownParagraphType } from './models/markdown-paragraph';
import { MarkdownElement } from './models/markdown-element';
import { isMarkdownText, MarkdownText, markdownTextType } from './models/markdown-text';
import { isMarkdownItalic, MarkdownItalic, markdownItalicType } from './models/markdown-italic';
import { isMarkdownBold, MarkdownBold, markdownBoldType } from './models/markdown-bold';
import { isMarkdownImage, MarkdownImage, markdownImageType } from './models/markdown-image';
import { isMarkdownStrikethrough, MarkdownStrikethrough, markdownStrikethroughType } from './models/markdown-strikethrough';
import { isMarkdownCodeBlock, MarkdownCodeBlock, markdownCodeBlockType } from './models/markdown-code-block';
import { isMarkdownCode, MarkdownCode, markdownCodeType } from './models/markdown-code';
import { markdownSeparatorType } from './models/markdown-separator';
import { MarkdownParser } from './markdown-parser';
import { isMarkdownCustomElement, MarkdownCustomElement, markdownCustomElementType } from './models/markdown-custom-element';
import { markdownEmptyType } from './models/markdown-empty';
import { DynamicComponentComponent } from '../dynamic-component/dynamic-component.component';
import { isMarkdownList, MarkdownList, markdownListType } from './models/markdown-list';

@Component({
    selector: 'm-markdown-renderer',
    standalone: true,
    imports: [CommonModule, DynamicComponentComponent],
    templateUrl: './markdown-renderer.component.html',
    styleUrls: ['./markdown-renderer.component.scss']
})
export class MarkdownRendererComponent {
    private readonly parser = inject(MarkdownParser);
    private rawValue = '';
    protected elements: MarkdownElement[] = [];
    protected readonly markdownParagraphType = markdownParagraphType;
    protected readonly markdownHeader1Type = markdownHeader1Type;
    protected readonly markdownHeader2Type = markdownHeader2Type;
    protected readonly markdownHeader3Type = markdownHeader3Type;
    protected readonly markdownHeader4Type = markdownHeader4Type;
    protected readonly markdownHeader5Type = markdownHeader5Type;
    protected readonly markdownHeader6Type = markdownHeader6Type;
    protected readonly markdownCodeBlockType = markdownCodeBlockType;
    protected readonly markdownSeparatorType = markdownSeparatorType;
    protected readonly markdownCustomElementType = markdownCustomElementType;
    protected readonly markdownCodeType = markdownCodeType;
    protected readonly markdownImageType = markdownImageType;
    protected readonly markdownLinkType = markdownLinkType;
    protected readonly markdownItalicType = markdownItalicType;
    protected readonly markdownBoldType = markdownBoldType;
    protected readonly markdownStrikethroughType = markdownStrikethroughType;
    protected readonly markdownTextType = markdownTextType;
    protected readonly markdownEmptyType = markdownEmptyType;
    protected readonly markdownListType = markdownListType;

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
        this.elements = this.parser.parse(value);
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

    protected $customElement(element: MarkdownElement): MarkdownCustomElement | undefined {
        return isMarkdownCustomElement(element) ? element : undefined;
    }

    protected $code(element: MarkdownElement): MarkdownCode | undefined {
        return isMarkdownCode(element) ? element : undefined;
    }

    protected $list(element: MarkdownElement): MarkdownList | undefined {
        return isMarkdownList(element) ? element : undefined;
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

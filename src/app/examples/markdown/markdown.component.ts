import { Component } from '@angular/core';

@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss']
})
export class MarkdownExampleComponent {
    protected readonly example1 = `# My Markdown Document

## Introduction

Welcome to my Markdown document! In this document, I will demonstrate various formatting options available in Markdown.

## Text Formatting

You can make text *italic* by surrounding it with single asterisks or underscores. For example, \`*italic*\` or \`_italic_\` will appear as *italic*.

To make text **bold**, you can use double asterisks or underscores. For example, \`**bold**\` or \`__bold__\` will appear as **bold**.

If you want to strike through some text, you can use double tildes. For example, \`~~strikethrough~~\` will appear as ~~strikethrough~~.

## Lists

Markdown supports both ordered and unordered lists.

### Unordered List

You can create an unordered list using asterisks, plus signs, or hyphens:

- Item 1
- Item 2
- Item 3

### Ordered List

To create an ordered list, simply use numbers followed by periods:

1. First item
2. Second item
3. Third item

## Links and Images

You can create links by enclosing the link text in square brackets and the URL in parentheses:

[Visit KY-Programming's website](https://ky-programming.de)

To insert an image, use an exclamation mark followed by square brackets for alt text and parentheses for the image URL:

![KY-Programming Logo](https://ky-programming.de/de/assets/images/logos/32xProgramming.png)

## Code Blocks

You can create a code block by wrapping the code in triple backticks:

\`\`\`python
    def greet():
        print("Hello, Markdown!")
\`\`\`

## Conclusion

That's it for this Markdown document! I hope you found it informative and helpful. Markdown is a simple and versatile formatting language for creating rich-text documents.

---

Happy Markdowning!`;
}

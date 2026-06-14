#!/usr/bin/env node
// @ts-check
/**
 * mantic-sync-examples
 *
 * Keeps the `code` strings shown by `<m-example-code [code]="…">` in sync with the
 * live example markup written next to them.
 *
 * For every `<m-example>` in an `.html` template that contains exactly one
 * `<m-example-code [code]="someField">` child, the script takes everything inside the
 * `<m-example>` *except* the `<m-example-code>` element, normalises its indentation and
 * writes it into the `someField` template literal of the component `.ts` file that owns
 * the template.
 *
 * Usage:
 *   mantic-sync-examples [options] [path]
 *
 *   path            A single `.html` file, a directory (searched recursively) or omitted
 *                   (defaults to the current working directory — the whole project).
 *
 * Options:
 *   --check         Do not write. Exit with code 1 if any field is out of date (CI mode).
 *   --dry-run       Print what would change without writing.
 *   -v, --verbose   Log every example, including unchanged and skipped ones.
 *   -q, --quiet     Only print warnings and the final summary.
 *   -h, --help      Show this help.
 *
 * Zero runtime dependencies (Node built-ins only) so it runs straight from the published
 * package via `npx mantic-sync-examples`.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, basename, extname, sep } from 'node:path';
import process from 'node:process';

const IGNORED_DIRS = new Set(['node_modules', 'dist', 'out-tsc', '.git', '.angular', 'coverage']);

/** @typedef {{ tsFile: string; field: string; code: string; htmlFile: string; conflict?: boolean }} Edit */

function printHelp() {
    const text = `
mantic-sync-examples — sync <m-example-code [code]> fields from <m-example> markup

Usage:
  mantic-sync-examples [options] [path]

  path            A .html file, a directory (searched recursively) or omitted
                  (defaults to the current directory — the whole project).

Options:
  --check         Do not write. Exit 1 if any field is out of date (CI mode).
  --dry-run       Print what would change without writing.
  -v, --verbose   Log every example, including unchanged and skipped ones.
  -q, --quiet     Only print warnings and the final summary.
  -h, --help      Show this help.
`;
    process.stdout.write(text.trimStart() + '\n');
}

// --------------------------------------------------------------------------------------
// Argument parsing
// --------------------------------------------------------------------------------------

function parseArgs(argv) {
    const options = { check: false, dryRun: false, verbose: false, quiet: false, help: false };
    const positionals = [];
    for (const arg of argv) {
        switch (arg) {
            case '--check': options.check = true; break;
            case '--dry-run': options.dryRun = true; break;
            case '-v': case '--verbose': options.verbose = true; break;
            case '-q': case '--quiet': options.quiet = true; break;
            case '-h': case '--help': options.help = true; break;
            default:
                if (arg.startsWith('-')) {
                    throw new UsageError(`Unknown option: ${arg}`);
                }
                positionals.push(arg);
        }
    }
    if (positionals.length > 1) {
        throw new UsageError('Expected at most one path argument.');
    }
    return { options, path: positionals[0] };
}

class UsageError extends Error {}

// --------------------------------------------------------------------------------------
// File discovery
// --------------------------------------------------------------------------------------

/** Resolve the target path argument into a list of `.html` files. */
function collectHtmlFiles(targetPath) {
    const root = resolve(targetPath ?? process.cwd());
    if (!existsSync(root)) {
        throw new UsageError(`Path does not exist: ${root}`);
    }
    const stats = statSync(root);
    if (stats.isFile()) {
        if (extname(root).toLowerCase() !== '.html') {
            throw new UsageError(`Not an .html file: ${root}`);
        }
        return [root];
    }
    const files = [];
    walkForHtml(root, files);
    files.sort();
    return files;
}

function walkForHtml(dir, out) {
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    }
    catch {
        return;
    }
    for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            if (!IGNORED_DIRS.has(entry.name)) {
                walkForHtml(full, out);
            }
        }
        else if (entry.isFile() && extname(entry.name).toLowerCase() === '.html') {
            out.push(full);
        }
    }
}

// --------------------------------------------------------------------------------------
// Lightweight tag scanning
//
// Angular templates are not valid HTML (custom elements, [bindings], (events), @control
// flow, self-closing custom tags), so a real HTML parser would mis-handle them. Instead we
// scan at the tag level: enough to find <m-example> blocks, their <m-example-code> children
// and the open-tag attributes — while respecting quotes and HTML comments.
// --------------------------------------------------------------------------------------

const WHITESPACE = new Set([' ', '\t', '\n', '\r', '\f']);

/** True if `ch` ends a tag name (so `<m-example` is not matched inside `<m-example-code`). */
function isTagBoundary(ch) {
    return ch === undefined || ch === '>' || ch === '/' || WHITESPACE.has(ch);
}

function matchesTagOpen(text, index, tagName) {
    if (text[index] !== '<') {
        return false;
    }
    if (!text.startsWith(tagName, index + 1)) {
        return false;
    }
    return isTagBoundary(text[index + 1 + tagName.length]);
}

function matchesTagClose(text, index, tagName) {
    if (text[index] !== '<' || text[index + 1] !== '/') {
        return false;
    }
    if (!text.startsWith(tagName, index + 2)) {
        return false;
    }
    return isTagBoundary(text[index + 2 + tagName.length]);
}

/**
 * Scan an open tag starting at `index` (which points at `<`). Returns the index of its
 * closing `>` and whether it is self-closing. Respects single/double quoted attribute
 * values so a `>` inside an expression like `[x]="a > b"` does not end the tag.
 */
function scanOpenTag(text, index) {
    let i = index + 1;
    let quote;
    for (; i < text.length; i++) {
        const ch = text[i];
        if (quote) {
            if (ch === quote) {
                quote = undefined;
            }
            continue;
        }
        if (ch === '"' || ch === '\'') {
            quote = ch;
        }
        else if (ch === '>') {
            const selfClosing = text[i - 1] === '/';
            return { openTagEnd: i, selfClosing };
        }
    }
    return undefined; // malformed / unterminated tag
}

/**
 * Given an open tag for `tagName` (its `<` at `start`, its `>` at `openTagEnd`), return the
 * index just past the element (after `</tagName>`), handling nesting of the same tag. For a
 * self-closing tag the element ends right after `openTagEnd`.
 */
function findElementEnd(text, openTagEnd, tagName, selfClosing) {
    if (selfClosing) {
        return openTagEnd + 1;
    }
    let depth = 1;
    let i = openTagEnd + 1;
    while (i < text.length) {
        if (text.startsWith('<!--', i)) {
            const end = text.indexOf('-->', i + 4);
            i = end === -1 ? text.length : end + 3;
            continue;
        }
        if (matchesTagOpen(text, i, tagName)) {
            const open = scanOpenTag(text, i);
            if (!open) {
                return text.length;
            }
            if (!open.selfClosing) {
                depth++;
            }
            i = open.openTagEnd + 1;
            continue;
        }
        if (matchesTagClose(text, i, tagName)) {
            const close = text.indexOf('>', i);
            const closeEnd = close === -1 ? text.length : close + 1;
            depth--;
            if (depth === 0) {
                return closeEnd;
            }
            i = closeEnd;
            continue;
        }
        i++;
    }
    return text.length;
}

/** Find every `<m-example>…</m-example>` block (ignoring HTML comments). */
function findExampleBlocks(html) {
    const blocks = [];
    let i = 0;
    while (i < html.length) {
        if (html.startsWith('<!--', i)) {
            const end = html.indexOf('-->', i + 4);
            i = end === -1 ? html.length : end + 3;
            continue;
        }
        if (matchesTagOpen(html, i, 'm-example')) {
            const open = scanOpenTag(html, i);
            if (!open) {
                break;
            }
            if (open.selfClosing) {
                i = open.openTagEnd + 1;
                continue;
            }
            const contentStart = open.openTagEnd + 1;
            const elementEnd = findElementEnd(html, open.openTagEnd, 'm-example', false);
            // contentEnd is the start of the closing </m-example> tag.
            const closeIndex = html.lastIndexOf('</m-example', elementEnd);
            const contentEnd = closeIndex > contentStart ? closeIndex : elementEnd;
            blocks.push({
                openTag: html.slice(i, open.openTagEnd + 1),
                contentStart,
                contentEnd,
                content: html.slice(contentStart, contentEnd)
            });
            i = elementEnd;
            continue;
        }
        i++;
    }
    return blocks;
}

/** Find every `<m-example-code …>` element inside a block's content. */
function findExampleCodeElements(content) {
    const elements = [];
    let i = 0;
    while (i < content.length) {
        if (content.startsWith('<!--', i)) {
            const end = content.indexOf('-->', i + 4);
            i = end === -1 ? content.length : end + 3;
            continue;
        }
        if (matchesTagOpen(content, i, 'm-example-code')) {
            const open = scanOpenTag(content, i);
            if (!open) {
                break;
            }
            const elementEnd = findElementEnd(content, open.openTagEnd, 'm-example-code', open.selfClosing);
            const openTagText = content.slice(i, open.openTagEnd + 1);
            elements.push({
                start: i,
                end: elementEnd,
                code: readAttribute(openTagText, 'code', true),
                languages: readAttribute(openTagText, 'languages', true)
            });
            i = elementEnd;
            continue;
        }
        i++;
    }
    return elements;
}

/**
 * Read an attribute value from an open-tag string. When `binding` is true, matches the
 * Angular property-binding form `[name]="…"` as well as the plain `name="…"` form.
 */
function readAttribute(openTagText, name, binding) {
    const names = binding ? [`\\[${name}\\]`, name] : [name];
    for (const attr of names) {
        const re = new RegExp(`(?:^|\\s)${attr}\\s*=\\s*("([^"]*)"|'([^']*)')`);
        const match = re.exec(openTagText);
        if (match) {
            return (match[2] ?? match[3] ?? '').trim();
        }
    }
    return undefined;
}

// --------------------------------------------------------------------------------------
// Code extraction
// --------------------------------------------------------------------------------------

const IDENTIFIER_RE = /^[A-Za-z_$][\w$]*$/;

/** Does a `[languages]` binding (e.g. `['ts']`) refer to html (or is it unset/default)? */
function languagesIncludeHtml(languages) {
    if (!languages) {
        return true;
    }
    const tokens = languages.match(/'[^']*'|"[^"]*"/g);
    if (!tokens) {
        return true; // could not parse — assume default (html)
    }
    return tokens.some(token => token.slice(1, -1).toLowerCase() === 'html');
}

/** Strip the common leading indentation from all lines, then trim blank edge lines. */
function dedent(text) {
    let lines = text.replace(/\r\n/g, '\n').split('\n');
    // Drop blank lines at the start and end.
    while (lines.length && lines[0].trim() === '') {
        lines.shift();
    }
    while (lines.length && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }
    if (lines.length === 0) {
        return '';
    }
    let minIndent = Infinity;
    for (const line of lines) {
        if (line.trim() === '') {
            continue;
        }
        const indent = line.length - line.trimStart().length;
        minIndent = Math.min(minIndent, indent);
    }
    if (!Number.isFinite(minIndent) || minIndent === 0) {
        return lines.join('\n');
    }
    return lines.map(line => line.slice(minIndent)).join('\n');
}

const TAG_NAME_CHAR = /[A-Za-z0-9-]/;

// Marker attributes (backed by empty directives in the doc package) that drive extraction.
const IGNORE_MARKER = 'm-doc-ignore';
const IGNORE_CONTENT_MARKER = 'm-doc-ignore-content';

/** Does an open-tag string carry the bare attribute `name` (e.g. `m-doc-ignore`)? */
function hasMarker(openTagText, name) {
    return new RegExp(`(?:^|\\s)${escapeRegExp(name)}(?=[\\s=>/])`).test(openTagText);
}

/** Remove a bare attribute (and its leading whitespace) from an open-tag string. */
function stripAttribute(openTagText, name) {
    const re = new RegExp(`\\s+${escapeRegExp(name)}(?:\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]*))?(?=[\\s/>])`, 'g');
    return openTagText.replace(re, '');
}

/** Rewrite an open tag (which still ends in `>` or `/>`) as a self-closing `<… />` tag. */
function toSelfClosing(openTagText) {
    let inner = openTagText.slice(1, -1); // drop '<' and the trailing '>'
    if (inner.endsWith('/')) {
        inner = inner.slice(0, -1); // was already self-closing
    }
    return '<' + inner.replace(/\s+$/, '') + ' />';
}

/**
 * Walk a block's inner content and collect the edits that produce the extracted code:
 *   - `m-doc-ignore`         → drop the element entirely
 *   - `m-doc-ignore-content` → keep the (self-closed) tag but drop its content
 *   - `<m-example-code>`     → drop the element entirely
 * Returns non-overlapping `{ start, end, replacement }` edits (outermost wins).
 */
function collectExtractionEdits(content) {
    const edits = [];
    let i = 0;
    while (i < content.length) {
        if (content.startsWith('<!--', i)) {
            const end = content.indexOf('-->', i + 4);
            i = end === -1 ? content.length : end + 3;
            continue;
        }
        if (content[i] === '<' && TAG_NAME_CHAR.test(content[i + 1] ?? '')) {
            let nameEnd = i + 1;
            while (nameEnd < content.length && TAG_NAME_CHAR.test(content[nameEnd])) {
                nameEnd++;
            }
            const tagName = content.slice(i + 1, nameEnd);
            const open = scanOpenTag(content, i);
            if (!open) {
                break;
            }
            const openTag = content.slice(i, open.openTagEnd + 1);
            const elementEnd = findElementEnd(content, open.openTagEnd, tagName, open.selfClosing);

            if (hasMarker(openTag, IGNORE_MARKER)) {
                edits.push({ start: i, end: elementEnd, replacement: '' });
                i = elementEnd;
            }
            else if (hasMarker(openTag, IGNORE_CONTENT_MARKER)) {
                edits.push({ start: i, end: elementEnd, replacement: toSelfClosing(stripAttribute(openTag, IGNORE_CONTENT_MARKER)) });
                i = elementEnd;
            }
            else if (tagName === 'm-example-code') {
                edits.push({ start: i, end: elementEnd, replacement: '' });
                i = elementEnd;
            }
            else {
                i = open.openTagEnd + 1; // descend so nested markers are still found
            }
            continue;
        }
        i++;
    }
    return edits;
}

/** Apply non-overlapping edits to `text` (right to left so indices stay valid). */
function applyEdits(text, edits) {
    let result = text;
    for (const { start, end, replacement } of [...edits].sort((a, b) => b.start - a.start)) {
        result = result.slice(0, start) + replacement + result.slice(end);
    }
    return result;
}

/**
 * Extract the live example code from a block's inner content: drop `<m-example-code>` and
 * `m-doc-ignore` elements, collapse `m-doc-ignore-content` elements, then normalise indentation.
 */
function extractLiveContent(content) {
    return dedent(applyEdits(content, collectExtractionEdits(content)));
}

/**
 * Resolve a single `<m-example>` block into the field name and the code that should be
 * written to it, or a reason it was skipped.
 *
 * Two mechanisms reference a field:
 *   1. `<m-example-code [code]="field">` as a child of the `<m-example>`.
 *   2. `[code]="field"` as an attribute on the `<m-example>` itself.
 * In both cases the code is everything inside the `<m-example>` except `<m-example-code>`
 * elements and elements marked `m-doc-ignore`. Mixing both mechanisms is ambiguous and skipped.
 *
 * @returns {{ field: string; code: string } | { skip: string } | undefined}
 */
function resolveBlock(block) {
    const codeElements = findExampleCodeElements(block.content);
    const withCode = codeElements.filter(element => element.code);
    const attrRaw = readAttribute(block.openTag, 'code', true);

    if (attrRaw && withCode.length > 0) {
        return { skip: `<m-example> has both a [code] attribute (${attrRaw}) and <m-example-code> child(ren) — ambiguous` };
    }

    let field;
    if (withCode.length > 0) {
        // 1. Child <m-example-code [code]> elements.
        if (withCode.length > 1) {
            return { skip: `multiple <m-example-code> with [code] (${withCode.map(element => element.code).join(', ')}) — ambiguous` };
        }
        const target = withCode[0];
        if (!IDENTIFIER_RE.test(target.code)) {
            return { skip: `[code]="${target.code}" is not a simple field name` };
        }
        if (!languagesIncludeHtml(target.languages)) {
            return { skip: `<m-example-code [code]="${target.code}"> targets a non-html language — left untouched` };
        }
        field = target.code;
    }
    else if (attrRaw) {
        // 2. [code] attribute directly on <m-example>.
        if (!IDENTIFIER_RE.test(attrRaw)) {
            return { skip: `[code]="${attrRaw}" is not a simple field name` };
        }
        field = attrRaw;
    }
    else {
        return undefined; // not a target — nothing to sync
    }

    const code = extractLiveContent(block.content);
    if (code === '') {
        return { skip: `<m-example [code]="${field}"> has no extractable content` };
    }
    return { field, code };
}

// --------------------------------------------------------------------------------------
// TypeScript component resolution & field rewriting
// --------------------------------------------------------------------------------------

/** Find the component `.ts` file whose template is `htmlFile`. */
function resolveComponentFile(htmlFile) {
    const sibling = htmlFile.slice(0, -extname(htmlFile).length) + '.ts';
    const htmlBase = basename(htmlFile);
    if (existsSync(sibling) && referencesTemplate(sibling, htmlBase)) {
        return sibling;
    }
    // Fall back to scanning the directory for a component pointing at this template.
    const dir = dirname(htmlFile);
    let entries;
    try {
        entries = readdirSync(dir);
    }
    catch {
        entries = [];
    }
    for (const name of entries) {
        if (name.endsWith('.ts') && !name.endsWith('.spec.ts')) {
            const candidate = join(dir, name);
            if (referencesTemplate(candidate, htmlBase)) {
                return candidate;
            }
        }
    }
    // Last resort: the sibling, even if we could not confirm the templateUrl.
    return existsSync(sibling) ? sibling : undefined;
}

function referencesTemplate(tsFile, htmlBase) {
    let source;
    try {
        source = readFileSync(tsFile, 'utf8');
    }
    catch {
        return false;
    }
    const re = new RegExp(`templateUrl\\s*:\\s*['"\`][^'"\`]*${escapeRegExp(htmlBase)}['"\`]`);
    return re.test(source);
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Detect the dominant newline style of a source file. */
function detectNewline(source) {
    const crlf = (source.match(/\r\n/g) ?? []).length;
    const lf = (source.match(/\n/g) ?? []).length - crlf;
    return crlf > lf ? '\r\n' : '\n';
}

/** Escape a string so it can sit inside a `\`…\`` template literal. */
function escapeForTemplateLiteral(value) {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$\{/g, '\\${');
}

/**
 * Locate the value of a class field `= '…' | "…" | \`…\`` and return the slice covering the
 * whole string literal (including delimiters), or undefined if not found.
 */
function findFieldLiteral(source, field) {
    const declRe = new RegExp(
        '(?:^|\\n)[ \\t]*' +
        '(?:(?:public|private|protected|readonly|static|override|declare|abstract)\\s+)*' +
        escapeRegExp(field) +
        '\\s*(?::\\s*[^=;\\n]+?)?' +
        '\\s*=\\s*',
        'g'
    );
    const match = declRe.exec(source);
    if (!match) {
        return undefined;
    }
    const delimStart = match.index + match[0].length;
    const delim = source[delimStart];
    if (delim !== '`' && delim !== '\'' && delim !== '"') {
        return { unsupported: true };
    }
    const closeIndex = findStringEnd(source, delimStart, delim);
    if (closeIndex === -1) {
        return { unsupported: true };
    }
    return {
        literalStart: delimStart,
        literalEnd: closeIndex + 1,
        delim,
        currentValue: source.slice(delimStart + 1, closeIndex)
    };
}

/** Given the opening delimiter at `start`, return the index of the matching close. */
function findStringEnd(source, start, delim) {
    let i = start + 1;
    while (i < source.length) {
        const ch = source[i];
        if (ch === '\\') {
            i += 2;
            continue;
        }
        if (delim === '`' && ch === '$' && source[i + 1] === '{') {
            // Skip a ${ … } interpolation, tracking brace depth.
            let depth = 1;
            i += 2;
            while (i < source.length && depth > 0) {
                if (source[i] === '{') {
                    depth++;
                }
                else if (source[i] === '}') {
                    depth--;
                }
                i++;
            }
            continue;
        }
        if (ch === delim) {
            return i;
        }
        i++;
    }
    return -1;
}

// --------------------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------------------

const colors = {
    enabled: process.stdout.isTTY,
    wrap(code, text) { return this.enabled ? `[${code}m${text}[0m` : text; },
    green(text) { return this.wrap('32', text); },
    yellow(text) { return this.wrap('33', text); },
    red(text) { return this.wrap('31', text); },
    cyan(text) { return this.wrap('36', text); },
    dim(text) { return this.wrap('2', text); }
};

function main() {
    let parsed;
    try {
        parsed = parseArgs(process.argv.slice(2));
    }
    catch (error) {
        if (error instanceof UsageError) {
            process.stderr.write(colors.red(error.message) + '\n\n');
            printHelp();
            process.exit(2);
        }
        throw error;
    }

    const { options, path: targetPath } = parsed;
    if (options.help) {
        printHelp();
        return;
    }

    let htmlFiles;
    try {
        htmlFiles = collectHtmlFiles(targetPath);
    }
    catch (error) {
        if (error instanceof UsageError) {
            process.stderr.write(colors.red(error.message) + '\n');
            process.exit(2);
        }
        throw error;
    }

    const log = message => { if (!options.quiet) { process.stdout.write(message + '\n'); } };
    const verbose = message => { if (options.verbose && !options.quiet) { process.stdout.write(message + '\n'); } };
    const warn = message => process.stderr.write(colors.yellow('warning: ') + message + '\n');

    /** @type {Map<string, Edit[]>} */
    const editsByTs = new Map();
    const stats = { examples: 0, targets: 0, skipped: 0, unresolved: 0 };

    for (const htmlFile of htmlFiles) {
        let html;
        try {
            html = readFileSync(htmlFile, 'utf8');
        }
        catch (error) {
            warn(`could not read ${rel(htmlFile)}: ${error.message}`);
            continue;
        }
        const blocks = findExampleBlocks(html);
        stats.examples += blocks.length;

        let tsFile;
        let tsResolved = false;
        for (const block of blocks) {
            const resolved = resolveBlock(block);
            if (!resolved) {
                continue; // no <m-example-code> with [code]
            }
            if ('skip' in resolved) {
                stats.skipped++;
                verbose(`${colors.dim('skip')} ${rel(htmlFile)}: ${resolved.skip}`);
                continue;
            }
            if (!tsResolved) {
                tsFile = resolveComponentFile(htmlFile);
                tsResolved = true;
            }
            if (!tsFile) {
                stats.unresolved++;
                warn(`${rel(htmlFile)}: no component .ts found for field "${resolved.field}"`);
                continue;
            }
            stats.targets++;
            const list = editsByTs.get(tsFile) ?? [];
            list.push({ tsFile, field: resolved.field, code: resolved.code, htmlFile });
            editsByTs.set(tsFile, list);
        }
    }

    let updated = 0;
    let unchanged = 0;
    let missing = 0;
    let outOfDate = 0;
    let conflicts = 0;

    for (const [tsFile, allEdits] of editsByTs) {
        // A field referenced by several <m-example> blocks is only safe if they all extract
        // the same code; differing code means the template is ambiguous (which example wins?).
        const edits = [];
        const byField = new Map();
        for (const edit of allEdits) {
            const existing = byField.get(edit.field);
            if (!existing) {
                byField.set(edit.field, edit);
                edits.push(edit);
            }
            else if (existing.code !== edit.code) {
                existing.conflict = true;
            }
        }
        let source;
        try {
            source = readFileSync(tsFile, 'utf8');
        }
        catch (error) {
            warn(`could not read ${rel(tsFile)}: ${error.message}`);
            missing += edits.length;
            continue;
        }
        // Preserve the file's newline style so we don't introduce mixed line endings.
        const newline = detectNewline(source);
        let next = source;
        let fileChanged = false;
        for (const edit of edits) {
            if (edit.conflict) {
                conflicts++;
                warn(`${rel(tsFile)}: field "${edit.field}" is referenced by multiple <m-example> blocks with different content — skipped`);
                continue;
            }
            const literal = findFieldLiteral(next, edit.field);
            if (!literal) {
                missing++;
                warn(`${rel(tsFile)}: field "${edit.field}" not found (referenced from ${rel(edit.htmlFile)})`);
                continue;
            }
            if ('unsupported' in literal) {
                missing++;
                warn(`${rel(tsFile)}: field "${edit.field}" is not a simple string/template-literal — skipped`);
                continue;
            }
            // `escaped` uses LF; compare against the literal's value normalised to LF so a
            // CRLF file that already matches is reported as unchanged rather than rewritten.
            const escaped = escapeForTemplateLiteral(edit.code);
            const normalizedCurrent = literal.currentValue.replace(/\r\n/g, '\n');
            if (literal.delim === '`' && normalizedCurrent === escaped) {
                unchanged++;
                verbose(`${colors.dim('ok  ')} ${rel(tsFile)} ${colors.dim('·')} ${edit.field}`);
                continue;
            }
            const replacement = '`' + escaped.replace(/\n/g, newline) + '`';
            next = next.slice(0, literal.literalStart) + replacement + next.slice(literal.literalEnd);
            fileChanged = true;
            if (options.check) {
                outOfDate++;
                log(`${colors.yellow('stale')} ${rel(tsFile)} ${colors.dim('·')} ${edit.field}`);
            }
            else {
                updated++;
                log(`${colors.green('sync ')} ${rel(tsFile)} ${colors.dim('·')} ${edit.field}`);
            }
        }
        if (fileChanged && !options.check && !options.dryRun) {
            try {
                writeFileSync(tsFile, next);
            }
            catch (error) {
                warn(`could not write ${rel(tsFile)}: ${error.message}`);
            }
        }
    }

    // Summary
    const summaryParts = [
        `${stats.examples} example(s)`,
        `${stats.targets} target(s)`
    ];
    if (options.check) {
        summaryParts.push(`${outOfDate} out of date`);
    }
    else if (options.dryRun) {
        summaryParts.push(`${updated} would change`);
    }
    else {
        summaryParts.push(`${updated} updated`);
    }
    summaryParts.push(`${unchanged} unchanged`);
    if (stats.skipped) { summaryParts.push(`${stats.skipped} skipped`); }
    if (conflicts) { summaryParts.push(`${conflicts} conflict(s)`); }
    if (missing) { summaryParts.push(`${missing} field(s) missing`); }
    log(colors.cyan('—'.repeat(3)) + ' ' + summaryParts.join(', '));

    if (options.check && (outOfDate > 0 || missing > 0 || conflicts > 0)) {
        process.exit(1);
    }
}

function rel(file) {
    const relPath = relative(process.cwd(), file);
    return relPath.startsWith('..') ? file : relPath.split(sep).join('/');
}

main();

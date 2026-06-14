# Documentation Components for mantic UI
mantic UI Documentation components for Angular

Requires [@mantic-ui/angular](https://www.npmjs.com/package/@mantic-ui/angular)

## Work-In-Progress
Currently we are heavily working to get all components and features implemented.

To support us, fork us at [github](https://github.com/KY-Programming/mantic-ui)

## Documentation
Check out the [documentation](https://mantic-ui.ky-programming.de)

## `mantic-sync-examples` CLI
This package ships a small command that keeps the code shown for an `<m-example>` in sync
with its live example markup, so you only ever write an example once.

For every `<m-example>` that references a code field, the command takes everything inside the
`<m-example>` (except `<m-example-code>` elements and anything marked `m-doc-ignore`),
normalises its indentation and writes it into that field's template literal in the component
`.ts` file that owns the template.

A field can be referenced in two ways:

```html
<!-- 1. via an <m-example-code> child -->
<m-example header="Checkbox" description="A standard checkbox">
    <m-checkbox name="example">Make my profile visible</m-checkbox>
    <m-example-code [code]="standardCode" />
</m-example>

<!-- 2. via a [code] attribute on <m-example> itself -->
<m-example header="Read-only" description="A checkbox can be read-only" [code]="readonlyCode">
    <m-checkbox readonly>Read Only</m-checkbox>
</m-example>
```

```ts
// checkbox.component.ts — updated in place
public standardCode = `<m-checkbox name="example">Make my profile visible</m-checkbox>`;
public readonlyCode = `<m-checkbox readonly>Read Only</m-checkbox>`;
```

### Excluding parts of an example
Two marker attributes — backed by the empty `DocIgnoreDirective` and `DocIgnoreContentDirective`
exported from this package — let you shape what gets extracted. They have no runtime behaviour;
they exist so the markers are type-checked and autocompleted in templates. The CLI also matches
them as plain text, so they work even where the directive is not imported.

**`m-doc-ignore`** — drop the whole element (handy for documentation notes that are not part of
the example itself):

```html
<m-example header="Page Headers" [code]="headerCode">
    <m-info m-doc-ignore>Page headings are sized using rem.</m-info>
    <h1 m-header>First Header</h1>
</m-example>
```
```ts
// headerCode receives only `<h1 m-header>First Header</h1>` — the note is dropped.
```

**`m-doc-ignore-content`** — keep the element but drop its content, collapsing it to a
self-closing tag (handy when the inner text is noise):

```html
<m-toggle [(checked)]="readonly" m-doc-ignore-content>Read Only</m-toggle>
```
```ts
// extracted as: <m-toggle [(checked)]="readonly" />
```

### Usage
Run it from any project that depends on `@mantic-ui/angular-doc`:

```bash
# whole project (current directory), a folder, or a single file
npx mantic-sync-examples
npx mantic-sync-examples src/app/examples
npx mantic-sync-examples src/app/examples/checkbox/checkbox.component.html
```

| Option | Description |
| --- | --- |
| `--check` | Don't write; exit `1` if any field is out of date (use in CI). |
| `--dry-run` | Print what would change without writing. |
| `-v`, `--verbose` | Log every example, including unchanged and skipped ones. |
| `-q`, `--quiet` | Only print warnings and the final summary. |
| `-h`, `--help` | Show help. |

### What is skipped
- Blocks with more than one `<m-example-code [code]>` (ambiguous which code maps where).
- Blocks that mix both mechanisms (a `[code]` attribute *and* an `<m-example-code>` child).
- A lone `<m-example-code>` whose `[languages]` excludes `html` (e.g. a `ts` snippet).
- A `[code]` bound to an expression rather than a plain field (e.g. `[code]="layout | json"`).
- A field referenced by several `<m-example>` blocks with different content (a template bug —
  reported as a conflict).

# mantic UI

| [Documentation](https://mantic-ui.ky-programming.de/semantic) | [Github Repository](https://github.com/KY-Programming/mantic-ui) | [Support](https://support.ky-programming.de/) |

Angular components for [Semantic UI](https://semantic-ui.com/) and [Fomantic UI](https://fomantic-ui.com/)

## Repository Info

This is the code for the test and documentation Angular application.

The core Angular components are here: [/projects/mantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/mantic-ui)

The Semantic UI Theme is here: [/projects/semantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/semantic-ui)

The Fomantic UI Theme is here: [/projects/fomantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/fomantic-ui)

The native mantic theme (`@mantic-ui/theme`) is here: [/projects/mantic-ui-theme](https://github.com/KY-Programming/mantic-ui/tree/master/projects/mantic-ui-theme)

## Getting Started

Install the base package and one of the themes, then follow the theme's README:

- Semantic UI: `npm i @mantic-ui/angular @mantic-ui/semantic-ui-angular`, see [/projects/semantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/semantic-ui)
- Fomantic UI: `npm i @mantic-ui/angular @mantic-ui/fomantic-ui-angular`, see [/projects/fomantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/fomantic-ui)
- mantic (native): `npm i @mantic-ui/angular @mantic-ui/theme`, see [/projects/mantic-ui-theme](https://github.com/KY-Programming/mantic-ui/tree/master/projects/mantic-ui-theme)

The Semantic UI and Fomantic UI themes are compiled from the LESS sources of [Semantic UI](https://semantic-ui.com/) and [Fomantic UI](https://fomantic-ui.com/), plus the adjustments the mantic components need. The mantic theme is hand-written modern CSS with dark mode and runtime theming.

## Work-in-progress
Currently we are not yet done. So please do not expect a perfect framework

If you have a issue, look in our [issue tracker on github](https://github.com/KY-Programming/mantic-ui/issues)

To support us fork our [github repository](https://github.com/KY-Programming/mantic-ui)

[Direct contact](https://support.ky-programming.de/) (German, English) via [email](https://mail.support.ky-programming.de/), [WhatsApp](https://whatsapp.support.ky-programming.de/) or join our [Discord server](https://discord.mantic-ui.ky-programming.de/)

## For Agents

**`m-example-code` / `m-example` are bound to the ngx-highlightjs directive API, which is not
stable across majors.** Up to v10 `[highlight]` took a `languages` array and auto-detected within
it; from v11 on `[highlight]` has a *required* single `language` and the array moved to
`[highlightAuto]`, which is what these components use now. A mismatch does not fail the build —
the directive throws `NG0950` at runtime and every code block on the page renders empty. So
`ngx-highlightjs` is not a free `npm update`: check the directive inputs, and keep the
`peerDependencies` range in `projects/mantic-ui-doc/package.json` honest about what the templates
actually bind.

**The highlighted HTML is written in an animation frame.** Nothing renders while the tab is
hidden, which makes a headless or background-window check of a code block look like a bug.

**Only register keys in `classes` that are really set as classes.** The "Unknown attribute"
warning of `BaseComponent` already accepts every input of the component (read with
`reflectComponentType`), so registering an input name just to silence it is not needed and hides
typos. Directives have no public input reflection, so a
`BaseDirective` still only accepts registered classes and the global attributes. Host directives
are the exception to the rule: `reflectComponentType` does not list their inputs either, so a host
directive announces them on its host with `classes.ignore(...)` (known, but never written as a
class), see `AttachedDirective`. Keep the otherwise empty `super()` constructors: without them
Angular uses the inherited factory, which injects `null` for `useUiClass` and drops the `ui` class.

**The documentation app's `index.html` is generated from `src/app/app.config.json` and the
`@ky/mantic` template, but checked in.** `@ky/mantic` lives on the private KY registry, and this
repository is public: it must install and build for anyone. So it is no dependency at all.
`npm start` / `npm run build` first run `scripts/update-index.mjs`, which fetches the package's
`ky-index` bin through `npx` and rewrites `src/index.html`. Without registry access that fails and the
build uses the checked-in file. Edit `app.config.json`, never `src/index.html`, and commit the file
whenever the run changed it. The script is called inside `start`/`build`, not as a `pre*` script,
because those never run with `ignore-scripts=true`. It only calls `npx` when the npm config maps the
`@ky` scope to a registry: unmapped, `npx` would look the package up on the public registry, where the
scope is not ours, and run whatever it found. The registry URL itself is internal and must not appear
in this repository (neither in a script nor in `package-lock.json`). A plain `ng serve` / `ng build`
skips the refresh. The `@ky/mantic@^22` range moves with the Angular major. The site must stay indexable, so the config has no `robots` key. Never commit a
`ky-ai-ng-inject` block in `src/index.html`: the ky-ai dev server injects it while it serves the app.

**The favicon switches per theme at runtime, across every icon link** (`setFavicon`). Browsers prefer
the SVG, so changing only one of the links has no visible effect.

**The Semantic UI and Fomantic UI CSS is generated, never edited.** `scripts/build-themes.mjs`
(`npm run semantic:less` / `fomantic:less`) compiles the LESS sources (`semantic-ui-less`,
`fomantic-ui-less`, pinned exactly) into `projects/*/src/lib/styles/components/*.css`, the icon / Lato
font components and the theme assets. The output is checked in so a library build or `ng serve` needs no
extra step: run the script after changing a theme's `less` folder or bumping a source package, and review
the CSS diff. Each theme's `less` folder is laid over the package root like a regular Semantic UI project
(`theme.config`, `site/`, `themes/`), nothing is written into node_modules. What mantic needs differs from
stock Semantic in four ways, all there:
- m-icon nests the icon (`<m-icon><i class="icon">` / `<m-icon><fa-icon>`) and m-checkbox draws its check
  mark as an `m-icon.icon` in the label. `site/**/*.overrides` adds those selectors to the original rules
  with `:extend`, which keeps the cascade order; a selector with an interpolated part (`@{notIcon}` in
  Fomantic) cannot be extended and is repeated with the same variables instead. The script fails on any less
  warning, so an `:extend` that stops matching after an upgrade does not go unnoticed.
- `themes/default/modules/{accordion,checkbox}.overrides` replace the default theme's ones, which only bring
  embedded icon fonts that would fight with m-icon (Fomantic always loads the default overrides, so picking
  another theme in `theme.config` does not drop them).
- `@font-face` rules go to their own opt-in components (`m-*-icons-local`, `m-fomantic-ui-lato-local`) with a
  font path relative to that component, so ng-packagr inlines the fonts. An absolute path breaks apps served
  below a base href. The flag sprite still loads from `/assets/` (Semantic) — a known limit.
- Inputs and textareas darken their border on hover like the selection dropdown, as Fomantic does (stock Semantic
  only does it for the dropdown). `site/elements/input.overrides` adds the rule, `site/collections/form.overrides`
  keeps the error border on hover; the mantic theme does the same in its `control` mixin.

less 3+ no longer evaluates operations inside `calc()`, which the Semantic definitions were written for
(see `site/elements/label.variables`): after an upgrade, grep the output for `--` inside `calc(`.

mantic's own SCSS layer (`projects/semantic-ui/src/lib/styles/overrides`, `circular-progress.scss`) is shared:
the Fomantic theme `@use`s it by relative path, Sass inlines it at build time. `@ky/mantic` imports
`@mantic-ui/semantic-ui-angular/styles/overrides/all`, so that path is public API.

**The native theme (`projects/mantic-ui-theme`, `@mantic-ui/theme`) is hand-written SCSS, not a Semantic
port.** It keeps the class contract of the core (`.ui.button.primary` …), so all three themes stay
interchangeable, but uses the Semantic definitions only as the list of variants to support: no floats or
clearfix (flex/grid/`gap`), logical properties, and mantic's own DOM (`m-icon`, the m-checkbox check mark)
styled directly instead of patched afterwards. It targets current browsers only (2024+: `light-dark()`,
`color-mix()`, relative colors, `@layer`); that was a deliberate decision, don't add fallbacks.
Rules that are easy to break:
- Everything sits in `@layer mantic.*` (order in `_layers.scss`), so unlayered app styles always win. The last layer,
  `mantic.preset`, is empty in the theme: it is the slot for a preset that sets tokens and tweaks components on top
  (e.g. `@ky/mantic`'s ky-ui preset), above the theme and below the app. The
  core lib's component styles are unlayered too and therefore beat the theme regardless of specificity:
  the core must take colors from `--m-*` tokens, not hardcode them, or the theme cannot change them.
  Host defaults a theme must be able to override (`:host { display: … }` of themed hosts like `.ui.segments`,
  `.ui.table`) go through the core mixin `core-layer.host-defaults` into `@layer mantic.core`, the lowest layer
  (it is listed first in the theme's order statement, so it stays lowest whichever stylesheet loads first). The
  unlayered Semantic / Fomantic CSS beats it as it beat the old unlayered rule by specificity. Behavior
  (`display: none` for closed / hidden states) and rules that must beat the themes (attached / readonly mixins)
  stay unlayered.
- The core (and `@mantic-ui/doc`, and the docs app's own styles) never hardcode a theme color: they read the theme's
  token with the Semantic value as fallback, e.g. `var(--m-border, rgba(34, 36, 38, 0.15))`. The Semantic and Fomantic
  themes define no `--m-*` property, so they keep their look exactly; under the mantic theme the token wins and follows
  dark mode. Colors that belong
  to the content and not to the theme stay literal: the color picker's gradients, checkerboard and white thumb, the
  color input's preset swatches, the dark badge over a chat attachment.
- Readonly fields: the core only draws the lock (its own DOM, switched off app-wide with `noReadonlyLock` on any of the
  three theme components); how the field looks is the theme's. Semantic and Fomantic keep their stock look (a readonly
  input looks like any input and still hovers, as in Fomantic), the mantic theme gives readonly inputs, m-textarea and
  the selection dropdown `--m-readonly-background` and no hover — checkbox, radio, toggle and slider included.
- Checkbox, radio, toggle and slider show the lock after their label text and set `aria-readonly` (a native checkbox
  ignores `readonly`). Without a text (fitted, or a column of checkboxes in a table) the lock is left out; that is
  detected with `.label-text:empty`, so the label text must stay in that one span. The mantic theme also gives the box
  the readonly background and turns a checked toggle grey instead of the accent, so it reads as a value, not a switch.
- Base tokens are declared on `:root` only; derived tokens (hover/active/subtle/on variants, radius scale,
  shadows, anything with a `var()` inside) are declared on `:root` **and** `[m-theme-scope]`. A custom
  property resolves its `var()`s where it is declared, so a derived token declared on `:root` alone ignores
  overrides further down the tree. Repeating a base token in the scope rule would in turn reset a page-wide
  override inside every scope. Consequence: a scope must override roles (`primary`), not palette colors,
  to restyle its roles; roles are resolved against the palette on `:root`.
- Tokens are not registered with `@property`. Unregistered, they inherit as unresolved text, so a
  `light-dark()` inside is evaluated where the token is used, under that element's `color-scheme`. That is
  what makes a dark subtree (`color-scheme: dark` on any element) work without separate dark tokens.
- Dark mode is `color-scheme` (`m-mantic-theme` sets it on `<html>`), not `inverted` defaults. `inverted`
  stays supported for places that are deliberately always dark; how it maps onto the tokens is still open.
- Text on a colored background (`--m-*-on`) is computed in CSS from the color's OKLCH lightness against
  `--m-on-threshold`, so it follows runtime changes without script.
- The package is released with the `mantic` group of `scripts/bump.js` (`theme:build` / `theme:publish`), so its
  version and its peer dependency on `@mantic-ui/angular` move with the core.
- Every stylesheet of the theme (also the opt-in components and the copied glyph CSS) starts with the layer order
  statement. Layer order is fixed by the first stylesheet that mentions a layer, and the components may be rendered in
  any order.
- The icon glyph maps (`mantic-icons-local`, `mantic-brand-icons-local`) were copied once from the generated Fomantic
  icon CSS (Font Awesome Free 5.15 set) and are not regenerated; the icon base styles are hand-written in
  `styles/components/_icon.scss`. `<i class="icon">` (font) and `<fa-icon class="icon">` (Font Awesome, whose own CSS
  sizes the svg) deliberately get different box rules, see the comment there.
- Fonts are woff2 only and inlined into the opt-in components (relative `url()`, ng-packagr inlines it as a data URI).
  Inlined faces are all downloaded with the app, so `unicode-range` saves nothing here: what a component embeds is
  what every app pays. That is why Lato 2.0 is split in two components, `m-mantic-lato-local` (Latin, ~80 KB, covers
  German and Western Europe) and the opt-in `m-mantic-lato-ext-local` (Latin Extended, ~51 KB); the full Lato would add
  ~700 KB. The files were cut once from the LatoLatin 2.0 woff2 with harfbuzz (`subset-font`), split at Google Fonts'
  `latin` range; the `unicode-range` of each face lists exactly what its file covers. Don't swap in Google's Lato,
  which is the older 1.x design.
- `inverted` on an element maps to `color-scheme: dark` where it means "sits on a dark background" (done for icons):
  every token then resolves to its dark value, with no separate inverted colors.
- Component styles (`styles/components/_*.scss`): a color class only sets private `--_<component>-*` properties
  (color, hover, active, on), and one rule set reads them with the neutral look as fallback, so basic / inverted /
  hover don't multiply per color. They inherit on purpose (a colored group colors its buttons). Public per-component
  tokens (`--m-button-padding-block`, `--m-segment-padding`, …) are never declared by the theme, only read with a
  fallback, so the token rules on `:root` stay small and they can be set anywhere.
- Never style `.icon.<state>` alone: `icon` is also a variant class of other components (`.ui.icon.button`,
  `.ui.icon.input`, `.ui.icon.menu`). Icon rules go through `:is(i, fa-icon).icon`.
- Measure in a visible tab: in a background tab the browser runs no transitions, so an element whose theme style
  arrived after it rendered (the docs navigation) keeps its unstyled values in screenshots and `getComputedStyle`. A
  background tab does not pick up a hot style update of the theme partials either: reload it before measuring.
- Native fields (`.ui.input > input`, the form's plain inputs and textareas, m-textarea's `.ui.form.textarea` host) share
  the `control` mixin of `_input.scss`. Its colors come from private `--_control-*` properties; an error state
  (`.ui.input.error`, `.field.error`) only sets them and they inherit into every control inside, so later controls
  (dropdown, checkbox) should read the same properties instead of adding error rules of their own. The form's selector
  for plain fields is wrapped in `:where()` on purpose, so the `.ui.input` variants (transparent, labeled, action) beat it.
- Checkbox, radio, toggle and slider read their state from the host classes the core sets (`.checked`,
  `.indeterminate`, `.disabled`, `.read-only`), not from `input:checked`: the hidden input only mirrors the value, and
  radio / toggle / slider render no check mark element, so their dot and knob are pseudo-elements of the label.
- Field groups are flex with `gap`, not negative margins. Equal widths depend on the count class (`two fields`) that
  m-field-group sets from its number of fields; a `wide` field takes `n/16 * (100% + gap) - gap`.
- A selection dropdown is a field (`input.control`, `--_control-*`): `.field.error` colors it, menu included. The core
  shows the open menu itself (inline `display` plus the transition classes); the theme only hides it otherwise, so add
  no theme rule that shows the menu.
- A role whose name is also a variant class of a component must not be generated as a color class there: `secondary`
  is a menu variant, so menus have no `secondary` color (buttons do).
- Menu hover / active backgrounds are the text color at a low share; `inverted` only switches `color-scheme` and raises
  the share. Colored inverted menus set `color-scheme: light` to get the strong base color.
- Buttons have no trailing margin (Semantic's `margin-right: 0.25em` pushed against whatever followed and doubled the gap
  of flex rows); only a button or group directly after another one gets `margin-inline-start: 0.25em`. Group members and
  attached buttons are excluded in that selector itself, because it outranks their `margin: 0` by specificity.
- A vertical menu must not reset the item background: `.ui.vertical.menu .item` is as specific as
  `.ui.menu .active.item` and comes later, so any background there wipes out the active highlight.
- The dimmer sets only the text color, never `color-scheme`: a modal inside must keep the page scheme. Loaders, icons and
  the dimmer content follow through `currentColor`.
- Text on a color the theme computes (the progress bar's percentage) uses the `-on` rule inline,
  `oklch(from <color> clamp(0, (var(--m-on-threshold) - l) * 1000, 1) 0 0)`, so state colors need no `-on` token.
- m-message has no `.content` wrapper and renders its header before the icon: an icon message places the icon
  absolutely in its start padding, and the message is a centered flex column.
- Table row colors are only `--_table-state-bg`, `--_table-hover-bg` and `--_table-stripe-bg`, painted on the `tr`; the
  core's sticky column takes the row color over, so don't paint data cells (except a cell with its own state). m-table
  rows usually have no `<tbody>`: row rules use `:nth-of-type` / `:first-of-type`.
- The grid keeps Semantic's column padding plus negative grid margin (one `--m-grid-gutter`), deliberately not `gap`:
  colored, celled and divided columns draw on the padding box. Floated images keep `float`, the only way to wrap text.
- A selector inside `:is()` cannot start with `>`: after a compound selector, spell out each child selector (see `cols()`
  in `_grid.scss`).
- Several agents driving ky-ai-browser at once share one identity and therefore tabs: they navigate each other away and
  a dark-mode switch hits the others. Verify one after another, or keep a check inside a single `evaluate_js`.
- Left icon inputs are matched as `.left.icon`; a left label sets `left` too (`left labeled`), so a left label combined
  with an icon on the right is misread as a left icon. The core would need a distinct class to tell them apart.

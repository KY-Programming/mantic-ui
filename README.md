# mantic UI

| [Documentation](https://mantic-ui.ky-programming.de/semantic) | [Github Repository](https://github.com/KY-Programming/mantic-ui) | [Support](https://support.ky-programming.de/) |

Angular components for [Semantic UI](https://semantic-ui.com/) and [Fomantic UI](https://fomantic-ui.com/)

## Repository Info

This is the code for the test and documentation Angular application.

The core Angular components are here: [/projects/mantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/mantic-ui)

The Semantic UI Theme is here: [/projects/semantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/semantic-ui)

The Fomantic UI Theme is here: [/projects/fomantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/fomantic-ui)

## Getting Started

Install the base package and one of the themes, then follow the theme's README:

- Semantic UI: `npm i @mantic-ui/angular @mantic-ui/semantic-ui-angular`, see [/projects/semantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/semantic-ui)
- Fomantic UI: `npm i @mantic-ui/angular @mantic-ui/fomantic-ui-angular`, see [/projects/fomantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/fomantic-ui)

Both themes are compiled from the LESS sources of [Semantic UI](https://semantic-ui.com/) and [Fomantic UI](https://fomantic-ui.com/), plus the adjustments the mantic components need.

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
stock Semantic in three ways, all there:
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

less 3+ no longer evaluates operations inside `calc()`, which the Semantic definitions were written for
(see `site/elements/label.variables`): after an upgrade, grep the output for `--` inside `calc(`.

mantic's own SCSS layer (`projects/semantic-ui/src/lib/styles/overrides`, `circular-progress.scss`) is shared:
the Fomantic theme `@use`s it by relative path, Sass inlines it at build time. `@ky/mantic` imports
`@mantic-ui/semantic-ui-angular/styles/overrides/all`, so that path is public API.

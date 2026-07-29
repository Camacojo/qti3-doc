# CLAUDE.md

Guidance for working in this repository.

## What this is

Online documentation for the 1EdTech **QTI 3.0** specification, aimed at both
developers and product managers. Built with **Astro Starlight**. Content is in
English.

- **Live site:** https://qti3-doc-ac52af.pages.bks.kennisnet.nl/ (GitLab Pages)
- **Repo:** https://gitlab.bks.kennisnet.nl/visser01/qti3-doc
- **Plan / progress:** see [`PLAN.md`](./PLAN.md)

The site explains and cross-references the spec — it is **not** the normative
text. Summarise and link to the [official spec](https://www.imsglobal.org/spec/qti/v3p0/impl);
do not copy it verbatim.

## Commands

```bash
npm install          # install deps
npm run dev          # dev server (http://localhost:4321/)
npm run build        # production build → dist/
npm run preview      # serve the built dist/
```

To view a change working, `npm run build` then screenshot with headless Chrome
(there is no Playwright here):
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --virtual-time-budget=9000 --screenshot=out.png --window-size=1100,3000 <url>`

## Structure

```
src/
  content/docs/
    index.mdx              Landing page (splash)
    onboarding/            Getting started (product- & dev-friendly)
    concepts/              Core concepts
    reference/             Hierarchical element reference
      interactions/        The ~20 interaction types
      content/             Content & structure (rubric-block, feedback, prompt, …)
      test/                Test structure (assessment-test, test-part, section, …)
      processing/          Variables & response/outcome/template processing
      packaging/           Content package, manifest, metadata
    guides/                How-to guides
  components/              Reusable MDX components (see components/README.md)
  lib/withBase.ts          Base-path helper for component links
  styles/custom.css        Design system
public/
  demo-assets/regions.svg  Placeholder image for image-based interaction demos
astro.config.mjs           Site config, sidebar, base path, rehype link plugin
.gitlab-ci.yml             GitLab Pages build & deploy
```

## Content conventions

- **One topic per page**, with a stable, shareable URL. Keep pages focused.
- Pages using components must be **`.mdx`** (not `.md`).
- Reusable components live in `src/components/` (alias `@components/*`). The
  reference-page template and each component are documented in
  [`src/components/README.md`](./src/components/README.md): `SupportBadge`,
  `AttributesTable`, `Example`, `Related`, `SpecLink`, `QtiDemo`.
- Cross-references: use `Related` (component) and inline Markdown links. Both are
  made base-aware automatically (see Deployment).
- Multi-example pages use Starlight `<Tabs>` / `<TabItem>` — applied only where a
  second example genuinely helps (e.g. choice single/multiple, built-in-templates).

## Live interaction demos

`QtiDemo.astro` renders a live interaction with `@citolab/qti-components`. It
passes markup via `set:html` (so MDX never parses the custom elements) and a
client `<script>` imports the library to register them.

- **Use explicit closing tags** in demo markup — self-closing custom elements do
  not work in `innerHTML`.
- Only **text-based interactions render reliably standalone** and get a live demo
  (choice, text-entry, inline-choice, order, extended-text, match, gap-match,
  hottext, slider, upload, end-attempt, select-point).
- **Image/graphic/media interactions do NOT render correctly standalone** (their
  shadow-DOM overlays assume a full player layout → collapsed host, overlapping /
  escaping content). These carry an honest `:::note` linking to the
  [qti-components Storybook](https://qti-components.citolab.nl) instead of a demo
  (associate, hotspot, graphic-*, drawing, media, custom).

## Gotchas (hard-won — read before editing content or config)

- **QTI 3.0 markup**: kebab-case, `qti-`-prefixed elements (e.g. `qti-simple-choice`),
  NOT the QTI 2.x camelCase names. Item-body content uses **plain HTML** (`<p>`,
  `<img>`) — there is no `qti-p`.
- **MDX**: no `<url>` autolinks (use `[text](url)`); a bare `{` in prose is parsed
  as a JSX expression — wrap literal braces in code (`` `{A}` ``); quote any
  frontmatter `description:` that contains a colon.
- **match grid**: add `class="qti-match-tabular"` to render a match as a
  rows×columns checkbox grid (e.g. true/false). Without it, it renders as
  drag-and-drop.
- **gap-match**: set `max-associations="0"` when there is more than one gap
  (default is 1, which blocks the second gap).
- **php-qti3 support matrix** (for `SupportBadge phpQti3=...`): supported =
  choice, text-entry, extended-text, gap-match, hotspot, hottext, inline-choice,
  match, order, select-point. Everything else is unsupported. Source: the
  `kennisnet/php-qti3` README "Supported interactions". php-qti3 also drops
  rubric blocks, template processing and outcome processing on regeneration.
- **CSS**: `@citolab/qti-components` ships CSS that lightningcss refuses to
  minify, so `astro.config.mjs` sets `vite.build.cssMinify: 'esbuild'`.

## Deployment (GitLab Pages)

- `.gitlab-ci.yml` job `pages` builds and publishes `public/` from the default
  branch. It moves `dist/` → `public/` after the build (GitLab Pages expects
  `public/`).
- CI uses **`npm install`, not `npm ci`** — `npm ci` strict-checks the lock file
  against a fresh resolution and fails on the linux runner due to cross-platform
  optional-dependency (`@emnapi/*`) drift.
- **Base path**: this project uses a Pages **"unique domain"** serving from the
  **root**, so `BASE = ''` in `astro.config.mjs` (no base path). If it is ever
  served under a subpath, set `BASE` (e.g. `/qti3-doc`) and prefix the hero links
  in `src/content/docs/index.mdx`.
- Base portability is handled two ways so links/assets/search keep working:
  - `rehypeBasePaths` (astro.config.mjs) prefixes root-relative links in
    Markdown/MDX prose.
  - `withBase()` (`src/lib/withBase.ts`) prefixes links passed to components
    (`Related`, landing cards). Use it for any new component link.
- **Pagefind search** loads its index from the base path automatically; it works
  on Pages as long as `dist/pagefind/` is published (it is) and `base` is correct.

## Key references

- QTI 3.0 spec: https://www.imsglobal.org/spec/qti/v3p0/impl
- `@citolab/qti-components` (browser rendering): https://github.com/citolab/qti-components · Storybook https://qti-components.citolab.nl
- `kennisnet/php-qti3` (server parse/score, Composer `wikiwijs/php-qti3`): https://github.com/kennisnet/php-qti3
- Astro Starlight: https://starlight.astro.build

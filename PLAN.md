# QTI 3.0 Documentation — Build Plan

Online documentation for the 1EdTech **QTI 3.0** specification.

**Stack:** [Astro Starlight](https://starlight.astro.build) · content in English · static HTML output · built-in search (Pagefind). Hosting target chosen later.

## Architecture principles

- **One topic = one page** with a stable, shareable URL (e.g. `/reference/interactions/choice-interaction/`).
- **Cross-references** via a reusable link component, so each page stays focused.
- **Two entry points:** a conceptual track (product managers) and a reference track (developers).
- **No verbatim copying** of the 1EdTech spec (copyright) — we summarise, explain and link to the source.
- Every reference page follows one template: *purpose → place in hierarchy → attributes → example (XML) → live rendering → cross-references → package support (php-qti3 / qti-components) → spec link.*

## Commands

```bash
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Phases

### Phase 0 — Foundation & scaffolding ✅
- [x] Initialise Astro Starlight project, git, README
- [x] Base config: site title/metadata, English, light/dark, Pagefind search
- [x] Simple, clear design system (typography, colours, spacing tokens) — `src/styles/custom.css`
- [x] Full information architecture as navigable stub pages (50 pages)
- [x] Local build working (52 pages, search index + sitemap generated)

### Phase 1 — Information architecture & reusable components ✅
- [x] Confirm sidebar/category layout (Onboarding · Core concepts · Reference · Guides)
- [x] Build MDX components: `AttributesTable`, `Example` (XML + live-demo slot), `Related` (cross-reference), `SupportBadge` (php-qti3 / qti-components), `SpecLink` — in `src/components/` (`@components/*` alias)
- [x] Reference-element page template — worked example at `reference/interactions/choice-interaction.mdx`; glossary lives at `onboarding/glossary` and is linked via `Related`

### Phase 2 — Onboarding & core concepts ✅
- [x] Landing page (Phase 0)
- [x] "What is QTI 3.0" + why / interoperability (PM-friendly) + glossary
- [x] The QTI ecosystem + open-source packages (`@citolab/qti-components`, `wikiwijs/php-qti3`)
- [x] Core concepts: assessment item · test/section · item body · variables & declarations · interactions overview · response processing · outcomes & scoring · feedback · content packaging · accessibility (10 pages, cross-referenced, with examples)

### Phase 3 — Specification (hierarchical reference) — largest chunk ✅
- [x] All 20 interaction types, each its own page — via multi-agent workflow (author → verify)
- [x] Variables & declarations, expressions, response processing + operators, plus template-processing & outcome-processing (10 pages)
- [x] Content & structure category: rubric-block, assessment-stimulus, modal-feedback, feedback-block/-inline, printed-variable, stylesheet, catalog-info, prompt (8 pages)
- [x] Test structure category: assessment-test, test-part, section, item-ref, selection & ordering, item-session-control, time-limits, branch-rule & preconditions, weight (9 pages)
- [x] Wire up cross-references consistently — validated against a fixed URL list; no dead internal links; no QTI 2.x camelCase leaks
- [x] Reference overview page (`reference.mdx`) — hand-crafted, covers all 5 reference categories

**Completeness audit (after user request):** reviewed all QTI 3.0 element groups. Closed the gaps found — test-structure layer, template & outcome processing, and content/structure elements (rubric-block etc.) now all covered. Reference grew from ~31 to 50 pages. MathML noted on the item-body concept page.
- [x] **Resolved:** php-qti3 support matrix verified against the package README. Supported: choice, text-entry, extended-text, gap-match, hotspot, hottext, inline-choice, match, order, select-point. Unsupported (badge = "Not yet"): associate, slider, media, graphic-*, drawing, upload, end-attempt, custom. All 20 interaction badges now reflect this.

### Phase 4 — Examples & live rendering ✅
- [x] Embed `@citolab/qti-components` for live examples — `QtiDemo` component (markup via `set:html`, client-side registration; esbuild CSS minifier to tolerate the library's CSS)
- [x] Live demos on choice, text-entry, inline-choice, order pages (+ the authoring & rendering guides); visually verified via headless-browser screenshots
- [x] Guides written: author your first item · render with qti-components · parse & score with php-qti3 (real APIs from both repos)
- [x] Multi-example pages via Starlight `<Tabs>` (compact switcher, one example shown at a time). Applied where a second/third example genuinely adds value: choice (single/multiple), text-entry (text/numeric), match (two-set/true-false grid), hotspot (single/multiple region), built-in-templates (match_correct/map_response/map_response_point). Deliberately left single-example elsewhere.
- [x] Live demos rolled out so every interaction page has a working demo (12) or an honest note (8). Demos: choice, text-entry, inline-choice, order, extended-text, match, gap-match, hottext, slider, upload, end-attempt, select-point. Notes (need player context / image tiles / media / JS module, or their absolutely-positioned overlays collapse standalone): associate, hotspot, graphic-order, graphic-associate, graphic-gap-match, drawing, media, custom — each links to the qti-components Storybook. Rule: interactions that render reliably standalone get a live demo; image/graphic/media ones (shadow-DOM overlays needing a full player layout) link out.
- [x] Feedback fixes: match true/false example uses `class="qti-match-tabular"` so it renders as a rows×columns grid; gap-match demo/example use `max-associations="0"` (2 gaps need 2+ associations).
- [x] Removed the answer-revealing `show-correct-response` / `correct-response` from demos (kept only on the rendering guide, which documents that attribute). Added a bundled placeholder image `public/demo-assets/regions.svg` for the image-based demos.

### Phase 5 — Search, quality & deploy
- [x] Search (Pagefind) building; site-wide dead-link check — 3069 internal links, 0 dead; sitemap generated
- [x] Design polish (landing page, two audience tracks) verified in-browser; light/dark supported
- [x] Deploy workflow — GitLab Pages via `.gitlab-ci.yml` (build → publish `public/`). CI uses `npm install` (not `npm ci`) to avoid cross-platform lock drift. The project uses a Pages "unique domain" serving from the **root**, so `BASE = ''` (no base path); a `withBase()` helper + a rehype pass keep links portable if a base is ever needed. Repo: https://gitlab.bks.kennisnet.nl/visser01/qti3-doc — live at **https://qti3-doc-ac52af.pages.bks.kennisnet.nl/**. Pipeline #290931 passed; base/asset paths corrected in a follow-up so styling + Pagefind search load from root.

## Key references

- 1EdTech QTI 3.0 spec: https://www.imsglobal.org/spec/qti/v3p0/impl
- `@citolab/qti-components` (web components): https://github.com/citolab/qti-components — storybook: https://qti-components.citolab.nl
- `wikiwijs/php-qti3` (PHP parse/score, repo `kennisnet/php-qti3`): https://github.com/kennisnet/php-qti3

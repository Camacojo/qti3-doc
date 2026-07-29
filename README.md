# QTI 3.0 Documentation

Online documentation for the 1EdTech **QTI 3.0** specification — aimed at both developers and product managers. Built with [Astro Starlight](https://starlight.astro.build).

Features: full-text search, a logical concept/reference split, focused and shareable per-topic pages, a hierarchical element reference with cross-references and examples, and onboarding that points to the open-source packages [`@citolab/qti-components`](https://github.com/citolab/qti-components) and [`kennisnet/php-qti3`](https://github.com/kennisnet/php-qti3).

See [`PLAN.md`](./PLAN.md) for the phased build plan and progress.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
```

## Commands

| Command           | Action                                        |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the local dev server                    |
| `npm run build`   | Build the production site into `dist/`        |
| `npm run preview` | Preview the production build locally          |

## Project structure

```
src/
  content/docs/
    index.mdx              Landing page
    onboarding/            Getting started (product- & dev-friendly)
    concepts/              Core concepts
    reference/             Hierarchical element reference
      interactions/
      processing/
      packaging/
    guides/                How-to guides
  styles/custom.css        Design system
astro.config.mjs           Site config & sidebar
```

## Content conventions

- One topic per page; keep URLs stable so they stay shareable.
- Summarise and link to the [official spec](https://www.imsglobal.org/spec/qti/v3p0/impl) rather than copying it.

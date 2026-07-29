## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## This project

QTI 3.0 documentation site built with Astro Starlight. See:

- `PLAN.md` — the phased build plan and progress checklist (source of truth).
- `src/components/README.md` — reusable MDX components and the reference-page template.
- Content lives in `src/content/docs/` (`onboarding/`, `concepts/`, `reference/`, `guides/`).

Conventions: one topic per page with a stable URL; summarise and link to the
[official spec](https://www.imsglobal.org/spec/qti/v3p0/impl) rather than copying it;
pages using components must be `.mdx`.

## Astro documentation

Full documentation: https://docs.astro.build — see especially
[content collections](https://docs.astro.build/en/guides/content-collections/) and
[Starlight](https://starlight.astro.build).

# Authoring components

Reusable MDX components for documentation pages. Import them via the
`@components/*` alias (configured in `tsconfig.json`). A page that uses any of
these must be `.mdx`, not `.md`.

## Reference page template

Every reference element page follows this order:

```mdx
---
title: qti-<element-name>
description: One-line summary (used in search results and the sidebar).
sidebar:
  order: <n>
---

import SupportBadge from '@components/SupportBadge.astro';
import AttributesTable from '@components/AttributesTable.astro';
import Example from '@components/Example.astro';
import Related from '@components/Related.astro';
import SpecLink from '@components/SpecLink.astro';

<SupportBadge phpQti3="yes" qtiComponents="yes" />

Short intro paragraph.

## Purpose            — when to use it
## Place in the hierarchy — parent / children / bound-to
## Attributes         — <AttributesTable ... />
## Example            — <Example ...> ```xml ... ``` </Example>
## Cross-references   — <Related links={[ ... ]} />

<SpecLink href="...">…in the QTI 3.0 specification</SpecLink>
```

See `src/content/docs/reference/interactions/choice-interaction.mdx` for the
canonical worked example.

## Components

| Component         | Purpose                                                        |
| ----------------- | -------------------------------------------------------------- |
| `SupportBadge`    | Tooling-support row (`php-qti3` / `qti-components`), levels `yes`/`partial`/`no`. |
| `AttributesTable` | Consistent attribute table from an `attributes` array. Descriptions may contain inline HTML (`<code>`). |
| `Example`         | Titled example; default slot = fenced code, optional `demo` slot for live rendering (Phase 4). |
| `Related`         | Compact cross-reference list from a `links` array.             |
| `SpecLink`        | Styled link to the authoritative 1EdTech spec.                 |

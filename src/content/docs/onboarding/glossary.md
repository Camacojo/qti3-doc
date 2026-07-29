---
title: Glossary
description: Definitions of the key QTI 3.0 terms used throughout this site.
sidebar:
  order: 5
---

The core QTI 3.0 vocabulary, in plain language. Deeper explanations are linked.

### Assessment item
The fundamental unit of QTI: a single question with its content, variables, and
scoring rules. See [Assessment item](/concepts/assessment-item/).

### Assessment test
An ordered collection of items, grouped into sections, with rules for sequencing
and aggregating scores. See [Assessment test & sections](/concepts/assessment-test-and-sections/).

### Section
A grouping of items (or nested sections) inside a test, used for organisation,
selection, and ordering.

### Item body
The HTML5-based content of an item — text, media, and interactions — that is
presented to the candidate. See [Item body](/concepts/item-body/).

### Interaction
A control through which the candidate responds (choose, type, drag, order, …).
See [Interactions overview](/concepts/interactions-overview/).

### Prompt
The question text or instruction shown at the start of an interaction
(`qti-prompt`).

### Response variable
A variable that captures what the candidate did, declared with
[`qti-response-declaration`](/reference/processing/response-declaration/). The
default one is `RESPONSE`.

### Outcome variable
A variable that holds a result of scoring, such as `SCORE`, declared with
[`qti-outcome-declaration`](/reference/processing/outcome-declaration/).

### Template variable
A variable used to create variations (clones) of an item, declared with
[`qti-template-declaration`](/reference/processing/template-declaration/).

### Cardinality
How many values a variable holds: `single`, `multiple`, `ordered`, or `record`.

### Base type
The data type of a variable's value(s): e.g. `identifier`, `string`, `integer`,
`float`, `point`, `pair`, `directedPair`.

### Correct response
The value(s) considered correct for a response variable
(`qti-correct-response`), used by scoring.

### Mapping
A lookup from response values to numeric scores (`qti-mapping`), enabling partial
credit. See [Built-in RP templates](/reference/processing/built-in-templates/).

### Response processing
The rules that turn responses into outcomes. See [Response processing](/concepts/response-processing/).

### Response processing template
A reusable, standardised scoring recipe referenced by URI — `match_correct`,
`map_response`, `map_response_point`. See [Built-in RP templates](/reference/processing/built-in-templates/).

### Outcome processing
Test-level rules that aggregate item outcomes into test outcomes.

### Feedback
Content shown to the candidate based on outcome values — modal, inline, or block.
See [Feedback](/concepts/feedback/).

### Content package
A ZIP (IMS Content Packaging) bundling QTI XML and media, described by an
`imsmanifest.xml`. See [Content packaging](/concepts/content-packaging/).

### Manifest
The `imsmanifest.xml` at the root of a package listing its resources and
dependencies. See [imsmanifest.xml](/reference/packaging/imsmanifest/).

### PNP (Personal Needs & Preferences)
A description of a candidate's accessibility needs, used to adapt delivery. See
[Accessibility](/concepts/accessibility/).

### Catalog
Alternative content (e.g. glossary entries, spoken text) that a player can
substitute based on the PNP. See [Accessibility](/concepts/accessibility/).

### PCI (Portable Custom Interaction)
A mechanism for defining custom interaction types beyond the standard set. See
[qti-custom-interaction](/reference/interactions/custom-interaction/).

# PuSpacing Vocabulary Task Packet

Purpose:

```
Establish a shared spacing-scale vocabulary for component APIs that expose
interior spacing controls, starting with PuPageScaffold padding and extending
to row/detail primitives such as PuCell and PuDescriptionItem.
```

Status:

```
Opened on 2026-06-19.
Implemented as a first web package slice on 2026-06-19.
```

Problem:

```
PuPageScaffold currently allows zero-padding behavior only through CSS variable
overrides. That makes a common composition need possible but not discoverable
from the public API.

The same kind of API pressure exists on components such as PuCell and
PuDescriptionItem, where callers may need to intentionally choose compact,
default, spacious, or no internal padding without reaching into component-local
CSS variables.
```

Decision:

```
Use PuSpacing as the shared vocabulary name for spacing scale values.

Recommended values:

none
xs
sm
md
lg

Use concrete prop names for concrete layout responsibilities:

padding: PuSpacing
gap: PuSpacing

Do not use a generic `spacing` prop when the affected CSS property is more
specific. A prop named `spacing` is ambiguous between padding, gap, margin, and
item rhythm.
```

Vocabulary boundary:

```
PuSpacing answers "which spacing scale value should this local layout property
use?".

padding answers "how much interior space does this component own?".

gap answers "how much space separates this component's children?".

density answers "how compact is this component's overall information rhythm?".
It should remain a higher-level policy such as compact or comfortable, and may
adjust padding, gap, min-height, or typography rhythm together.
```

Confirmed naming guidance:

```
Prefer:

<PuPageScaffold padding="none" />
<PuCell padding="sm" />
<PuDescriptionItem padding="xs" />
<PuCard padding="md" gap="sm" />

Avoid:

<PuPageScaffold density="none" />
<PuCell spacing="sm" />
```

Initial source targets:

```
packages/web/src/types/variants.ts
  - add `puSpacings`
  - add `PuSpacing`
  - include `PuSpacing` in `PuVariantValue`
  - keep `PuGap` as a semantic alias over the shared `puSpacings` values

packages/web/src/components/puPageScaffold/puPageScaffold.ts
packages/web/src/components/puPageScaffold/puPageScaffold.vue
packages/web/src/components/puPageScaffold/puPageScaffold.scss
  - add `padding` prop
  - map `padding="none"` to true zero padding
  - preserve default page safe-area behavior for default padding

packages/web/src/components/puCard/puCard.ts
packages/web/src/components/puCard/puCard.scss
  - migrate component-local `PuCardPadding` to shared `PuSpacing`
  - decide whether PuCard should accept `xs` in addition to existing
    none/sm/md/lg

packages/web/src/components/puCell/puCell.ts
packages/web/src/components/puCell/puCell.vue
packages/web/src/components/puCell/puCell.scss
  - add `padding` prop backed by `PuSpacing`
  - keep default row rhythm compatible with the current visual default

packages/web/src/components/puDescriptionItem/puDescriptionItem.ts
packages/web/src/components/puDescriptionItem/puDescriptionItem.vue
packages/web/src/components/puDescriptionItem/puDescriptionItem.scss
  - evaluate whether item-level `padding` should override parent density
  - keep existing PuDescriptionList density behavior intact
```

Implementation record:

```
packages/web/src/types/variants.ts
  - adds `puSpacings`
  - adds `PuSpacing`
  - points `puGaps` at the shared spacing values

packages/web/src/components/puPageScaffold/
  - adds `padding` prop backed by PuSpacing
  - keeps default md behavior compatible with current safe-area page inset
  - makes `padding="none"` remove design padding and safe-area inset

packages/web/src/components/puCard/
  - migrates PuCardPadding to PuSpacing
  - adds padding="xs"

packages/web/src/components/puCell/
  - adds `padding` prop backed by PuSpacing
  - preserves current default row padding as padding="md"

packages/web/src/components/puDescriptionItem/
  - adds optional `padding` prop backed by PuSpacing
  - lets explicit item padding override parent list density spacing

packages/web/src/stories/
  - adds spacing variants for PuPageScaffold, PuCard, PuCell, and
    PuDescriptionItem through PuDescriptionList

.changeset/soft-cooks-smile.md
  - records the public design-web API expansion
```

PuPageScaffold safe-area policy:

```
padding="none" should be honest zero padding.

The current default behavior combines design padding with safe-area variables.
That default should remain for page safety. If a future product need appears
for "remove design padding but keep safe area", model that separately instead
of making `padding="none"` retain hidden inset.
```

Compatibility notes:

```
PuCard already exposes:

padding="none" | "sm" | "md" | "lg"

This task should preserve those existing values. Adding `xs` to PuCard is a
small public API expansion and should be documented in stories and generated
component references if implemented.

PuDescriptionList already uses density="compact" | "comfortable". This task
should not redefine density or add none/sm/md/lg to density.
```

Documentation sync targets:

```
docs/30-unit-tdd/web/component-contract.md
docs/30-unit-tdd/web/composition-principles.md
packages/web/skill.seed.json
packages/web/skills/design-web/
packages/web/src/stories/layout/PuPageScaffold.story.vue
packages/web/src/stories/display/PuCard.story.vue
packages/web/src/stories/display/PuCell.story.vue
packages/web/src/stories/display/PuDescriptionList.story.vue
```

Verification target:

```
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run story:coverage

For implementation slices that touch public docs or generated skill references:

pnpm --filter @partner-up-dev/design-web run skill:generate
```

Verification result:

```
pnpm --filter @partner-up-dev/design-web run skill:generate
  passed; generated 56 agent skill files

pnpm --filter @partner-up-dev/design-web run type-check
  passed

pnpm --filter @partner-up-dev/design-web run story:coverage
  passed; 49/49 public components have stories

pnpm --filter @partner-up-dev/design-web run story:build
  passed; built 41 stories and 204 variants
```

Open questions:

```
1. Should PuPageScaffold support axis-specific padding props later, or should
   one `padding` prop remain the public API and CSS variables remain the escape
   hatch for axis overrides?

2. Should PuCell padding affect min-height, or should min-height remain owned by
   a separate row-size or density decision?
```

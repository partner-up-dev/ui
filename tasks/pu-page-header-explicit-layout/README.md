# PuPageHeader Explicit Layout

Status:

```
Implemented on 2026-06-14.
```

Problem:

```
PuPageHeader used container width to infer when title actions should move to a
second row. That made horizontal action placement unstable: insufficient inline
space could push actions under the title even when the product intent was a
single header row.
```

Decision:

```
Use an explicit layout prop:

layout="inline" // default
layout="stack"

inline keeps back, copy, and actions in one main row. Actions do not wrap onto a
second row because of container width.

stack gives actions their own row by explicit caller intent.
```

Touched source:

```
packages/web/src/components/puPageHeader/puPageHeader.ts
packages/web/src/components/puPageHeader/puPageHeader.vue
packages/web/src/components/puPageHeader/puPageHeader.scss
packages/web/src/stories/display/PuPageHeader.story.vue
```

Documentation sync:

```
docs/30-unit-tdd/web/composition-principles.md
packages/web/skill.seed.json
packages/web/skills/design-web/
tasks/content-presentation-components/pu-page-header.md
tasks/container-aware-page-scaffold/README.md
```

Verification target:

```
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run story:coverage
```

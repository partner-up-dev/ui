# Frontend Primitive Coverage Gap Task Packet

Purpose:

```
Capture which mvp-HA frontend primitives are not yet covered by
@partner-up-dev/design-web public APIs.
Separate design-system candidates from application compatibility wrappers and
domain-owned UI compositions.
```

Status:

```
Created on 2026-06-07 from repository inspection.
PuButton action/feedback contract implemented on 2026-06-08.
PuButton tone/variant split and circle shape implemented on 2026-06-08.
PuCard, PuChipGroup, and PuImg enhancement slice implemented on 2026-06-08.
```

Research inputs:

```
F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/shared/ui/AGENTS.md
F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/shared/ui/**
F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/domains/*/ui/primitives/**
packages/web/src/component-registry.ts
packages/web/skills/design-web/references/component-map.md
packages/web/src/components/**
```

Decision frame:

```
Use the design-web public registry as the coverage boundary.
Count a frontend primitive as covered when design-web exposes a public Pu*
component that handles the same durable UI intent, even if mvp-HA still keeps a
compatibility wrapper.

Do not treat domain-owned PR, Event, or WeChat compositions as design-system
gaps unless their lower-level interaction can be generalized without business
copy, routing, backend types, or workflow policy.
```

Files:

```
README.md
+-- packet entry, scope, and decision frame

coverage-gap.md
+-- initial inventory, coverage categories, recommended priority, and risks

implementation-plan.md
+-- planned implementation slices for PuCard, PuChipGroup, and PuImg

implementation-record.md
+-- implementation decisions and verification notes for the enhancement slice
```

Initial recommendation:

```
Prioritize low-domain, high-reuse primitives first:

1. PuAvatar
2. PuConfirmDialog
3. Link-capable and feedback-state PuButton contract
4. PuChoiceCard
5. PuFitChipGroup

Keep calendar, timeline policy, and domain card components out of design-web
until their product-specific semantics are separated from reusable mechanics.
```

PuButton decision:

```
Implement PuButton as the unified action primitive instead of adding
PuActionLink or PuFeedbackButton.

Use a structured `action` prop rather than flat href/to/native props:

type PuAction =
  | { native?: "button" | "submit" | "reset" }
  | { href: string; external?: boolean; target?: string; rel?: string }
  | { to: unknown }

The package has not published this contract broadly enough to justify legacy
compatibility. Remove the old theme/text/prefixIcon/suffixIcon/type/customStyle
API and replace it with slots plus canonical shape/tone/size props and a
narrow feedback prop.

Split visual treatment out of `tone`:

type PuButtonTone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "danger"

type PuButtonVariant =
  | "solid"
  | "soft"
  | "outline"
  | "ghost"
  | "dashed"

`tone` owns semantic color intent. `variant` owns treatment/emphasis.
`shape="pill"` uses a height-derived pill radius. `shape="circle"` is the
separate full-radius icon-button form.

Do not keep the old `type` prop. It mixed visual structure with native button
semantics. The old values were `WithText`, `OnlyIcon`, and `Bar`; the new button
should infer ordinary text/icon layout from slots and leave any future bar
layout to a separate proven contract.
```

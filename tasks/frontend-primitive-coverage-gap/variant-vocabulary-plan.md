# Variant Vocabulary Normalization Plan

Date: 2026-06-08

## Problem

```
The web package currently mixes semantic color roles and visual treatment in
the same vocabulary axis.

Examples:
- PuButton had outline, surface, ghost, and dashed inside tone.
- Shared PuTone still includes surface and outline.
- Surface/container components use PuSurfaceTone even though the values describe
  surface treatment, not semantic tone.
- PuWheelPicker exposes tone and variant with the same value set.
```

This makes API meaning unstable. A consumer cannot tell whether `tone="outline"`
means "neutral color with outline treatment" or "an outline-colored semantic
role".

## Vocabulary Decision

Use these axes:

```
tone
  General semantic color role for non-status UI.

status tone
  Feedback, system state, or business state semantic role.

control variant
  Visual treatment for controls and action-like compact elements.

container variant
  Visual treatment for containers that can combine with semantic tone.

surface level
  Neutral page/content surface layering when a component owns layout depth.

shape
  Geometry.
```

Do not introduce a broad `PuVariant` type. The prop name `variant` can be
standardized, but variant value sets should stay family-specific.

## Target Shared Types

```ts
export const puTones = [
  "neutral",
  "primary",
  "secondary",
  "tertiary",
  "danger",
] as const;

export type PuTone = (typeof puTones)[number];

export const puStatusTones = [
  "info",
  "success",
  "warning",
  "error",
] as const;

export type PuStatusTone = (typeof puStatusTones)[number];

export const puControlVariants = [
  "solid",
  "soft",
  "outline",
  "ghost",
  "dashed",
] as const;

export type PuControlVariant = (typeof puControlVariants)[number];

export const puContainerVariants = [
  "plain",
  "soft",
  "outline",
  "solid",
] as const;

export type PuContainerVariant = (typeof puContainerVariants)[number];

export const puSurfaceLevels = [
  "plain",
  "surface",
  "section",
  "inset-high",
] as const;

export type PuSurfaceLevel = (typeof puSurfaceLevels)[number];
```

`danger` and `error` intentionally stay separate:

```
danger
  A dangerous user action or affordance.

error
  A failed or invalid system/status state.
```

`soft` and `surface` intentionally stay separate:

```
soft
  A variant treatment that uses the current tone's container color. For example,
  neutral soft maps to a neutral surface container, while primary soft maps to
  primary-container.

surface
  A neutral surface level, not a colored variant. Use only when the component is
  expressing page/content depth.
```

## Type Comment Requirements

The source types must carry enough comments for maintainers and generated
documentation to preserve the distinction. Target comments:

```ts
/**
 * General semantic color role for non-status UI.
 *
 * Use danger for dangerous actions or affordances. Use PuStatusTone.error for
 * failed or invalid system states.
 */
export type PuTone = (typeof puTones)[number];

/**
 * Feedback, system state, or business state semantic role.
 */
export type PuStatusTone = (typeof puStatusTones)[number];

/**
 * Visual treatment for controls. Combines with PuTone.
 *
 * Example: tone="primary" variant="outline" means primary-colored outline
 * treatment; outline is not itself a tone.
 */
export type PuControlVariant = (typeof puControlVariants)[number];

/**
 * Visual treatment for container components. Combines with PuTone.
 *
 * soft uses the current tone's container color; outline keeps the current tone
 * as the border/accent treatment.
 */
export type PuContainerVariant = (typeof puContainerVariants)[number];

/**
 * Neutral content surface depth. Do not use for colored emphasis.
 */
export type PuSurfaceLevel = (typeof puSurfaceLevels)[number];
```

## Migration Rules

Controls:

```ts
tone?: PuTone;
variant?: PuControlVariant;
```

Use for:

```
PuButton
PuChip
PuSegmented
future action-like compact controls
```

Status surfaces:

```ts
tone?: PuStatusTone;
```

Use for:

```
PuInlineNotice
```

Mixed neutral/status feedback surfaces:

```ts
tone?: "neutral" | PuStatusTone;
```

Use for:

```
PuSnackbar
PuDialog if status styling remains part of the dialog contract
```

Containers and content surfaces:

```ts
tone?: PuTone;
variant?: PuContainerVariant;
```

Use for:

```
PuCard
PuEmptyState
PuPageHeader
```

Current value mapping:

```ts
tone="surface"   -> tone="neutral" variant="soft"
tone="outline"   -> tone="neutral" variant="outline"
tone="primary"   -> tone="primary" variant="soft"
tone="secondary" -> tone="secondary" variant="soft"
tone="tertiary"  -> tone="tertiary" variant="soft"
```

Surface-level components:

```ts
surfaceLevel?: PuSurfaceLevel;
```

Use only where the component owns layout/page depth rather than colored
emphasis:

```
PuBentoItem
PuCellGroup
PuDescriptionList
possibly PuPageHeader if section/inset-high remains a layout-depth feature
```

## CSS Modifier Rules

Modifier names must match prop axes:

```scss
.pu-button--tone-primary
.pu-button--variant-outline

.pu-card--tone-primary
.pu-card--variant-soft
.pu-card--variant-outline

.pu-bento-item--surface-level-section
.pu-inline-notice--tone-success
```

Avoid new modifiers like:

```scss
.pu-card--tone-outline
.pu-chip--tone-surface
.pu-segmented--tone-outline
```

## Implementation Order

1. Update shared vocabulary and docs.

   Files:

   ```
   packages/web/src/types/variants.ts
   docs/30-unit-tdd/web/component-contract.md
   ```

   Scope:

   ```
   - replace puCommonTones with puTones
   - keep PuTone as the general semantic color role
   - introduce puContainerVariants and PuContainerVariant
   - introduce puSurfaceLevels and PuSurfaceLevel only for neutral surface depth
   - keep puControlVariants and PuControlVariant
   - remove surface and outline from canonical tone docs
   - add source comments for every shared vocabulary axis
   ```

2. Migrate control components.

   Initial targets:

   ```
   PuChip
   PuSegmented
   ```

   Scope:

   ```
   - tone keeps semantic color values
   - variant receives soft/outline/solid/ghost/dashed as appropriate
   - update stories and generated references
   ```

3. Migrate container components.

   Initial targets:

   ```
   PuCard
   PuEmptyState
   PuPageHeader
   ```

   Scope:

   ```
   - use tone plus PuContainerVariant where colored emphasis can exist
   - update CSS modifiers to keep --tone-* and --variant-* separate
   - preserve soft/outline behavior through explicit tone + variant mappings
   ```

4. Migrate surface-level components.

   Initial targets:

   ```
   PuBentoItem
   PuCellGroup
   PuDescriptionList
   ```

   Scope:

   ```
   - use PuSurfaceLevel only for neutral page/content depth
   - avoid accepting primary/secondary/tertiary through surface-level props
   - update CSS modifiers to --surface-level-*
   ```

5. Clean legacy and edge cases.

   Targets:

   ```
   PuWheelPicker
   PuTag
   PuTextarea
   ```

   Scope:

   ```
   - fix PuWheelPicker tone/variant overlap and teritary typo
   - replace PuTag theme/outlined with tone/variant if it remains public
   - replace PuTextarea theme with a focused variant or surface-level contract
   ```

## Agent Skill Coverage

Generated agent references must explain the shared vocabulary, not just list
individual component props.

Required skill coverage:

```
1. Add a generated or copied reference page for variant vocabulary.
2. Link it from SKILL.md or usage-rules.md so consumers see it before choosing
   tone/variant props.
3. Component reference caveats must call out the family-specific type when a
   component uses variant:
   - PuButton uses PuControlVariant
   - PuCard-like containers use PuContainerVariant
   - page/content depth components use PuSurfaceLevel
4. Usage rules must explicitly say:
   - outline, ghost, dashed, soft, and solid are variants
   - primary, secondary, tertiary, neutral, and danger are tones
   - info, success, warning, and error are status tones
   - surface/section/inset-high are neutral surface levels
```

Candidate durable reference file:

```
packages/web/skills/design-web/references/variant-vocabulary.md
```

The skill generator should own this file if possible. If the generator does not
support package-level references yet, add the page as a generated static
reference and document the source seed.

## Verification

Minimum checks after each migration slice:

```powershell
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run build
```

For broad generated-doc or story usage updates:

```powershell
pnpm --filter @partner-up-dev/design-web run skill:generate
pnpm --filter @partner-up-dev/design-web run verify
```

Expected known warnings may remain until separate cleanup:

```
PuScrollView missing story coverage
PuPageScaffold layout story group warning
```

## Implementation Record

2026-06-08 first slice:

```
- Added canonical PuTone, PuStatusTone, PuControlVariant, PuContainerVariant,
  PuSurfaceLevel, and PuShape source comments in packages/web/src/types.
- Pointed PuButton tone at canonical PuTone and kept PuButton variant on
  PuControlVariant.
- Added docs/30-unit-tdd/web/variant-vocabulary.md as the durable source and
  copied it into the generated Agent Skill references.
- Updated generated skill first steps and usage rules to require reading the
  vocabulary reference before choosing tone, variant, surfaceLevel, or shape.
```

2026-06-08 component migration slice:

```
- Migrated PuChip and PuSegmented to canonical tone plus PuControlVariant.
- Migrated PuCard to canonical tone plus PuContainerVariant.
- Migrated PuEmptyState, PuPageHeader, PuBentoItem, PuCellGroup, and
  PuDescriptionList to surfaceLevel plus PuContainerVariant.
- Migrated PuWheelPicker to tone plus PuContainerVariant and removed the
  teritary compatibility typo.
- Migrated PuTag from theme/outlined/rounded and legacy sizes to tone, variant,
  shape, and xs/sm/md size.
- Migrated PuTextarea from theme to variant.
- Removed the deprecated PuLegacyTone/PuSurfaceTone shared exports after source
  migration no longer needed them.
```

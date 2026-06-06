# Implementation Record

Date:

```
2026-06-06
```

Summary:

```
Completed the hard-cut packages/web token migration.
No backward-compatibility aliases were kept for old typography token names.
```

## Implemented Changes

Token layer:

```
packages/web/src/styles/_ref.scss
+-- spacing converted to rem
+-- UI-scale radius converted to rem, pill kept at 999px
+-- old typography ramp replaced by hero/title/section/body/support/caption/control
+-- typography sizes use rem and line-heights are unitless
+-- generic size and icon token maps removed

packages/web/src/styles/_sys.scss
+-- size/icon base exports removed
+-- mobile overrides reduced to spacing and radius

packages/web/src/styles/_mixins.scss
+-- pu-font remains the typography entry point
+-- pu-icon no longer reads sys icon tokens; it is now an em-based iconfont helper

packages/web/src/styles/unocss-preset.ts
+-- colors, spacing, radius, shadows, and fonts now output var(--sys-...)
+-- old size/icon utility exports removed
+-- typography utilities use the new role names
```

Component layer:

```
Updated components and stories from old typography names to:
hero | title | section | body | support | caption | control

Removed component dependencies on:
--sys-size-*
--sys-icon-*
--sys-spacing-xxsmall
fn.sys-var(size, ...)
fn.sys-var(icon, ...)
```

## Verification

Commands run:

```
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run build
pnpm --filter @partner-up-dev/design-web run story:coverage
pnpm --filter @partner-up-dev/design-web run story:build
pnpm --filter @partner-up-dev/design-web run skill:validate
```

Results:

```
All commands passed.
story:coverage remains 38/45 public components, with the existing scaffold
backlog.
```

Static searches:

```
No packages/web/src or packages/web/dist hits for old typography names.
No packages/web/src or packages/web/dist hits for --sys-size-*.
No packages/web/src or packages/web/dist hits for --sys-icon-*.
No packages/web/src or packages/web/dist hits for --sys-spacing-xxsmall.
```

## Residual Risks

```
This was verified by compile/build/story build, not by pixel review. Visual
density and hierarchy should still be inspected in Histoire before publishing.

Some component-local dimensions remain literal px where they are precise drawing
or legacy component API values. That is intentional unless a later pass decides
to redesign those components.
```

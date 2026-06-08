# Histoire MDI Icons Diagnosis

Date: 2026-06-08

## Scope

Diagnose why Material Design Icons do not render in the Histoire sandbox for:

```text
http://localhost:6006/__sandbox.html?storyId=src-stories-display-pudescriptionlist-story-vue&variantId=src-stories-display-pudescriptionlist-story-vue-5
```

No package source files were changed for this diagnosis.

## Finding

The Histoire preview mounts the story and renders the `i-mdi-*` elements, but no
icon CSS is generated or injected.

Runtime evidence from the sandbox:

```text
iconCount: 2
matchingRuleCount: 0
classes:
- i-mdi-chevron-right
- i-mdi-content-copy
computed mask-image: none
computed background-image: none
```

The visible button layout remains because component SCSS gives the empty spans
size, but the actual icon mask/background rule is absent.

## Repository Evidence

`packages/web/src/stories/display/PuDescriptionList.story.vue` uses
`i-mdi-chevron-right` and `i-mdi-content-copy`.

`packages/web/vite.config.ts` only registers `@vitejs/plugin-vue`.

`packages/web/histoire.config.ts` only registers `@histoire/plugin-vue`.

There is no `uno.config.*` or `unocss.config.*` file in the workspace.

There is no actual `@unocss/vite` plugin usage in source.

`@unocss/preset-icons` is present only as part of the `unocss` dependency tree.

`@iconify-json/mdi` is not installed in the workspace.

## Local Generation Test

Using UnoCSS directly with `presetIcons()` and the current dependencies:

```text
input: i-mdi-chevron-right i-mdi-content-copy
matched: []
css: ""
```

This confirms the current dependency graph cannot produce the MDI icon CSS even
when the icon preset is enabled manually.

## Root Cause

The failure is a configuration/dependency gap, not a Histoire story rendering
failure and not a browser asset 404.

Two conditions are missing:

1. Histoire's Vite pipeline needs UnoCSS enabled so `i-mdi-*` classes are
   scanned and CSS is injected.
2. The MDI Iconify collection needs to be available, normally via
   `@iconify-json/mdi`, so `presetIcons()` can resolve those classes.

## Likely Fix Direction

Wire UnoCSS into the web package Vite/Histoire pipeline and include icons:

```ts
import UnoCSS from "unocss/vite";
import presetIcons from "@unocss/preset-icons";
import partnerUpDesignPreset from "./src/styles/unocss-preset";

UnoCSS({
  presets: [
    partnerUpDesignPreset(),
    presetIcons(),
  ],
});
```

Add `@iconify-json/mdi` to `packages/web` dev dependencies if the package keeps
using `i-mdi-*` classes in stories/components.

After changes, verify the sandbox has non-empty `.i-mdi-*` CSS rules and icon
elements report a non-`none` mask/background style.

## Implementation

Applied on 2026-06-08 after explicit start approval.

Changes:

```text
packages/web/package.json
+-- added @iconify-json/mdi as a dev dependency

packages/web/vite.config.ts
+-- added unocss/vite with the package preset and presetIcons({ warn: true })

packages/web/src/stories/histoire.setup.ts
+-- imported virtual:uno.css for Histoire preview CSS injection

packages/web/src/stories/histoire.d.ts
+-- declared virtual:uno.css for vue-tsc
```

Verification:

```text
pnpm --filter @partner-up-dev/design-web run type-check
+-- passed
+-- printed existing PuScrollView story coverage warning

pnpm --filter @partner-up-dev/design-web run story:build
+-- passed
+-- printed existing Histoire tree warning: group layout not found

UnoCSS direct generation test
+-- i-mdi-chevron-right and i-mdi-content-copy matched
+-- generated CSS includes mask rules

http://localhost:6006/__sandbox.html?storyId=src-stories-display-pudescriptionlist-story-vue&variantId=src-stories-display-pudescriptionlist-story-vue-5
+-- requested /__uno.css
+-- i-mdi-chevron-right and i-mdi-content-copy had non-none mask-image
+-- screenshot confirmed both icons visible
```

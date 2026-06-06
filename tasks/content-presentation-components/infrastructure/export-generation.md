# Export And Global Type Generation

Status:

```
Investigated after commit 297fbc4.
Implemented in current working tree.
```

## Implementation Record

Implemented files:

```
packages/web/scripts/generate-component-registry.mjs
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
packages/web/src/index.ts
packages/web/package.json
```

Generation commands:

```json
{
  "generate": "node scripts/generate-component-registry.mjs",
  "generate:check": "node scripts/generate-component-registry.mjs --check"
}
```

Build integration:

```json
{
  "type-check": "pnpm run generate:check && vue-tsc --noEmit",
  "build": "pnpm run generate && pnpm run clean && vite build && vue-tsc -p tsconfig.build.json --declaration --emitDeclarationOnly"
}
```

Runtime entry:

```
packages/web/src/index.ts
+-- imports generated default install tuple
+-- type-only re-exports generated GlobalComponents declaration for package consumers
+-- exports component-registry named exports
+-- installs every generated Pu* component globally
```

Registry API shape:

```
component-registry.ts
+-- named exports: PuButton, PuModal, ...
+-- default export: readonly install entries typed as Vue Component
```

Reason:

```
Root package exports expose the public component names.
The install list stays available to the plugin entry without expanding into a
large exact tuple type in the root public API.
```

Generated component registry includes nested component files such as:

```
src/components/puAccordion/puAccordion.vue     -> PuAccordion
src/components/puAccordion/puAccordionItem.vue -> PuAccordionItem
```

Verification:

```
pnpm --filter @partner-up-dev/design-web generate:check
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
temporary consumer vue-tsc check against dist/index.d.ts
```

Result:

```
All passed.
dist/index.d.ts preserves export type * from '../types/components'.
The consumer check confirms GlobalComponents['PuButton'] resolves after importing
@partner-up-dev/design-web.
Build emits Sass legacy JS API deprecation warnings from the current Sass toolchain.
```

## Current Manual Surfaces

Current files that must be updated for every public component:

```
packages/web/src/index.ts
+-- import component
+-- add install tuple
+-- add named export

packages/web/types/components.d.ts
+-- add Vue GlobalComponents entry
```

Current component list:

```
puAccordion
puButton
puCell
puCheckbox
puCheckboxGroup
puDesktopPageScaffold
puDrawer
puExpandableCard
puFooterRevealPageScaffold
puForm
puFormItem
puFullScreenPageScaffold
puImg
puImgCropper
puInfoRow
puInput
puModal
puAnnouncementBar
puPageScaffold
puPageScaffoldCentered
puPageScaffoldFlow
puPicker
puScrollView
puSurfaceCard
puTab
puTabs
puTag
puTextarea
puToggleSwitch
puWheelPicker
```

## Problem

The package currently has four synchronized lists:

```
imports
install registry
named exports
global component declarations
```

Risk:

```
Adding a component can compile locally while missing plugin install or IDE global
component support. The failure mode is delayed and consumer-facing.
```

## Recommended Direction

Use a Node script to scan `src/components/*` and generate deterministic source
files.

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Keep `packages/web/src/index.ts` small and stable:

```ts
import type { App } from 'vue'

import './styles/index.scss'

export * from './utils'
export * from './types'
export * from './component-registry'

import { components } from './component-registry'

export const version = '0.1.0'

export function install(app: App): void {
  components.forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default {
  install,
  version
}
```

## Scan Rule

Component folder contract:

```
src/components/puExample/
+-- puExample.vue
```

Generated public name:

```
puExample -> PuExample
```

Validation:

```
folder name must start with pu
folder must contain <folderName>.vue
public name must start with Pu
```

Special case:

```
puAccordion contains puAccordion.vue and puAccordionItem.vue.
```

Preferred fix:

```
Support multiple .vue files in a component folder.
Generate public names from each .vue file stem.
```

Result:

```
puAccordion/puAccordion.vue     -> PuAccordion
puAccordion/puAccordionItem.vue -> PuAccordionItem
```

## Generator Shape

Script path:

```
packages/web/scripts/generate-component-registry.mjs
```

Script responsibilities:

```
1. Scan src/components/*/*.vue.
2. Keep only files with stems starting with pu.
3. Convert stem to public component name.
4. Sort by public component name or path for stable diffs.
5. Write src/component-registry.ts.
6. Write types/components.d.ts.
7. Fail if existing generated content is stale in check mode.
```

Suggested commands:

```json
{
  "scripts": {
    "generate": "node scripts/generate-component-registry.mjs",
    "generate:check": "node scripts/generate-component-registry.mjs --check",
    "type-check": "pnpm run generate:check && vue-tsc --noEmit",
    "build": "pnpm run generate && pnpm run clean && vite build && vue-tsc -p tsconfig.build.json --declaration --emitDeclarationOnly"
  }
}
```

Alternative:

```
Use pnpm run generate before both type-check and build.
```

Reason:

```
check mode is better in CI because it catches uncommitted generated drift.
generate mode is better for local build convenience.
```

## Generated Registry Target

Example:

```ts
import PuAccordion from './components/puAccordion/puAccordion.vue'
import PuAccordionItem from './components/puAccordion/puAccordionItem.vue'
import PuButton from './components/puButton/puButton.vue'

export { PuAccordion, PuAccordionItem, PuButton }

export const components = [
  ['PuAccordion', PuAccordion],
  ['PuAccordionItem', PuAccordionItem],
  ['PuButton', PuButton],
] as const
```

## Generated Global Type Target

Example:

```ts
/**
 * This file is generated by scripts/generate-component-registry.mjs.
 * Do not edit manually.
 */
declare module 'vue' {
  export interface GlobalComponents {
    PuAccordion: typeof import('../src/components/puAccordion/puAccordion.vue')['default']
    PuAccordionItem: typeof import('../src/components/puAccordion/puAccordionItem.vue')['default']
    PuButton: typeof import('../src/components/puButton/puButton.vue')['default']
  }
}

export {}
```

## Why Script Generation Instead Of import.meta.glob

`import.meta.glob` can reduce runtime import boilerplate, but it is less suitable
for public named exports and global type declarations.

Script generation gives:

```
explicit named exports
stable declaration file
no runtime glob dependency in library entry
deterministic diffs
CI drift check
```

## Package Exports

Current package exports:

```json
"./components/*": "./src/components/*"
```

Short-term:

```
Keep this export unchanged.
Generated registry solves main entry and global component types.
```

Later:

```
Generate per-component index.ts files or package subpath exports if consumers need
stable imports like @partner-up-dev/design-web/components/PuButton.
```

## Implementation Steps

```
1. Add scripts/generate-component-registry.mjs.
2. Generate src/component-registry.ts.
3. Rewrite src/index.ts to consume component-registry.
4. Mark types/components.d.ts as generated.
5. Add generate and generate:check scripts.
6. Run generate, type-check, build.
7. Commit generated files and script together.
```

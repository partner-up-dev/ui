# Export Generation Industry Check

Status:

```
Checked current Vue UI ecosystem repositories and tooling on 2026-05-11.
```

## Summary

Finding:

```
Generated global component declarations and generated metadata are established
practices in mature Vue UI libraries.
```

Nuance:

```
Fully generated main named exports are common in some libraries and build
pipelines, while other large libraries keep an explicit central barrel file.
The stronger industry pattern is a single canonical component registry or export
surface, with derived files generated from it.
```

## Evidence

### Naive UI

Observed:

```
package script: gen-volar-dts
script: scripts/gen-component-declaration.ts
output: volar.d.ts
entry: src/index.ts exports src/components.ts
```

Interpretation:

```
Naive UI uses a central components export surface and generates Vue
GlobalComponents declarations for Volar.
```

Sources:

```
https://github.com/tusen-ai/naive-ui
https://raw.githubusercontent.com/tusen-ai/naive-ui/main/package.json
https://raw.githubusercontent.com/tusen-ai/naive-ui/main/scripts/gen-component-declaration.ts
https://raw.githubusercontent.com/tusen-ai/naive-ui/main/volar.d.ts
```

### PrimeVue

Observed:

```
prebuild script scans component folders
generates package exports
generates src/index.js
generates src/index.d.ts
build-api generates web-types and vetur metadata
```

Interpretation:

```
PrimeVue is the clearest example of build-time export and metadata generation.
It generates multiple derived artifacts from component directories.
```

Sources:

```
https://github.com/primefaces/primevue
https://raw.githubusercontent.com/primefaces/primevue/master/packages/primevue/package.json
https://raw.githubusercontent.com/primefaces/primevue/master/packages/primevue/scripts/prebuild.mjs
https://raw.githubusercontent.com/primefaces/primevue/master/packages/primevue/scripts/build-api.js
```

### Element Plus

Observed:

```
component generator script exists: pnpm gen
central package installer consumes packages/element-plus/component.ts
component package exposes many per-component exports
docs recommend unplugin-vue-components resolver for on-demand component use
```

Interpretation:

```
Element Plus combines explicit component export surfaces, generator scripts, and
ecosystem resolver support. It is less pure than a generated registry model, but
it still centralizes component install/export surfaces and automates repeated
component creation.
```

Sources:

```
https://github.com/element-plus/element-plus
https://raw.githubusercontent.com/element-plus/element-plus/dev/package.json
https://raw.githubusercontent.com/element-plus/element-plus/dev/scripts/gc.sh
https://raw.githubusercontent.com/element-plus/element-plus/dev/packages/element-plus/component.ts
https://element-plus.org/en-US/guide/quickstart.html
```

### Ant Design Vue

Observed:

```
central components/components.ts export surface
typings/global.d.ts for global component declarations
generator-webtypes script for IDE metadata
```

Interpretation:

```
Ant Design Vue uses a central export surface and ships global component typings.
It also generates editor metadata.
```

Sources:

```
https://github.com/vueComponent/ant-design-vue
https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/package.json
https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/components/components.ts
https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/typings/global.d.ts
```

### Vuetify

Observed:

```
central src/components/index.ts barrel
entry-bundler imports all components and directives
package exports expose components subpaths
typesVersions are configured
```

Interpretation:

```
Vuetify demonstrates the explicit central barrel approach. It confirms that
large Vue libraries avoid scattered ad hoc exports, even when generation is not
the visible mechanism.
```

Sources:

```
https://github.com/vuetifyjs/vuetify
https://raw.githubusercontent.com/vuetifyjs/vuetify/master/packages/vuetify/package.json
https://raw.githubusercontent.com/vuetifyjs/vuetify/master/packages/vuetify/src/components/index.ts
https://raw.githubusercontent.com/vuetifyjs/vuetify/master/packages/vuetify/src/entry-bundler.ts
```

### unplugin-vue-components

Observed:

```
auto-imports Vue components
generates components.d.ts
has resolvers for popular UI libraries
supports global type-only registration
```

Interpretation:

```
The broader Vue ecosystem treats generated component type declarations as normal
tooling. This supports adding a generated GlobalComponents file to design-web.
```

Sources:

```
https://github.com/unplugin/unplugin-vue-components
https://unplugin.unjs.io/showcase/unplugin-vue-components.html
```

## Decision For design-web

Recommended implementation:

```
Generate:
  packages/web/src/component-registry.ts
  packages/web/types/components.d.ts

Keep stable:
  packages/web/src/index.ts

Add scripts:
  generate
  generate:check
```

Reason:

```
This follows the proven part of the ecosystem pattern: one canonical component
discovery step, deterministic generated registry/type artifacts, and drift checks.
It is lighter than PrimeVue's package export generator and more automated than
maintaining the current four manual lists.
```

Guardrail:

```
The first implementation should generate only the registry and GlobalComponents
types. Package subpath exports can stay as-is until consumers need stricter
per-component import paths.
```


# PuCheckbox Reset Implementation Record

Date:

```text
2026-06-20
```

Scope:

```text
packages/web only.
packages/uniapp was not edited.
```

Implemented:

```text
Rebuilt PuCheckbox as a narrow native-checkbox component.
Removed PuCheckboxGroup from the web public registry.
Deleted the old PuCheckboxGroup story.
Replaced the old PuCheckbox story with focused coverage for controlled value,
sizes, tones, disabled states, and standalone icon usage.
```

Final PuCheckbox API:

```text
modelValue?: boolean
tone?: PuTone
size?: PuSize
disabled?: boolean
id?: string
name?: string
ariaLabel?: string
```

Emits:

```text
update:modelValue: boolean
change: boolean
```

Visual contract:

```text
Square token-driven box.
rem-based component sizing.
size values from PuSize: sm, md, lg.
tone values from PuTone: neutral, primary, secondary, tertiary, danger.
Native input semantics for keyboard, focus-visible, disabled, and form behavior.
```

Removed old API:

```text
PuCheckboxGroup
shape
type
trueValue
falseValue
checkedColor
inline
maxWidth
customLabelClass
customShapeClass
```

Updated generated and public surfaces:

```text
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
packages/web/skills/design-web/references/*
packages/web/MIGRATION.md
packages/web/docs/shape-audit.md
packages/web/histoire.config.ts
packages/web/skill.seed.json
```

Verification:

```text
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run story:coverage
pnpm --filter @partner-up-dev/design-web run verify
```

Result:

```text
All verification commands passed.
```


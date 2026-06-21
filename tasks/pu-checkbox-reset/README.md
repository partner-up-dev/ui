# PuCheckbox Reset Task Packet

Purpose:

```text
Remove the current web PuCheckbox and PuCheckboxGroup implementations and
their stories because the current styling, behavior, and API have drifted too
far from the desired checkbox primitive.

Capture the removal blast radius first, then rebuild only from an explicitly
accepted product and technical contract.
```

Status:

```text
Created on 2026-06-20 from repository inspection.
Exploration and task packet creation are complete.
Implementation started after explicit user approval on 2026-06-20.
Web PuCheckbox reset implemented on 2026-06-20.
```

Request classification:

```text
Reality:
The current public components do not match the desired checkbox direction.

Constraint:
Deleting public Pu* components changes package installation, generated
registry output, global component types, and generated web skill references.

Artifact:
This packet records the removal scope and the initial rebuild direction.
```

Reference input:

```text
/mnt/f/CODING/Project/Anana/Application/uniapp/src/sub_packages/ride_hailing/components/checkbox/checkbox.vue
```

Reference priority:

```text
Use the reference component for visual direction only. API shape and template
structure do not need to match it.

The stronger constraint is alignment with the current design-system norms:
token-driven styling, square-corner rectangular defaults, package-local visual
language, and web package behavior.
```

Scope:

```text
Only packages/web is in scope for implementation.
Do not edit packages/uniapp for this task. The UniApp application checkbox is
only a visual reference.
```

Packet files:

```text
README.md
+-- entry point, current status, and decision frame

removal-impact.md
+-- existing PuCheckbox / PuCheckboxGroup files, generated surfaces, and
    verification gates affected by a full removal

rebuild-direction.md
+-- early product and technical implications from the reference checkbox
    implementation

implementation-record.md
+-- final web-only implementation decisions, changed surfaces, and
    verification results
```

Execution boundary:

```text
Do not partially preserve the current PuCheckbox or PuCheckboxGroup API.
The reset should delete the current component implementations and stories,
then remove public references that would otherwise leave broken imports.

Do not introduce the replacement component in the same step unless the user
explicitly expands the scope. A clean removal gives the next design pass a
smaller and more honest baseline.
```

Open decisions before rebuild:

```text
1. Whether PuCheckbox should remain a public design-system component name
   after reset, or whether the next component should be introduced only after
   the new API is designed.
2. Whether PuCheckboxGroup is still a needed primitive, since the reference
   implementation only models an individual visual checkbox.
```

Accepted rebuild direction:

```text
Prefer `modelValue` for the controlled checkbox value instead of a `checked`
prop. Use rem-based sizing or package tokens, not hardcoded px values.

Implement three public sizes: `sm`, `md`, and `lg`. Reuse the web package's
common variant vocabulary instead of local checkbox-only values. In particular,
`size` should use `PuSize` from `packages/web/src/types/variants.ts`.

Support the existing common tones through `PuTone` from the same vocabulary:
`neutral`, `primary`, `secondary`, `tertiary`, and `danger`. Do not introduce a
checkbox-only tone enum.
```

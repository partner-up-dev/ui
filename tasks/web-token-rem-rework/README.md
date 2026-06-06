# Web Token Rem Rework Task Packet

Purpose:

```
Redesign packages/web typography, spacing, and size token semantics.
Move typography to rem-based, orthogonal roles.
Decide whether spacing and control size should also scale with root font size.
Remove token shapes that do not carry clear product meaning.
```

Status:

```
Implemented on 2026-06-06.
Hard-cut token migration completed for packages/web.
```

Discussion rule:

```
Future discussion outcomes for this token track should be synchronized into this
task packet. Keep files split by topic to avoid monofile drift.
```

Current confirmed decisions:

```
1. Typography token names:
   hero | title | section | body | support | caption | control

2. Typography token values should use rem.

3. The old Material-like typography stack should be simplified instead of kept
   as the main authoring vocabulary.

4. xxsmall spacing is not needed as a public system token. Existing
   --sys-spacing-xxsmall usage should migrate to --sys-spacing-xsmall.

5. Use one-shot hard-cut migration, not alias windows.

6. UnoCSS preset should output var(--sys-...) utilities rather than hard-coded
   duplicated token values.

7. icon-size may be a mistaken core token. Since icons are mostly iconfont spans,
   icon sizing should first be solved by typography, line-height, and padding on
   icon/text containers. Keep pixel-level icon handling only where a component
   proves it needs a fixed graphic box.

8. Use a hard-cut migration. The package has not been published, so do not keep
   backward-compatibility aliases or old token names for consumers.

9. Do not rename --sys-size-* to control-size by default. After removing
   first-class icon-size, reassess whether a generic size scale is still needed
   at all. Keep only dimensions with clear shared semantics.

10. Convert spacing tokens to rem.

11. Convert UI-scale radius tokens to rem. Keep pill as 999px because it is a
    shape sentinel rather than a root-font-relative measurement.

12. Numeric component width/height props keep their current meaning: a number
    serializes to CSS px. Token unit migration must not silently change runtime
    prop semantics.
```

Open decisions:

```
1. Whether sys size should remain as a public system token after icon-size is
   removed and component-local sizing is reviewed.
```

Files:

```
README.md
+-- packet entry, status, confirmed decisions, open decisions

token-model.md
+-- proposed token topology and unit policy

typography-scale.md
+-- proposed simplified typography roles and migration mapping

migration-plan.md
+-- one-shot implementation sequence and affected surfaces

verification-matrix.md
+-- checks needed before accepting the migration

implementation-record.md
+-- files changed, verification results, and follow-up risks
```

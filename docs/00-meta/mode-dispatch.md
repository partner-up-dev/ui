# Mode Dispatch

Modes are working postures. They do not decide ownership.

## Explore

Use when the next safe action depends on unknown repository state, unclear
blast radius, or missing evidence.

Exit when the next decision is explicit enough for Solidify, Execute, or
Diagnose.

## Solidify

Use when findings must become explicit claims, contracts, or decisions before
mutation.

Exit when the owning doc, code surface, and verification path are clear.

## Execute

Use when the owner and target change are clear.

For code or package-surface changes, read nearest AGENTS files and the relevant
TDD before editing.

## Diagnose

Use when reality disagrees with expected behavior.

Stay evidence-first. Record recurrence tripwires in the nearest local
`AGENTS.md` only after the cause is justified.

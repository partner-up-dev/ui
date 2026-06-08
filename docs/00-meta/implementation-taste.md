# Implementation Taste

Use this for non-trivial implementation work that shapes structure, boundaries,
data shape, state flow, authority flow, durable naming, abstraction, or
complexity budget.

## Preserve SSoT

Every durable fact, state, relationship, or decision should have one authority.
Replicas, generated files, caches, views, and derived data must point back to
their source.

## Respect Trust And Provenance

Values crossing a boundary should be treated as one of:

- authority fact
- stable reference
- command or proposal
- user-authored value
- derived projection

Do not make downstream package consumers depend on package internals when a
public API or documented contract exists.

## Name Durable Semantics Directly

Use names that expose package semantics and remain searchable. Keep `Pu*`
component naming, token vocabulary, event names, and slot names aligned across
durable docs and source.

## Spend Complexity For Return

Abstractions, compatibility layers, generated references, and new document
families must earn their cost through clarity, reliability, maintainability, or
evolvability.

Prefer repository idioms and existing package boundaries before introducing a
new pattern.

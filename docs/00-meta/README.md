# SVC Meta Layer

This directory owns repository-level operating rules for the SVC workflow in
PartnerUp Design.

Use it for agent and contributor routing, not package behavior.

## Files

- `input-routing.md`: classify incoming work and choose the durable owner.
- `mode-dispatch.md`: choose the current working posture.
- `destination-map.md`: map repository documentation to SVC layers.
- `implementation-taste.md`: shared implementation judgment for non-trivial
  design and code changes.

## Local Adaptation

PartnerUp Design does not currently need a PRD layer. Product-facing package
usage stays in README files, while durable technical truth lives in Product TDD,
Unit TDD, Deployment, local AGENTS files, and task packets.

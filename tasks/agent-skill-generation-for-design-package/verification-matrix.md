# Verification Matrix

## Static artifact checks

| Check | Purpose | Gate |
| --- | --- | --- |
| Required files exist | Ensure skill package shape is complete | fail |
| SKILL.md frontmatter valid | Agent metadata must be readable | fail |
| SKILL.md has required sections | Preserve procedural contract | fail |
| Root reference links resolve | Prevent dead navigation | fail |
| Component references resolve | Prevent broken map entries | fail |
| Files under size budget | Preserve progressive disclosure | warn or fail |

## Seed-map checks

| Check | Purpose | Gate |
| --- | --- | --- |
| Every public component has seed entry | Avoid silent omissions | fail |
| Ignored components include reason | Preserve audit trail | fail |
| Category exists | Keep taxonomy valid | fail |
| Story group matches seed | Align story taxonomy | warn |
| Primary props exist | Catch stale seed map | warn |
| Compose-with targets exist | Catch broken recipes | fail |

## Extraction checks

| Check | Purpose | Gate |
| --- | --- | --- |
| Props object found when present | API completeness | warn |
| Emits object found when present | API completeness | warn |
| Story variants extracted | Usage evidence | warn |
| Component source paths exist | Traceability | fail |

## Distribution checks

| Check | Purpose | Gate |
| --- | --- | --- |
| package files include skills/ | Publish artifact | fail |
| tanstack-intent keyword present | Intent discovery | fail when Intent adopted |
| intent validate passes | Skill format | fail |
| generated artifacts excluded if needed | Avoid package bloat | fail |

## Behavior checks

Behavior checks should use small dry-run prompts.

Candidate prompts:

```
Build a settings page using @partner-up-dev/design-web with a title, grouped
settings, one warning, and save/cancel actions.

Build a file submission form using @partner-up-dev/design-web with drag/drop and
URL upload.

Replace custom empty search result markup with the correct PartnerUp component.
```

Expected agent behavior:

```
loads the package skill
uses component map before inventing markup
loads selected component references only
uses package-specific API names
mentions caveats when relevant
does not edit the design package
```

## Regression signal

The generated skill should be considered stale when:

```
public component list changes
seed map changes
component prop, slot, or event API changes
story variants change
package contract changes
Intent stale check flags a source drift
```


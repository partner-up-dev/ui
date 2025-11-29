---
"@partner-up-dev/design-uniapp": patch
---

Fix issue using the package:

- Add default exports of `./styles`

Trivia optimization:

- Inject additionalData only to sass under `components/`
- Remove forward of `ref`, `sys` in `index.scss` since user should use CSS variables.

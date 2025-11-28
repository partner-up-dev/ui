---
"@partner-up-dev/design-uniapp": patch
---

Export styles in sass format following web-design pattern

- Added `./styles` export with sass format (`{ "sass": "./lib/styles/index.scss" }`)
- Added `./styles/mixins` export (`{ "sass": "./lib/styles/_mixins.scss" }`)
- Added `build:styles` script to copy src/styles to lib/styles at build time

---
"@partner-up-dev/design-web": patch
---

Correct PuDescriptionItem internal layout so list grid mode no longer leaks
into item classes. Items now normalize to stack or inline internally: inline
items keep label-value columns across viewport sizes, carry inline padding,
center simple rows vertically, and default values to end alignment. Stack items
keep suffix and action content in the label row, while inline items treat suffix
or action as the definition value instead of appending it after a separate
value.

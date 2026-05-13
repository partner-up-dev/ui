# Skeleton Library Survey

Status:

```
Researched on 2026-05-13.
No implementation started.
```
## Sources

```
Ant Design Skeleton:
https://ant.design/components/skeleton-cn/

MUI Skeleton:
https://mui.com/material-ui/react-skeleton/

Element Plus Skeleton:
https://element-plus.org/en-US/component/skeleton

Vuetify VSkeletonLoader:
https://vuetifyjs-vuetify.mintlify.app/components/skeleton-loader

Chakra UI Skeleton:
https://chakra-ui.com/docs/components/skeleton

Quasar QSkeleton:
https://quasar.dev/vue-components/skeleton/

Vant Skeleton:
https://develop365.gitlab.io/vant/en-US/skeleton/

MDN prefers-reduced-motion:
https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

MDN aria-busy:
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy
```

## API Families

### Shape Primitive

Examples:

```
MUI
Chakra UI
Quasar base QSkeleton types
```

Shape primitives expose a low-level bone:

```
text
circle / circular
rect / rectangular
rounded
```

Common controls:

```
width
height
animation
color or palette
border radius
underlying element
```

Strength:

```
Simple mental model.
Works well for custom layouts.
Keeps library surface small.
```

Cost:

```
Consumers compose card, list, and table skeletons manually.
Repeated composition can drift from the real loaded DOM.
```

### Template Container

Examples:

```
Ant Design
Element Plus
Vant
Vuetify
```

Template containers expose common content shapes:

```
avatar + title + paragraph
row count
row widths
card
article
list item
image
button
input
table-like groups
```

Common controls:

```
loading
rows / row
title
avatar
paragraph
template slot
repeat count
predefined type string
```

Strength:

```
Fast for common loading states.
Prevents each product screen from inventing one-off skeleton layouts.
```

Cost:

```
Preset DSLs grow quickly.
Component API can become a second layout system.
```

## Library Notes

### Ant Design

Observed shape:

```
Skeleton
+-- optional avatar
+-- optional title
+-- paragraph rows with width control

Skeleton.Avatar
Skeleton.Button
Skeleton.Input
Skeleton.Image
Skeleton.Node
```

Design signals:

```
Use for slow network, first-load data, and list/card content with many fields.
`loading` switches between placeholder and children.
`active` enables animation.
`round` controls rounded title and paragraph bones.
Semantic class/style escape hatches exist for internal parts.
```

### MUI

Observed shape:

```
Skeleton variant="text"
Skeleton variant="circular"
Skeleton variant="rectangular"
Skeleton variant="rounded"
```

Design signals:

```
Text skeleton can infer height from font-size.
Non-text variants use explicit width and height.
Animation supports pulse, wave, and disabled.
```

### Element Plus

Observed shape:

```
el-skeleton rows
el-skeleton animated
template slot
el-skeleton-item variant
```

Design signals:

```
Default skeleton is a title row plus paragraph rows.
The title row is narrower than the content rows.
The template slot is the main path for custom layouts.
Docs recommend matching the real DOM as closely as possible to avoid layout jump.
```

### Vuetify

Observed shape:

```
v-skeleton-loader type="card"
v-skeleton-loader type="article"
v-skeleton-loader type="list-item-avatar-two-line@5"
```

Design signals:

```
`type` is a compact preset DSL.
`@` syntax repeats a skeleton type.
`loading` switches between skeleton and default slot.
`boilerplate` removes animation for static wireframes.
`loadingText` feeds the accessibility label.
```

### Chakra UI

Observed shape:

```
Skeleton
SkeletonCircle
SkeletonText
```

Design signals:

```
`loading` switches between skeleton and children.
Variants are pulse, shine, and none.
Loaded content fades in.
Start and end colors are CSS variables.
```

### Quasar

Observed shape:

```
QSkeleton type="text"
QSkeleton type="rect"
QSkeleton type="circle"
special convenience types matching Quasar component geometry
```

Design signals:

```
Starts with basic shapes.
Adds convenience types that match local component sizes and radii.
Includes animation, sizing, color, border, and border-radius controls.
```

### Vant

Observed shape:

```
van-skeleton title avatar :row="3"
van-skeleton :loading="loading"
```

Design signals:

```
Mobile-first API.
Rows, title, avatar, title width, row widths, avatar size, avatar shape.
Animation is enabled by default.
```

## Cross-Library Patterns

Layout patterns:

```
single bone
text line
paragraph rows
title + paragraph
avatar + text
image + text card
article
button / input / image placeholder
list item repeated N times
table-like row groups
custom template matching the eventual DOM
```

Animation patterns:

```
none / static / boilerplate
pulse
wave / shimmer / shine
active / animated boolean alias
animation disabled under reduced-motion preference
```

State patterns:

```
Skeleton rendered directly.
Skeleton wraps children and uses loading to switch to real content.
Complex skeletons are composed from primitive bones.
Preset skeletons encode common product layouts.
```

Accessibility patterns:

```
Visual bones carry little semantic value.
One loading announcement per loading region is more useful than announcing each bone.
Repeated list skeletons need careful announcement behavior to avoid noisy screen reader output.
aria-busy belongs well on the region whose content is being updated.
prefers-reduced-motion should disable shimmer and pulse animations.
```

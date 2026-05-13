# PuFileUpload Implementation Record

Status:

```
Implemented first slice in packages/web on 2026-05-13.
Package verification and Histoire smoke checks passed on 2026-05-13.
Awaiting visual review.
```

## Source Files

```
packages/web/src/types/file-upload.ts
packages/web/src/components/puFileUpload/puFileUpload.ts
packages/web/src/components/puFileUpload/puFileUpload.vue
packages/web/src/components/puFileUpload/puFileUpload.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/forms/PuFileUpload.story.vue
```

Coverage:

```
packages/web/scripts/check-story-coverage.mjs
```

## Implemented Scope

```
array modelValue
multiple item collection by default
single-item replacement with multiple=false
native file picker
drag/drop dropzone
manual URL entry
file list
remove action
accept validation
maxSize validation
maxFiles validation
duplicate validation
custom URL validation hook
status/message rendering from item.status and item.message
slots for header/dropzone/item/actions surfaces
```

## Information Architecture

```
PuFileUpload
+-- header
|   +-- title
|   +-- description
+-- dropzone
|   +-- icon
|   +-- primary instruction
|   +-- secondary instruction
|   +-- choose files button
|   +-- hidden native input
+-- url entry
|   +-- label
|   +-- input[type=url]
|   +-- add URL button
+-- notice
|   +-- error OR helper
+-- selected file list
|   +-- item
|   |   +-- source icon
|   |   +-- name/meta
|   |   +-- status
|   |   +-- remove button
+-- actions slot
```

## DOM Target

```html
<section class="pu-file-upload pu-file-upload--mode-both">
  <header class="pu-file-upload__header">
    <h2 class="pu-file-upload__title">Attachments</h2>
    <p class="pu-file-upload__description">...</p>
  </header>

  <div class="pu-file-upload__dropzone" role="group">
    <div class="pu-file-upload__dropzone-icon"></div>
    <div class="pu-file-upload__dropzone-copy">
      <span class="pu-file-upload__dropzone-label">Drop files here</span>
      <span class="pu-file-upload__dropzone-description">...</span>
    </div>
    <button type="button" class="pu-file-upload__choose">Choose files</button>
    <input type="file" class="pu-file-upload__native" aria-hidden="true" />
  </div>

  <form class="pu-file-upload__url-entry" aria-label="Add file URL">
    <label class="pu-file-upload__url-label">File URL</label>
    <input type="url" class="pu-file-upload__url-input" />
    <button type="submit" class="pu-file-upload__url-add">Add URL</button>
  </form>

  <div class="pu-file-upload__notice"></div>

  <ul class="pu-file-upload__list" aria-label="Selected files">
    <li class="pu-file-upload__item pu-file-upload__item--source-file">
      <span class="pu-file-upload__item-icon"></span>
      <span class="pu-file-upload__item-main">
        <span class="pu-file-upload__item-name">contract.pdf</span>
        <span class="pu-file-upload__item-meta">PDF · 2.4 MB</span>
      </span>
      <span class="pu-file-upload__item-status">Uploaded</span>
      <span class="pu-file-upload__item-actions">
        <button type="button" class="pu-file-upload__item-remove"></button>
      </span>
    </li>
  </ul>
</section>
```

## Public API

```ts
type PuFileUploadMode = "file" | "url" | "both";

type PuFileUploadItem = {
  id: string;
  source: "file" | "url";
  name: string;
  url?: string;
  file?: File;
  size?: number;
  type?: string;
  status?: "idle" | "ready" | "uploading" | "success" | "error";
  message?: string;
};

props = {
  modelValue?: PuFileUploadItem[];
  mode?: PuFileUploadMode;             // default "both"
  multiple?: boolean;                  // default true
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  readonly?: boolean;
  title?: string;
  description?: string;
  helperText?: string;
  dropLabel?: string;
  dropDescription?: string;
  chooseLabel?: string;
  urlLabel?: string;
  urlPlaceholder?: string;
  urlAddLabel?: string;
  emptyLabel?: string;
  removeLabel?: string;
  validateUrl?: (url: string) => boolean | string;
}
```

Emits:

```ts
update:modelValue(items)
change(items)
add(items, event)
remove(item, event)
reject(rejections, event)
drop(files, event)
select(files, event)
addUrl(url, event)
```

Slots:

```ts
header
title
description
dropzone
dropzone-icon
helper
notice
item
item-actions
actions
```

## Story Variants

```
Basic
Selected Files
URL Only
Statuses
Single And Disabled
```

## Verification

Commands:

```powershell
pnpm --filter @partner-up-dev/design-web verify
git diff --check
```

Result:

```
passed
type-check
build
story:coverage
story:build
```

Histoire smoke checks at `http://localhost:6006`:

```
Basic
+-- one .pu-file-upload
+-- one dropzone
+-- one URL form
+-- URL add creates one list item

Selected Files
+-- two items
+-- file item: contract.pdf / PDF · 2.4 MB
+-- URL item: partner-brief.pdf / example.com

URL Only
+-- no dropzone
+-- one URL form
+-- empty text: No links added

Statuses
+-- three items
+-- uploading: venue-map.png
+-- success: signed-agreement.pdf / Uploaded
+-- error: missing-file.pdf / Unable to fetch

Single And Disabled
+-- two uploaders
+-- first uploader has one selected item
+-- second uploader has .is-disabled
```

Drag/hover coverage:

```
template events: dragenter, dragover, dragleave, drop
emit: drop(files, event)
state class: is-drag-active
CSS states: :hover and .is-drag-active
```

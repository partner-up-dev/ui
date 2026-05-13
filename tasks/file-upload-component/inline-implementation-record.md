# PuInlineFileUpload Implementation Record

Status:

```
Implemented in packages/web on 2026-05-13.
Histoire and package verification passed on 2026-05-13.
Awaiting visual review and API refinement.
```

## Source Files

```
packages/web/src/types/file-upload.ts
packages/web/src/components/puInlineFileUpload/puInlineFileUpload.ts
packages/web/src/components/puInlineFileUpload/puInlineFileUpload.vue
packages/web/src/components/puInlineFileUpload/puInlineFileUpload.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/forms/PuInlineFileUpload.story.vue
```

## Implemented Scope

```
single item value
one visible row
native file picker
drag/drop on the compact row
hover and drag-active visual states
same-row URL edit mode
remove/replace actions
accept validation
maxSize validation
custom URL validation hook
status/message rendering from item.status and item.message
```

## DOM Target

Empty:

```html
<div class="pu-inline-file-upload pu-inline-file-upload--mode-both">
  <div class="pu-inline-file-upload__control">
    <span class="pu-inline-file-upload__icon"></span>
    <div class="pu-inline-file-upload__content">
      <span class="pu-inline-file-upload__placeholder">Attach a file</span>
    </div>
    <div class="pu-inline-file-upload__actions">
      <button type="button">Choose</button>
      <button type="button">URL</button>
    </div>
  </div>
  <input type="file" class="pu-inline-file-upload__native" aria-hidden="true" />
</div>
```

URL edit:

```html
<form class="pu-inline-file-upload__control">
  <span class="pu-inline-file-upload__icon"></span>
  <div class="pu-inline-file-upload__content">
    <input type="url" class="pu-inline-file-upload__url-input" />
  </div>
  <div class="pu-inline-file-upload__actions">
    <button type="submit">Add</button>
    <button type="button" aria-label="Cancel URL entry">...</button>
  </div>
</form>
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
  modelValue?: PuFileUploadItem | null;
  mode?: PuFileUploadMode;             // default "both"
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  chooseLabel?: string;
  urlLabel?: string;
  urlPlaceholder?: string;
  urlAddLabel?: string;
  removeLabel?: string;
  replaceLabel?: string;
  validateUrl?: (url: string) => boolean | string;
}
```

Emits:

```ts
update:modelValue(value)
change(value)
add(item, event)
remove(item, event)
reject(rejections, event)
drop(files, event)
select(files, event)
addUrl(url, event)
toggleUrl(open)
```

Slots:

```ts
icon
placeholder
item
actions
```

## Story Variants

```
Basic
Selected File
URL Entry
Statuses
Disabled And Readonly
```

## Verification

Commands:

```powershell
pnpm --filter @partner-up-dev/design-web verify
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
+-- one .pu-inline-file-upload__control
+-- text: Attach a file
+-- actions: Choose, URL

URL edit
+-- URL button opens same-row input
+-- input placeholder: https://example.com/file.pdf
+-- actions: Add, Cancel URL entry
+-- add URL result: report.pdf / example.com / Replace / Edit

Selected File
+-- text: contract.pdf / PDF · 2.4 MB / Replace / URL

Statuses
+-- first row: venue-map.png / Uploaded
+-- second row: missing-file.pdf / Unable to fetch

Disabled And Readonly
+-- two compact rows
+-- one .is-disabled
+-- one .is-readonly
```

Drag/hover coverage:

```
template events: dragenter, dragover, dragleave, drop
emit: drop(files, event)
state class: is-drag-active
CSS states: :hover and .is-drag-active
```

Accessibility notes:

```
custom Choose button is the keyboard-visible file picker entry
hidden native input is aria-hidden and tabindex=-1
URL edit cancel button is labelled "Cancel URL entry"
```

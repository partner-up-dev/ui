# File Upload Component IA Draft

Status:

```
Implemented first slice on 2026-05-13.
See implementation-record.md for current source and API record.
```

## Proposed Name

```
PuFileUpload
```

Related compact component:

```
PuInlineFileUpload
```

See:

```
inline-ia-draft.md
```

## Role

`PuFileUpload` collects one or more upload inputs from three entry paths:

```
drag file into dropzone
choose file from native file picker
enter remote file URL manually
```

It should be an input component, not a network uploader. The component should
collect and validate file/url candidates, then emit changes and submit intents.
Actual upload transport belongs to the consumer.

## Information Architecture

Default mode:

```
PuFileUpload
+-- header
|   +-- title
|   +-- optional description
+-- dropzone
|   +-- icon
|   +-- primary instruction
|   +-- secondary constraints
|   +-- choose-file button
|   +-- hidden native file input
+-- url entry
|   +-- url input
|   +-- add-url button
+-- file list
|   +-- file item
|   |   +-- file icon / preview
|   |   +-- file name
|   |   +-- file meta
|   |   +-- status
|   |   +-- remove action
|   +-- file item
+-- optional notice / error
+-- optional actions
```

ASCII DOM:

```
component.pu-file-upload
+-- header.pu-file-upload__header
|   +-- h2.pu-file-upload__title
|   +-- p.pu-file-upload__description
+-- div.pu-file-upload__dropzone
|   +-- div.pu-file-upload__dropzone-icon
|   +-- div.pu-file-upload__dropzone-copy
|   +-- button.pu-file-upload__choose
|   +-- input[type=file].pu-file-upload__native
+-- form.pu-file-upload__url-entry
|   +-- input[type=url].pu-file-upload__url-input
|   +-- button.pu-file-upload__url-add
+-- ul.pu-file-upload__list
|   +-- li.pu-file-upload__item
|   |   +-- div.pu-file-upload__item-main
|   |   +-- div.pu-file-upload__item-status
|   |   +-- button.pu-file-upload__item-remove
+-- div.pu-file-upload__notice
+-- div.pu-file-upload__actions
```

## Entry Modes

Implemented first slice:

```ts
type PuFileUploadMode = "file" | "url" | "both";
```

Default:

```
both
```

Meaning:

```
file  -> native file picker and drag/drop only
url   -> manual URL entry only
both  -> file picker, drag/drop, and URL entry
```

## Value Model

Use a normalized item model so local files and URLs can share one list.

```ts
type PuFileUploadItemSource = "file" | "url";
type PuFileUploadItemStatus =
  | "idle"
  | "ready"
  | "uploading"
  | "success"
  | "error";

type PuFileUploadItem = {
  id: string;
  source: PuFileUploadItemSource;
  name: string;
  url?: string;
  file?: File;
  size?: number;
  type?: string;
  status?: PuFileUploadItemStatus;
  message?: string;
};
```

## Public API Sketch

```ts
props = {
  modelValue?: PuFileUploadItem[];
  mode?: "file" | "url" | "both";       // default "both"
  multiple?: boolean;                    // default false
  accept?: string;                       // native input accept
  maxFiles?: number;
  maxSize?: number;                      // bytes
  disabled?: boolean;
  readonly?: boolean;
  title?: string;
  description?: string;
  helperText?: string;
  dropLabel?: string;
  chooseLabel?: string;
  urlPlaceholder?: string;
  urlAddLabel?: string;
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
title
description
dropzone
dropzone-icon
helper
item
item-actions
notice
actions
```

## Candidate States

Root states:

```
idle
drag-active
disabled
readonly
invalid
has-items
```

Item states:

```
ready
uploading
success
error
```

Rejection reasons:

```
too-many-files
file-too-large
file-type-not-accepted
invalid-url
duplicate
disabled
readonly
```

## Accessibility Notes

```
Dropzone should expose a button-like or group-like focus target.
Native input should remain programmatically connected to the choose button.
Drag/drop should be additive, with file picker available as the keyboard path.
URL form needs a visible label or aria-label.
Errors and rejections should be announced through role=alert or a live region.
File list should be a real list.
Remove actions need item-specific accessible names.
```

## Open Questions

```
1. Async transport remains consumer-owned.
2. URL entry is visible when mode is "url" or "both".
3. Duplicate detection compares file name/size/type and exact URL string.
4. Image preview is left to the item slot.
5. maxSize uses bytes.
```

# PuInlineFileUpload IA Draft

Status:

```
Implemented on 2026-05-13.
See inline-implementation-record.md for current source and API record.
```

## Proposed Name

```
PuInlineFileUpload
```

## Relationship To PuFileUpload

```
PuFileUpload        -> full uploader panel for dropzone-first workflows
PuInlineFileUpload  -> compact field/control for form rows and dense settings screens
```

They should share the same value item model and validation vocabulary.

Shared value:

```ts
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
```

## Role

`PuInlineFileUpload` collects one attachment in a compact one-line control. It
is suited for forms where the file upload is one field among many.

Examples:

```
profile document
event cover image
receipt attachment
external file link
one-off CSV import field
```

## Constraints

```
single file only
one visible row only
no expanded second row
no multi-file list
no preview grid
```

## Information Architecture

Default one-line mode:

```
PuInlineFileUpload
+-- label / title area
+-- one-line control
    +-- leading icon / status
    +-- primary content slot
    |   +-- file name OR URL input OR placeholder
    +-- trailing actions
        +-- choose-file button
        +-- URL mode button
        +-- remove button
+-- hidden native file input
```

ASCII DOM:

```
component.pu-inline-file-upload
+-- div.pu-inline-file-upload__control
|   +-- span.pu-inline-file-upload__icon
|   +-- div.pu-inline-file-upload__content
|   |   +-- span.file-name OR input[type=url] OR span.placeholder
|   +-- div.pu-inline-file-upload__actions
|       +-- button.choose
|       +-- button.url
|       +-- button.remove
+-- input[type=file].pu-inline-file-upload__native
```

Spatial sketch:

```
┌──────────────────────────────────────────────────────────────┐
│ [icon]  Attach a file                         [Choose] [URL] │
└──────────────────────────────────────────────────────────────┘
```

Selected file:

```
┌──────────────────────────────────────────────────────────────┐
│ [file]  contract.pdf · 2.4MB                  [Replace] [×]  │
└──────────────────────────────────────────────────────────────┘
```

URL edit mode:

```
┌──────────────────────────────────────────────────────────────┐
│ [link]  https://example.com/file.pdf             [Add] [×]   │
└──────────────────────────────────────────────────────────────┘
```

URL selected:

```
┌──────────────────────────────────────────────────────────────┐
│ [link]  example.com/file.pdf                     [Edit] [×]  │
└──────────────────────────────────────────────────────────────┘
```

## UI Behavior

Empty state:

```
left icon
prompt such as "Attach a file"
choose button
URL action
```

Selected file state:

```
file name
file size/type or URL domain
status badge/text
replace action
remove action
```

URL edit state:

```
URL input replaces the placeholder/file-name content inside the same row.
Add button confirms the URL.
Remove/cancel button exits URL mode or clears the selected value.
```

Drag state:

```
entire one-line control acts as a compact drop target.
visual state should be restrained because this component lives inside forms.
hover and drag-active states are required.
```

## Public API Sketch

```ts
props = {
  modelValue?: PuFileUploadItem | null;
  mode?: "file" | "url" | "both";       // default "both"
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;                  // default "Attach a file"
  chooseLabel?: string;                  // default "Choose"
  urlLabel?: string;                     // default "URL"
  urlPlaceholder?: string;
  urlAddLabel?: string;                  // default "Add"
  removeLabel?: string;                  // default "Remove file"
  replaceLabel?: string;                 // default "Replace"
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
notice
```

## Single vs Multiple

Recommended default:

```
single item
```

Reason:

```
Inline controls are form-field sized. Single item keeps the component readable
inside one row. Multiple file management belongs to PuFileUpload.
```

## Accessibility Notes

```
Choose file must be a real button associated with the hidden file input.
Compact drop target should be keyboard equivalent through the choose button.
URL entry should be a real form with input type=url.
Status/error text should be tied by aria-describedby.
Remove/replace labels should include the item name.
Drag active state should not be the only signal for accepting files.
```

## First Slice Recommendation

Implement after the full IA is confirmed:

```
single item by default
mode="both"
drag/drop on compact control
native file picker
same-row URL edit mode
remove/replace
basic accept/maxSize validation
status rendering from item.status
```

Defer:

```
image preview grid
upload transport
chunk upload
directory upload
async URL metadata fetching
large multi-file management
```

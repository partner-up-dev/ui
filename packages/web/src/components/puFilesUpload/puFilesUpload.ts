import type { PropType } from "vue";
import {
  puFileUploadLayouts,
  puFileUploadModes,
  type PuFileUploadItem,
  type PuFileUploadLayout,
  type PuFileUploadMode,
  type PuFileUploadRejection,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuFilesUploadValue = PuFileUploadItem[];
export type PuFilesUploadUrlValidator = (url: string) => boolean | string;

export const puFilesUploadProps = {
  modelValue: {
    type: Array as PropType<PuFilesUploadValue>,
    default: () => [],
  },
  mode: {
    type: String as PropType<PuFileUploadMode>,
    default: "both",
    validator: (value: string) => puFileUploadModes.includes(value as PuFileUploadMode),
  },
  layout: {
    type: String as PropType<PuFileUploadLayout>,
    default: "panel",
    validator: (value: string) => puFileUploadLayouts.includes(value as PuFileUploadLayout),
  },
  accept: makeStringProp(""),
  maxFiles: {
    type: Number,
    default: undefined,
  },
  maxSize: {
    type: Number,
    default: undefined,
  },
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  title: makeStringProp<string | undefined>(undefined),
  description: makeStringProp<string | undefined>(undefined),
  helperText: makeStringProp<string | undefined>(undefined),
  dropLabel: makeStringProp("Drop files here"),
  dropDescription: makeStringProp("Choose files or drag them into this area."),
  chooseLabel: makeStringProp("Choose files"),
  placeholder: makeStringProp("Attach files"),
  urlLabel: makeStringProp("File URL"),
  urlPlaceholder: makeStringProp("https://example.com/file.pdf"),
  urlAddLabel: makeStringProp("Add URL"),
  emptyLabel: makeStringProp("No files added"),
  removeLabel: makeStringProp("Remove file"),
  clearLabel: makeStringProp("Clear files"),
  replaceOnAdd: makeBooleanProp(false),
  validateUrl: {
    type: Function as PropType<PuFilesUploadUrlValidator>,
    default: undefined,
  },
};

export const puFilesUploadEmits = {
  "update:modelValue": (_items: PuFilesUploadValue) => true,
  change: (_items: PuFilesUploadValue) => true,
  add: (_items: PuFileUploadItem[], _event: Event) => true,
  remove: (_item: PuFileUploadItem, _event: Event) => true,
  reject: (_rejections: PuFileUploadRejection[], _event: Event) => true,
  drop: (_files: File[], _event: DragEvent) => true,
  select: (_files: File[], _event: Event) => true,
  addUrl: (_url: string, _event: Event) => true,
  toggleUrl: (_open: boolean) => true,
};

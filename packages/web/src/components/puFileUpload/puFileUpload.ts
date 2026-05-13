import type { PropType } from "vue";
import {
  puFileUploadModes,
  type PuFileUploadItem,
  type PuFileUploadMode,
  type PuFileUploadRejection,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuFileUploadValue = PuFileUploadItem[];
export type PuFileUploadUrlValidator = (url: string) => boolean | string;

export const puFileUploadProps = {
  modelValue: {
    type: Array as PropType<PuFileUploadValue>,
    default: () => [],
  },
  mode: {
    type: String as PropType<PuFileUploadMode>,
    default: "both",
    validator: (value: string) => puFileUploadModes.includes(value as PuFileUploadMode),
  },
  multiple: makeBooleanProp(true),
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
  urlLabel: makeStringProp("File URL"),
  urlPlaceholder: makeStringProp("https://example.com/file.pdf"),
  urlAddLabel: makeStringProp("Add URL"),
  emptyLabel: makeStringProp("No files added"),
  removeLabel: makeStringProp("Remove file"),
  validateUrl: {
    type: Function as PropType<PuFileUploadUrlValidator>,
    default: undefined,
  },
};

export const puFileUploadEmits = {
  "update:modelValue": (_items: PuFileUploadValue) => true,
  change: (_items: PuFileUploadValue) => true,
  add: (_items: PuFileUploadItem[], _event: Event) => true,
  remove: (_item: PuFileUploadItem, _event: Event) => true,
  reject: (_rejections: PuFileUploadRejection[], _event: Event) => true,
  drop: (_files: File[], _event: DragEvent) => true,
  select: (_files: File[], _event: Event) => true,
  addUrl: (_url: string, _event: Event) => true,
};

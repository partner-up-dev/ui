import type { PropType } from "vue";
import {
  puFileUploadModes,
  type PuFileUploadItem,
  type PuFileUploadMode,
  type PuFileUploadRejection,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuInlineFileUploadValue = PuFileUploadItem | null;
export type PuInlineFileUploadUrlValidator = (url: string) => boolean | string;

export const puInlineFileUploadProps = {
  modelValue: {
    type: Object as PropType<PuInlineFileUploadValue>,
    default: null,
  },
  mode: {
    type: String as PropType<PuFileUploadMode>,
    default: "both",
    validator: (value: string) => puFileUploadModes.includes(value as PuFileUploadMode),
  },
  accept: makeStringProp(""),
  maxSize: {
    type: Number,
    default: undefined,
  },
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  placeholder: makeStringProp("Attach a file"),
  chooseLabel: makeStringProp("Choose"),
  urlLabel: makeStringProp("URL"),
  urlPlaceholder: makeStringProp("https://example.com/file.pdf"),
  urlAddLabel: makeStringProp("Add"),
  removeLabel: makeStringProp("Remove file"),
  replaceLabel: makeStringProp("Replace"),
  validateUrl: {
    type: Function as PropType<PuInlineFileUploadUrlValidator>,
    default: undefined,
  },
};

export const puInlineFileUploadEmits = {
  "update:modelValue": (_value: PuInlineFileUploadValue) => true,
  change: (_value: PuInlineFileUploadValue) => true,
  add: (_item: PuFileUploadItem, _event: Event) => true,
  remove: (_item: PuFileUploadItem, _event: Event) => true,
  reject: (_rejections: PuFileUploadRejection[], _event: Event) => true,
  drop: (_files: File[], _event: DragEvent) => true,
  select: (_files: File[], _event: Event) => true,
  addUrl: (_url: string, _event: Event) => true,
  toggleUrl: (_open: boolean) => true,
};

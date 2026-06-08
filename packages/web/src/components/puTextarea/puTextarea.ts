import type { PropType } from "vue";
import {
  puContainerVariants,
  type PuContainerVariant,
} from "../../types";
import {
  baseProps,
  makeBooleanProp,
  makeNumberProp,
  makeStringProp,
  numericProp,
} from "../../utils/props";

export type PuTextareaVariant = PuContainerVariant;

export const puTextareaProps = {
  ...baseProps,
  modelValue: makeStringProp(""),
  placeholder: makeStringProp("请输入..."),
  maxlength: { type: numericProp as PropType<number | string>, default: -1 },
  showCount: makeBooleanProp(false),
  autoHeight: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  focus: makeBooleanProp(false),
  confirmType: makeStringProp<"send" | "search" | "next" | "go" | "done">("done"),
  showConfirmBar: makeBooleanProp(true),
  holdKeyboard: makeBooleanProp(false),
  cursorSpacing: makeNumberProp(16),
  adjustPosition: makeBooleanProp(true),
  fixed: makeBooleanProp(false),
  disableDefaultPadding: makeBooleanProp(false),
  height: makeNumberProp(80),
  focusHeight: { type: Number as PropType<number | undefined>, default: undefined },
  variant: {
    type: String as PropType<PuTextareaVariant>,
    default: "soft",
    validator: (value: string) =>
      puContainerVariants.includes(value as PuTextareaVariant),
  },
};

export const puTextareaEmits = {
  "update:modelValue": (value: string) => true,
  input: (value: string) => true,
  focus: (e: any) => true,
  blur: (e: any) => true,
  confirm: (e: any) => true,
  linechange: (e: any) => true,
};

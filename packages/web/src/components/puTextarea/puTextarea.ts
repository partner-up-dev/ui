import type { PropType } from "vue";
import {
  puFieldVariants,
  puSizes,
  puTones,
  type PuFieldVariant,
  type PuSize,
  type PuTone,
} from "../../types";
import { makeBooleanProp, makeNumberProp, makeStringProp } from "../../utils/props";

export type PuTextareaSize = PuSize;
export type PuTextareaVariant = PuFieldVariant;
export type PuTextareaTone = PuTone;

export const puTextareaProps = {
  modelValue: makeStringProp(""),
  placeholder: makeStringProp(""),
  maxlength: makeNumberProp(-1),
  showCount: makeBooleanProp(false),
  autoHeight: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  invalid: makeBooleanProp(false),
  size: {
    type: String as PropType<PuTextareaSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuTextareaSize),
  },
  variant: {
    type: String as PropType<PuTextareaVariant>,
    default: "outline",
    validator: (value: string) =>
      puFieldVariants.includes(value as PuTextareaVariant),
  },
  tone: {
    type: String as PropType<PuTextareaTone>,
    default: "neutral",
    validator: (value: string) => puTones.includes(value as PuTextareaTone),
  },
};

export type PuTextareaProps = typeof puTextareaProps;

export const puTextareaEmits = {
  "update:modelValue": (_value: string) => true,
  change: (_value: string, _event: Event) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
};

export type PuTextareaEmits = typeof puTextareaEmits;

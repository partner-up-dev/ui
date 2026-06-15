import type { PropType } from "vue";
import { puControlVariants, puSizes, type PuControlVariant } from "../../types";
import { makeBooleanProp, makeNumberProp, makeStringProp } from "../../utils/props";
import {
  puChipShapes,
  puChipTones,
  type PuChipShape,
  type PuChipSize,
  type PuChipTone,
} from "../puChip/puChip";

export type PuChipInputValue = string;
export type PuChipInputSize = PuChipSize;
export type PuChipInputTone = PuChipTone;
export type PuChipInputVariant = PuControlVariant;
export type PuChipInputShape = PuChipShape;
export type PuChipInputCommitSource = "keyboard" | "blur";

export interface PuChipInputCommitContext {
  event: Event;
  source: PuChipInputCommitSource;
}

export const puChipInputProps = {
  modelValue: makeStringProp(""),
  placeholder: makeStringProp(""),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  invalid: makeBooleanProp(false),
  size: {
    type: String as PropType<PuChipInputSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuChipInputSize),
  },
  tone: {
    type: String as PropType<PuChipInputTone>,
    default: "neutral",
    validator: (value: string) => puChipTones.includes(value as PuChipInputTone),
  },
  variant: {
    type: String as PropType<PuChipInputVariant>,
    default: "soft",
    validator: (value: string) =>
      puControlVariants.includes(value as PuChipInputVariant),
  },
  shape: {
    type: String as PropType<PuChipInputShape>,
    default: "rect",
    validator: (value: string) => puChipShapes.includes(value as PuChipInputShape),
  },
  removable: makeBooleanProp(true),
  removeLabel: makeStringProp("Remove chip"),
  maxlength: makeNumberProp(-1),
  commitOnBlur: makeBooleanProp(false),
  selectOnFocus: makeBooleanProp(false),
  prefixIcon: makeStringProp<string | undefined>(undefined),
  suffixIcon: makeStringProp<string | undefined>(undefined),
};

export type PuChipInputProps = typeof puChipInputProps;

export const puChipInputEmits = {
  "update:modelValue": (_value: PuChipInputValue) => true,
  change: (_value: PuChipInputValue, _event: Event) => true,
  commit: (
    _value: PuChipInputValue,
    _context: PuChipInputCommitContext,
  ) => true,
  cancel: (_value: PuChipInputValue, _event: KeyboardEvent) => true,
  remove: (_value: PuChipInputValue, _event: MouseEvent) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
  click: (_event: MouseEvent) => true,
};

export type PuChipInputEmits = typeof puChipInputEmits;

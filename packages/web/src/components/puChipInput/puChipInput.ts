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
import { puChipShapes, type PuChipShape } from "../puChip/puChip";

export type PuChipInputValue = string[];
export type PuChipInputSize = PuSize;
export type PuChipInputVariant = PuFieldVariant;
export type PuChipInputTone = PuTone;
export type PuChipInputShape = PuChipShape;
export type PuChipInputChangeSource =
  | "keyboard"
  | "separator"
  | "blur"
  | "remove"
  | "clear";

export interface PuChipInputChangeContext {
  event: Event;
  source: PuChipInputChangeSource;
}

export const puChipInputProps = {
  modelValue: {
    type: Array as PropType<PuChipInputValue>,
    default: () => [],
  },
  draftValue: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  placeholder: makeStringProp(""),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  invalid: makeBooleanProp(false),
  size: {
    type: String as PropType<PuChipInputSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuChipInputSize),
  },
  variant: {
    type: String as PropType<PuChipInputVariant>,
    default: "outline",
    validator: (value: string) =>
      puFieldVariants.includes(value as PuChipInputVariant),
  },
  tone: {
    type: String as PropType<PuChipInputTone>,
    default: "neutral",
    validator: (value: string) => puTones.includes(value as PuChipInputTone),
  },
  shape: {
    type: String as PropType<PuChipInputShape>,
    default: "rect",
    validator: (value: string) => puChipShapes.includes(value as PuChipInputShape),
  },
  max: makeNumberProp(-1),
  allowDuplicates: makeBooleanProp(false),
  separators: {
    type: Array as PropType<string[]>,
    default: () => [","],
    validator: (value: string[]) =>
      value.every((separator) => separator.length > 0),
  },
  addOnBlur: makeBooleanProp(false),
  clearable: makeBooleanProp(false),
  removeLabel: makeStringProp("Remove chip"),
};

export type PuChipInputProps = typeof puChipInputProps;

export const puChipInputEmits = {
  "update:modelValue": (_value: PuChipInputValue) => true,
  "update:draftValue": (_value: string) => true,
  change: (_value: PuChipInputValue, _event: Event) => true,
  add: (
    _value: string,
    _context: PuChipInputChangeContext,
  ) => true,
  remove: (
    _value: string,
    _index: number,
    _context: PuChipInputChangeContext,
  ) => true,
  clear: (_event: Event) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
};

export type PuChipInputEmits = typeof puChipInputEmits;

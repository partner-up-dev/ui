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

export type PuChipsEditorValue = string[];
export type PuChipsEditorSize = PuSize;
export type PuChipsEditorVariant = PuFieldVariant;
export type PuChipsEditorTone = PuTone;
export type PuChipsEditorShape = PuChipShape;
export type PuChipsEditorChangeSource =
  | "keyboard"
  | "separator"
  | "blur"
  | "remove"
  | "clear";

export interface PuChipsEditorChangeContext {
  event: Event;
  source: PuChipsEditorChangeSource;
}

export const puChipsEditorProps = {
  modelValue: {
    type: Array as PropType<PuChipsEditorValue>,
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
    type: String as PropType<PuChipsEditorSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuChipsEditorSize),
  },
  variant: {
    type: String as PropType<PuChipsEditorVariant>,
    default: "outline",
    validator: (value: string) =>
      puFieldVariants.includes(value as PuChipsEditorVariant),
  },
  tone: {
    type: String as PropType<PuChipsEditorTone>,
    default: "neutral",
    validator: (value: string) => puTones.includes(value as PuChipsEditorTone),
  },
  shape: {
    type: String as PropType<PuChipsEditorShape>,
    default: "rect",
    validator: (value: string) => puChipShapes.includes(value as PuChipsEditorShape),
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

export type PuChipsEditorProps = typeof puChipsEditorProps;

export const puChipsEditorEmits = {
  "update:modelValue": (_value: PuChipsEditorValue) => true,
  "update:draftValue": (_value: string) => true,
  change: (_value: PuChipsEditorValue, _event: Event) => true,
  add: (
    _value: string,
    _context: PuChipsEditorChangeContext,
  ) => true,
  remove: (
    _value: string,
    _index: number,
    _context: PuChipsEditorChangeContext,
  ) => true,
  clear: (_event: Event) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
};

export type PuChipsEditorEmits = typeof puChipsEditorEmits;

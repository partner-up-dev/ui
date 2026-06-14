import type { PropType } from "vue";
import {
  puControlVariants,
  puSizes,
  puStatusTones,
  puTones,
  type PuControlVariant,
  type PuShape,
  type PuSize,
  type PuStatusTone,
  type PuTone,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puChipTones = [...puTones, ...puStatusTones] as const;
export const puChipShapes = ["rect", "pill"] as const;

export type PuChipTone = PuTone | PuStatusTone;
export type PuChipVariant = PuControlVariant;
export type PuChipSize = PuSize;
export type PuChipShape = Exclude<PuShape, "circle">;
export type PuChipType = "button" | "submit" | "reset";

export const puChipProps = {
  as: makeStringProp("span"),
  type: {
    type: String as PropType<PuChipType>,
    default: "button",
  },
  label: makeStringProp<string | undefined>(undefined),
  tone: {
    type: String as PropType<PuChipTone>,
    default: "neutral",
    validator: (value: string) => puChipTones.includes(value as PuChipTone),
  },
  variant: {
    type: String as PropType<PuChipVariant>,
    default: "soft",
    validator: (value: string) =>
      puControlVariants.includes(value as PuChipVariant),
  },
  size: {
    type: String as PropType<PuChipSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuSize),
  },
  shape: {
    type: String as PropType<PuChipShape>,
    default: "rect",
    validator: (value: string) => puChipShapes.includes(value as PuChipShape),
  },
  selected: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  removable: makeBooleanProp(false),
  removeLabel: makeStringProp("Remove"),
  prefixIcon: makeStringProp<string | undefined>(undefined),
  suffixIcon: makeStringProp<string | undefined>(undefined),
};

export const puChipEmits = {
  click: (_event: MouseEvent) => true,
  remove: (_event: MouseEvent) => true,
};

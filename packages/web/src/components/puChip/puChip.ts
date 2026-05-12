import type { PropType } from "vue";
import {
  puCommonTones,
  puSizes,
  puStatusTones,
  type PuSize,
  type PuStatusTone,
  type PuTone,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puChipTones = [...puCommonTones, ...puStatusTones] as const;

export type PuChipTone = PuTone | PuStatusTone;
export type PuChipSize = PuSize;
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
    default: "surface",
    validator: (value: string) => puChipTones.includes(value as PuChipTone),
  },
  size: {
    type: String as PropType<PuChipSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuSize),
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

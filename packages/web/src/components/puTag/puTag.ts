import type { ExtractPropTypes } from "vue";
import type {
  PuContainerVariant,
  PuExtendedSize,
  PuShape,
  PuStatusTone,
  PuTone,
} from "../../types";
import { baseProps, makeStringProp } from "../../utils/props";

export type PuTagTone = PuTone | PuStatusTone;
export type PuTagVariant = PuContainerVariant;
export type PuTagShape = Exclude<PuShape, "circle">;
export type PuTagSize = Extract<PuExtendedSize, "xs" | "sm" | "md">;

export const puTagProps = {
  ...baseProps,
  text: makeStringProp<string>(""),
  tone: makeStringProp<PuTagTone>("neutral"),
  variant: makeStringProp<PuTagVariant>("outline"),
  shape: makeStringProp<PuTagShape>("rect"),
  size: makeStringProp<PuTagSize>("md"),
} as const;

export type PuTagProps = ExtractPropTypes<typeof puTagProps>;

export const puTagEmits = {} as const;

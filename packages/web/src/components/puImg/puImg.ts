import type { PropType } from "vue";
import type { PuShape } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuImgSize = "xSmall" | "small" | "medium" | "large" | "xLarge";
export type PuImgMode =
  | "aspectFill"
  | "aspectFit"
  | "scaleToFill"
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right";

export const puImgProps = {
  src: makeStringProp(""),
  alt: makeStringProp(""),
  name: makeStringProp<string | undefined>(undefined),
  fallbackInitial: makeStringProp<string | undefined>(undefined),
  mode: makeStringProp<PuImgMode>("aspectFill"),
  showLoading: makeBooleanProp(true),
  size: {
    type: String as PropType<PuImgSize>,
    default: undefined,
  },
  width: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  height: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  lazyLoad: makeBooleanProp(true),
  shape: makeStringProp<PuShape>("rect"),
  bordered: makeBooleanProp(false),
} as const;

export const puImgEmits = {
  load: (_evt: Event) => true,
  error: (_evt: Event) => true,
};

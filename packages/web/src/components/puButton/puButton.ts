import type { PropType } from "vue";
import type {
  PuAction,
  PuControlVariant,
  PuShape,
  PuSize,
  PuTone,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuButtonTone = PuTone;

export type PuButtonVariant = PuControlVariant;

export type PuButtonSize = PuSize;

export type PuButtonFeedback = "idle" | "pending" | "success" | "error";

const actionProp = {
  type: Object as PropType<PuAction | undefined>,
  default: undefined,
};

export const puButtonProps = {
  action: actionProp,
  shape: makeStringProp<PuShape>("rect"),
  tone: makeStringProp<PuButtonTone>("primary"),
  variant: makeStringProp<PuButtonVariant>("solid"),
  size: makeStringProp<PuButtonSize>("md"),
  feedback: makeStringProp<PuButtonFeedback>("idle"),
  loading: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  block: makeBooleanProp(false),
};

export const puButtonEmits = {
  click: (_event: MouseEvent) => true,
};

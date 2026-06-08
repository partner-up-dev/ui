import type { PropType } from "vue";
import { puStatusTones, type PuStatusTone } from "../../types";
import { makeBooleanProp, makeNumberProp, makeStringProp } from "../../utils/props";

export const puSnackbarTones = ["neutral", ...puStatusTones] as const;

export type PuSnackbarTone = "neutral" | PuStatusTone;

export type PuSnackbarCloseReason = "timeout" | "dismiss" | "action";

export const puSnackbarProps = {
  open: makeBooleanProp(true),
  message: makeStringProp<string | undefined>(undefined),
  tone: {
    type: String as PropType<PuSnackbarTone>,
    default: "neutral",
    validator: (value: string) =>
      puSnackbarTones.includes(value as PuSnackbarTone),
  },
  actionLabel: makeStringProp<string | undefined>(undefined),
  dismissible: makeBooleanProp(false),
  closeLabel: makeStringProp("Dismiss"),
  duration: makeNumberProp(6000),
  pauseOnHover: makeBooleanProp(true),
};

export const puSnackbarEmits = {
  "update:open": (_open: boolean) => true,
  close: (_reason: PuSnackbarCloseReason) => true,
  action: (_event: MouseEvent) => true,
};

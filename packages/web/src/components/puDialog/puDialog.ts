import type { PropType } from "vue";
import type { PuStatusTone } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuDialogTone = "neutral" | PuStatusTone;

export type PuDialogCloseReason = "overlay" | "escape" | "close" | "cancel";

export const puDialogProps = {
  id: makeStringProp<string | undefined>(undefined),
  open: {
    type: Boolean,
    required: true as const,
  },
  title: makeStringProp<string | undefined>(undefined),
  description: makeStringProp<string | undefined>(undefined),
  ariaLabel: makeStringProp("Dialog"),
  closeLabel: makeStringProp("Close dialog"),
  cancelText: makeStringProp("Cancel"),
  confirmText: makeStringProp("Confirm"),
  maxWidth: makeStringProp("520px"),
  tone: {
    type: String as PropType<PuDialogTone>,
    default: "neutral",
  },
  showClose: makeBooleanProp(true),
  showCancel: makeBooleanProp(true),
  showConfirm: makeBooleanProp(true),
  cancelDisabled: makeBooleanProp(false),
  confirmDisabled: makeBooleanProp(false),
  confirmLoading: makeBooleanProp(false),
  closeOnOverlay: makeBooleanProp(true),
  closeOnEscape: makeBooleanProp(true),
  lockScroll: makeBooleanProp(true),
};

export const puDialogEmits = {
  close: (_reason: PuDialogCloseReason) => true,
  cancel: () => true,
  confirm: () => true,
};

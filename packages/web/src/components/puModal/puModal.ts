import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puModalProps = {
  open: {
    type: Boolean,
    required: true as const,
  },
  maxWidth: makeStringProp("480px"),
  title: makeStringProp<string | undefined>(undefined),
  closeOnOverlay: makeBooleanProp(true),
  closeOnEscape: makeBooleanProp(true),
  lockScroll: makeBooleanProp(true),
};

export const puModalEmits = {
  close: () => true,
};


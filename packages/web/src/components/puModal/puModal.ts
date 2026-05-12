import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puModalProps = {
  id: makeStringProp<string | undefined>(undefined),
  open: {
    type: Boolean,
    required: true as const,
  },
  maxWidth: makeStringProp("480px"),
  title: makeStringProp<string | undefined>(undefined),
  ariaLabel: makeStringProp("Dialog"),
  closeOnOverlay: makeBooleanProp(true),
  closeOnEscape: makeBooleanProp(true),
  lockScroll: makeBooleanProp(true),
};

export const puModalEmits = {
  close: () => true,
};

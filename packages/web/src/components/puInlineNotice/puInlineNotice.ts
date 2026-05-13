import type { PropType } from "vue";
import { puStatusTones, type PuStatusTone } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuInlineNoticeTone = PuStatusTone;

export const puInlineNoticeProps = {
  as: makeStringProp("div"),
  tone: {
    type: String as PropType<PuInlineNoticeTone>,
    default: "info",
    validator: (value: string) => puStatusTones.includes(value as PuStatusTone),
  },
  title: makeStringProp<string | undefined>(undefined),
  message: makeStringProp<string | undefined>(undefined),
  icon: makeStringProp<string | undefined>(undefined),
  showIcon: makeBooleanProp(true),
  dismissible: makeBooleanProp(false),
  closeLabel: makeStringProp("Close"),
};

export const puInlineNoticeEmits = {
  close: (_event: MouseEvent) => true,
};

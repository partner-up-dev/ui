import { makeStringProp, makeBooleanProp } from "../../utils/props";
import type { PropType } from "vue";

export type AnnouncementBarDirection = "horizontal" | "vertical";

export const puAnnouncementBarProps = {
  text: {
    type: [String, Array] as PropType<string | string[]>,
    default: "",
  },
  prefix: makeStringProp(""),
  backgroundColor: makeStringProp("#fef0f0"),
  color: makeStringProp("#f56c6c"),
  direction: makeStringProp<AnnouncementBarDirection>("horizontal"),
  scrollable: makeBooleanProp(true),
  closeable: makeBooleanProp(false),
  wrapable: makeBooleanProp(false),
};

export const puAnnouncementBarEmits = {
  close: () => true,
  click: () => true,
};

import type { PropType } from "vue";
import type { PuSpacing } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuCellType = "button" | "submit" | "reset";
export type PuCellValue = string | number | null;
export type PuCellPadding = PuSpacing;

export const puCellProps = {
  as: makeStringProp("div"),
  type: {
    type: String as PropType<PuCellType>,
    default: "button",
  },
  border: makeBooleanProp(false),
  title: makeStringProp<string | undefined>(undefined),
  value: {
    type: [String, Number, null] as unknown as PropType<PuCellValue>,
    default: null,
  },
  padding: makeStringProp<PuCellPadding>("md"),
  suffixIcon: makeStringProp<string | undefined>(undefined),
};

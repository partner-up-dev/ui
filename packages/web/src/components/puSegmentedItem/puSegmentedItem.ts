import type { PropType } from "vue";
import { makeBooleanProp, makeRequiredProp, makeStringProp } from "../../utils/props";
import type { PuSegmentedValue } from "../puSegmented/puSegmented";

export const puSegmentedItemProps = {
  value: makeRequiredProp(
    [String, Number] as PropType<PuSegmentedValue>,
  ),
  label: makeStringProp<string | undefined>(undefined),
  disabled: makeBooleanProp(false),
  panelId: makeStringProp<string | undefined>(undefined),
};

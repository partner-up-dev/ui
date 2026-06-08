import type { PropType } from "vue";
import { puExtendedSizes, type PuExtendedSize } from "../../types";
import { makeStringProp } from "../../utils/props";

export type PuSpinnerSize = PuExtendedSize;

export const puSpinnerProps = {
  size: {
    type: String as PropType<PuSpinnerSize>,
    default: "md",
    validator: (value: string) => puExtendedSizes.includes(value as PuSpinnerSize),
  },
  label: makeStringProp<string | undefined>(undefined),
};

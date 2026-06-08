import type { PropType } from "vue";
import { puAligns, type PuAlign } from "../../types";
import { makeNumberProp, makeStringProp } from "../../utils/props";

export type PuDescriptionItemValue = string | number | null;
export type PuDescriptionItemSpan = 1 | 2;
export type PuDescriptionItemValueAlign = PuAlign;

export const puDescriptionItemProps = {
  label: makeStringProp<string | undefined>(undefined),
  value: {
    type: [String, Number, null] as unknown as PropType<PuDescriptionItemValue>,
    default: null,
  },
  hint: makeStringProp<string | undefined>(undefined),
  span: makeNumberProp<PuDescriptionItemSpan>(1),
  valueAlign: {
    type: String as PropType<PuDescriptionItemValueAlign>,
    default: undefined,
    validator: (value: string) => puAligns.includes(value as PuAlign),
  },
  emptyText: makeStringProp<string | undefined>(undefined),
};

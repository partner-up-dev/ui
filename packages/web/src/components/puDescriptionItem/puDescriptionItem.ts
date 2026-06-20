import type { PropType } from "vue";
import { puAligns, type PuAlign, type PuSpacing } from "../../types";
import { makeNumberProp, makeStringProp } from "../../utils/props";

export type PuDescriptionItemValue = string | number | null;
export type PuDescriptionItemSpan = 1 | 2;
export type PuDescriptionItemValueAlign = PuAlign;
export type PuDescriptionItemPadding = PuSpacing;

export const puDescriptionItemProps = {
  label: makeStringProp<string | undefined>(undefined),
  value: {
    type: [String, Number, null] as unknown as PropType<PuDescriptionItemValue>,
    default: null,
  },
  hint: makeStringProp<string | undefined>(undefined),
  span: makeNumberProp<PuDescriptionItemSpan>(1),
  padding: makeStringProp<PuDescriptionItemPadding | undefined>(undefined),
  valueAlign: {
    type: String as PropType<PuDescriptionItemValueAlign>,
    default: undefined,
    validator: (value: string) => puAligns.includes(value as PuAlign),
  },
  emptyText: makeStringProp<string | undefined>(undefined),
};

import type { PropType } from "vue";
import type { PuGap, PuTone } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuCardPadding = "none" | "sm" | "md" | "lg";

export const puCardProps = {
  as: makeStringProp("article"),
  tone: makeStringProp<PuTone>("surface"),
  theme: makeStringProp<PuTone | undefined>(undefined),
  padding: makeStringProp<PuCardPadding>("md"),
  gap: makeStringProp<PuGap>("sm"),
  title: makeStringProp<string | undefined>(undefined),
  subtitle: makeStringProp<string | undefined>(undefined),
  collapsible: makeBooleanProp(false),
  defaultExpanded: makeBooleanProp(false),
  expanded: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  toggleLabel: makeStringProp("Toggle card"),
};

export const puCardEmits = {
  "update:expanded": (_value: boolean) => true,
  expand: () => true,
  collapse: () => true,
};

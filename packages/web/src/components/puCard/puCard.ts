import type { PropType } from "vue";
import type {
  PuAction,
  PuContainerVariant,
  PuExpandablePolicy,
  PuExpansionResetKey,
  PuGap,
  PuSpacing,
  PuTone,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuCardPadding = PuSpacing;
export type PuCardTone = PuTone;
export type PuCardVariant = PuContainerVariant;

export const puCardProps = {
  action: {
    type: Object as PropType<PuAction | undefined>,
    default: undefined,
  },
  as: makeStringProp("article"),
  tone: makeStringProp<PuCardTone>("neutral"),
  variant: makeStringProp<PuCardVariant>("soft"),
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
  expandedResetKey: {
    type: [String, Number, Boolean] as PropType<PuExpansionResetKey>,
    default: null,
  },
  toggleLabel: makeStringProp("Toggle card"),
  selectable: makeBooleanProp(false),
  active: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  keepContentMounted: makeBooleanProp(false),
};

export type PuCardExpandablePolicy = PuExpandablePolicy;

export const puCardEmits = {
  click: (_event: MouseEvent | KeyboardEvent) => true,
  "update:expanded": (_value: boolean) => true,
  expand: () => true,
  collapse: () => true,
};

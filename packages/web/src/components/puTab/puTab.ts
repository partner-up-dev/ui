import type { ExtractPropTypes, PropType } from "vue";
import { puSizes, type PuSize } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";
import {
  puTabStates,
  puTabsVariants,
  type PuTabState,
  type PuTabsVariant,
} from "../puTabs/puTabs";

export type PuTabVariant = PuTabsVariant;

// ==================== 组件 Props 定义 ====================
export const puTabProps = {
  label: makeStringProp<string | undefined>(undefined),
  active: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  showDot: makeBooleanProp(false),
  variant: {
    type: String as PropType<PuTabVariant>,
    default: "line",
    validator: (value: string) => puTabsVariants.includes(value as PuTabsVariant),
  },
  state: {
    type: String as PropType<PuTabState>,
    default: "default",
    validator: (value: string) => puTabStates.includes(value as PuTabState),
  },
  size: {
    type: String as PropType<PuSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuSize),
  },
} as const;

export type PuTabProps = ExtractPropTypes<typeof puTabProps>;

export const puTabEmits = {} as const;

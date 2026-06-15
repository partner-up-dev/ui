import type { ExtractPropTypes, PropType } from "vue";
import { puSizes, type PuSize } from "../../types";
import { makeArrayProp } from "../../utils/props";

export type PuTabValue = string | number;
export type PuTabsVariant = "line" | "pill";
export type PuTabState = "default" | "dashed";

export type PuTabItem = {
  value: PuTabValue;
  label: string;
  showDot?: boolean;
  disabled?: boolean;
  state?: PuTabState;
};

export type PuTabsChangePayload = {
  value: PuTabValue;
  index: number;
  tab: PuTabItem;
};

export const puTabsVariants = ["line", "pill"] as const;
export const puTabStates = ["default", "dashed"] as const;

// ==================== 组件 Props 定义 ====================
export const puTabsProps = {
  tabs: makeArrayProp<PuTabItem>([]),
  modelValue: {
    type: [String, Number] as PropType<PuTabValue | undefined>,
    default: undefined,
  },
  variant: {
    type: String as PropType<PuTabsVariant>,
    default: "line",
    validator: (value: string) => puTabsVariants.includes(value as PuTabsVariant),
  },
  size: {
    type: String as PropType<PuSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuSize),
  },
} as const;

export type PuTabsProps = ExtractPropTypes<typeof puTabsProps>;

// ==================== 组件 Emits 定义 ====================
export const puTabsEmits = {
  "update:modelValue": (_value: PuTabValue) => true,
  change: (_payload: PuTabsChangePayload) => true,
} as const;

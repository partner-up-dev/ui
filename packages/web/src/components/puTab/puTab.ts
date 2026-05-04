import type { ExtractPropTypes } from "vue";
import { baseProps, makeBooleanProp, makeStringProp } from "../../utils/props";

// ==================== 组件 Props 定义 ====================
export const puTabProps = {
  ...baseProps,
  text: makeStringProp<string>("Tab"),
  showDot: makeBooleanProp(true),
  size: makeStringProp<"Large" | "Medium" | "Small">("Large"),
  customClass: makeStringProp<string>("")
} as const;

export type PuTabProps = ExtractPropTypes<typeof puTabProps>;

export const puTabEmits = {} as const;

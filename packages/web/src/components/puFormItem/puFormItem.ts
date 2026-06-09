import type { PropType } from "vue";
import {
  puAligns,
  type PuAlign,
} from "../../types";
import { makeStringProp, makeBooleanProp } from "../../utils/props";

// ==================== 组件 Props 定义 ====================
export const puFormItemProps = {
  as: makeStringProp("div"),
  /**
   * 表单字段属性名，用于关联 PuForm 验证错误
   */
  prop: makeStringProp(""),
  /**
   * 是否包含子错误
   */
  includeSub: makeBooleanProp(false),
  label: makeStringProp<string | undefined>(undefined),
  forId: makeStringProp<string | undefined>(undefined),
  hint: makeStringProp<string | undefined>(undefined),
  error: makeStringProp<string | undefined>(undefined),
  required: makeBooleanProp(false),
  align: {
    type: String as PropType<PuAlign>,
    default: "start",
    validator: (value: string) => puAligns.includes(value as PuAlign),
  },
};

// ==================== 组件 Emits 定义 ====================
export const puFormItemEmits = {};

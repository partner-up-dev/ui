import { makeStringProp, makeBooleanProp } from "../../utils/props";

// ==================== 组件 Props 定义 ====================
export const puFormItemProps = {
  /**
   * 表单字段属性名，用于关联 PuForm 验证错误
   */
  prop: makeStringProp(''),
  /**
   * 是否包含子错误
   */
  includeSub: makeBooleanProp(false),
};

// ==================== 组件 Emits 定义 ====================
export const puFormItemEmits = {};

import { makeBooleanProp, makeStringProp } from "../../utils/props";

// ==================== 组件 Props 定义 ====================
export const puDrawerProps = {
  id: makeStringProp<string | undefined>(undefined),
  title: makeStringProp(""),
  ariaLabel: makeStringProp("Drawer"),
  closeLabel: makeStringProp("Close drawer"),
  visible: makeBooleanProp(false),
  height: makeStringProp("60vh"),
  fullCustom: makeBooleanProp(false),
  /**
   * 是否锁定背景滚动，防止滚动穿透
   */
  lockScroll: makeBooleanProp(true),
  closeOnEscape: makeBooleanProp(true),
};

// ==================== 组件 Emits 定义 ====================
export const puDrawerEmits = {
  "update:visible": (value: boolean) => true,
  close: () => true,
};

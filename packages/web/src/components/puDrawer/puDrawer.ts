import type { PropType } from "vue";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuDrawerCloseReason = "overlay" | "escape" | "close-button";

export interface PuDrawerCloseEvent {
  reason: PuDrawerCloseReason;
}

// ==================== 组件 Props 定义 ====================
export const puDrawerProps = {
  id: makeStringProp<string | undefined>(undefined),
  title: makeStringProp(""),
  ariaLabel: makeStringProp("Drawer"),
  closeLabel: makeStringProp("Close drawer"),
  visible: makeBooleanProp(false),
  height: makeStringProp("60vh"),
  maxWidth: makeStringProp("none"),
  teleportTo: makeStringProp("body"),
  fullCustom: makeBooleanProp(false),
  showClose: makeBooleanProp(true),
  contentPadding: makeBooleanProp(true),
  closeOnOverlay: makeBooleanProp(true),
  /**
   * 是否锁定背景滚动，防止滚动穿透
   */
  lockScroll: makeBooleanProp(true),
  closeOnEscape: makeBooleanProp(true),
  zIndex: {
    type: [String, Number] as PropType<string | number>,
    default: 1000,
  },
};

// ==================== 组件 Emits 定义 ====================
export const puDrawerEmits = {
  "update:visible": (value: boolean) => true,
  close: (_event: PuDrawerCloseEvent) => true,
};

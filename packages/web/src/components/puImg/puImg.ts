import { baseProps } from "../../utils/props";
import type { PropType } from "vue";

export type PuImgSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export type PuImgRadius = 'none' | 'xSmall' | 'small' | 'medium' | 'large' | 'full';

// ==================== 组件 Props 定义 ====================
export const puImgProps = {
  src: { type: String, default: "" },
  mode: { type: String, default: "aspectFill" },
  showLoading: { type: Boolean, default: true },
  showError: { type: Boolean, default: true },
  size: {
    type: String as PropType<PuImgSize>,
    default: undefined,
  },
  width: { type: [Number, String] as PropType<number | string>, default: undefined },
  height: { type: [Number, String] as PropType<number | string>, default: undefined },
  lazyLoad: { type: Boolean, default: true },
  customImage: { type: String, default: "" },
  radius: {
    type: String as PropType<PuImgRadius>,
    default: 'none',
  },
  ...baseProps
} as const;

// ==================== 组件 Emits 定义 ====================
export const puImgEmits = {
  load: (_evt: any) => true,
  error: (_evt: any) => true,
};

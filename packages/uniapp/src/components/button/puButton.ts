// Types of Component:Base:PuButton

import { makeBooleanProp } from '@/utils/props'
import type { PropType } from 'vue'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text'
export type ButtonSize = 'small' | 'medium' | 'large'

export const PuButtonProps = {
  /**
   * @name 按钮变体
   * @description Button variant style
   */
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'primary'
  },
  /**
   * @name 按钮尺寸
   * @description Button size
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  /**
   * @name 是否禁用
   * @description Whether the button is disabled
   */
  disabled: makeBooleanProp(false),
}

export const PuButtonEmits = {
  click: (event: MouseEvent) => true,
}

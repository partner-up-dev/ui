import { makeStringProp } from "../../utils/props";

// ==================== 组件相关类型定义 ====================

/**
 * Form validation result
 */
export interface FormValidationResult<T = any> {
  success: boolean;
  validatedForm?: T;
  errors?: Record<string, string>;
}

/**
 * Form error state provided to child cells
 */
export interface FormErrorState {
  errors: Record<string, string>;
}

/**
 * Form instance with validate method
 */
export interface FormInstance {
  validate(): Promise<{ success: boolean; errors: Record<string, string[]> }>;
  [key: string]: any;
}

// ==================== 组件 Props 定义 ====================
export const puFormProps = {
  /**
   * Form instance for form validation
   */
  schema: {
    type: Object,
    required: false,
  },
  /**
   * Padding for form items (cells)
   */
  cellPadding: makeStringProp(`var(--pu-form-cell-padding, 12px 16px)`),
};

// ==================== 组件 Emits 定义 ====================
export const puFormEmits = {
  submit: (_event: SubmitEvent) => true,
};

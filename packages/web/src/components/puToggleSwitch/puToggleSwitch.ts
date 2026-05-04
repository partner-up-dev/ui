import { makeBooleanProp } from "../../utils/props";

export const puToggleSwitchProps = {
  modelValue: {
    type: Boolean,
    required: true as const,
  },
  label: {
    type: String,
    required: true as const,
  },
  disabled: makeBooleanProp(false),
};

export const puToggleSwitchEmits = {
  "update:modelValue": (_value: boolean) => true,
  change: (_value: boolean) => true,
};


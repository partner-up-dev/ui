<template>
  <button
    type="button"
    :class="`
      pu-checkbox
      ${shapeClass}
      ${isChecked ? 'is-checked' : ''}
      ${isInline ? 'is-inline' : ''}
      ${isDisabled ? 'is-disabled' : ''}
      ${sizeClass}
      ${typeClass}
    `"
    :disabled="isDisabled"
    :aria-checked="isChecked"
    role="checkbox"
    @click="toggle"
  >
    <!-- Default 类型：当 shape!==button 时展示选择框图形 -->
    <template v-if="props.type === 'Default'">
      <span
        v-if="innerShape !== 'button'"
        :class="`pu-checkbox__shape ${
          innerShape === 'rect' || innerShape === 'square' ? 'is-square' : ''
        } ${customShapeClass}`"
        :style="
          isChecked && !isDisabled && checkedColor ? 'color:' + checkedColor : ''
        "
      >
        <span class="pu-checkbox__check i-mdi-check-bold"></span>
      </span>

      <!-- label 区域（button 模式下充当按钮外观） -->
      <span
        :class="`pu-checkbox__label ${customLabelClass}`"
        :style="
          isChecked && innerShape === 'button' && !isDisabled && checkedColor
            ? 'color:' + checkedColor
            : ''
        "
      >
        <span
          v-if="innerShape === 'button' && isChecked"
          class="pu-checkbox__btn-check i-mdi-check-bold"
        ></span>
        <span
          class="pu-checkbox__txt"
          :style="maxWidth ? 'max-width:' + maxWidth : ''"
        >
          <slot />
        </span>
      </span>
    </template>

    <!-- Bar 类型：整行可点，左方 20px 方框，右侧文本 -->
    <template v-else>
      <span class="pu-checkbox__bar">
        <span class="pu-checkbox__bar-shape">
          <span class="pu-checkbox__bar-check i-mdi-check-bold"></span>
        </span>
        <span class="pu-checkbox__bar-label">
          <span
            class="pu-checkbox__txt"
            :style="maxWidth ? 'max-width:' + maxWidth : ''"
          >
            <slot />
          </span>
        </span>
      </span>
    </template>
  </button>
</template>

<script lang="ts">
export default {
  name: "PuCheckbox",
};
</script>

<script setup lang="ts">
import { computed, inject } from "vue";
import {
  puCheckboxProps,
  puCheckboxEmits,
  type PuCheckboxExpose,
} from "./puCheckbox";
import {
  PUCHECKBOX_GROUP_KEY,
  type PuCheckboxGroupProvide,
} from "../puCheckboxGroup/puCheckboxGroup";

const props = defineProps(puCheckboxProps);
const emit = defineEmits(puCheckboxEmits);

defineExpose<PuCheckboxExpose>({ toggle });

const checkboxGroup = inject<PuCheckboxGroupProvide | null>(
  PUCHECKBOX_GROUP_KEY,
  null
);

const isChecked = computed(() => {
  if (checkboxGroup) {
    return checkboxGroup.props.modelValue.indexOf(props.modelValue) > -1;
  }
  return props.modelValue === props.trueValue;
});

const isDisabled = computed(() => {
  if (!checkboxGroup) return !!props.disabled;
  const { max, min, modelValue, disabled } = checkboxGroup.props;
  if (
    (max && modelValue.length >= max && !isChecked.value) ||
    (min && modelValue.length <= min && isChecked.value)
  ) {
    return true;
  }
  return !!(props.disabled || disabled);
});

const innerShape = computed(
  () => props.shape || (checkboxGroup && checkboxGroup.props.shape) || "rect"
);
const isInline = computed(() =>
  checkboxGroup ? !!checkboxGroup.props.inline : !!props.inline
);
const sizeClass = computed(() => {
  const size = props.size || (checkboxGroup && checkboxGroup.props.size);
  return size ? `is-${size}` : "";
});
const shapeClass = computed(() =>
  innerShape.value === "button" ? "is-button" : ""
);

const typeClass = computed(() =>
  props.type ? `is-${props.type.toLowerCase()}` : ""
);

function toggle() {
  if (isDisabled.value) return;
  if (checkboxGroup) {
    emit("change", { value: !isChecked.value });
    checkboxGroup.changeSelectState(props.modelValue);
    return;
  }
  const newVal = isChecked.value ? props.falseValue : props.trueValue;
  emit("update:modelValue", newVal);
  emit("change", { value: newVal });
}
</script>

<style lang="scss" scoped src="./puCheckbox.scss"></style>

<template>
  <button
    class="pu-toggle-switch"
    :class="{
      'is-checked': props.modelValue,
      'is-disabled': props.disabled,
    }"
    type="button"
    role="switch"
    :aria-checked="props.modelValue"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <span class="pu-toggle-switch__label">
      {{ props.label }}
    </span>
    <span class="pu-toggle-switch__track" aria-hidden="true">
      <span class="pu-toggle-switch__thumb" />
    </span>
  </button>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuToggleSwitch",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { puToggleSwitchEmits, puToggleSwitchProps } from "./puToggleSwitch";

const props = defineProps(puToggleSwitchProps);
const emit = defineEmits(puToggleSwitchEmits);

function handleClick() {
  if (props.disabled) {
    return;
  }

  const nextValue = !props.modelValue;
  emit("update:modelValue", nextValue);
  emit("change", nextValue);
}
</script>

<style lang="scss" scoped src="./puToggleSwitch.scss"></style>


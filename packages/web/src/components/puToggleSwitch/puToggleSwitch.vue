<template>
  <button
    class="pu-toggle-switch"
    :class="rootClasses"
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
import { computed } from "vue";
import { puSizes, type PuSize } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puToggleSwitchEmits, puToggleSwitchProps } from "./puToggleSwitch";

const props = defineProps(puToggleSwitchProps);
const emit = defineEmits(puToggleSwitchEmits);

const size = computed<PuSize>(() => normalizePuVariant(puSizes, props.size, "md"));

const rootClasses = computed(() => [
  createPuModifierClass("pu-toggle-switch", "size", size.value),
  createPuStateClass("checked", props.modelValue),
  createPuStateClass("disabled", props.disabled),
]);

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

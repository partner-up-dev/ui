<template>
  <label class="pu-checkbox" :class="rootClasses">
    <input
      :id="props.id"
      class="pu-checkbox__input"
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :name="props.name"
      :aria-label="inputAriaLabel"
      @change="handleChange"
    />
    <span class="pu-checkbox__box" aria-hidden="true">
      <span class="pu-checkbox__mark" />
      <span class="i-mdi-minus pu-checkbox__minus" />
    </span>
    <span v-if="hasLabel" class="pu-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuCheckbox",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { puSizes, puTones, type PuSize, type PuTone } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puCheckboxEmits, puCheckboxProps } from "./puCheckbox";

const props = defineProps(puCheckboxProps);
const emit = defineEmits(puCheckboxEmits);
const slots = useSlots();

const size = computed<PuSize>(() => normalizePuVariant(puSizes, props.size, "md"));
const tone = computed<PuTone>(() =>
  normalizePuVariant(puTones, props.tone, "primary"),
);
const hasLabel = computed(() => Boolean(slots.default));
const inputAriaLabel = computed(() =>
  hasLabel.value ? undefined : props.ariaLabel,
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-checkbox", "size", size.value),
  createPuModifierClass("pu-checkbox", "tone", tone.value),
  createPuStateClass("checked", props.modelValue),
  createPuStateClass("disabled", props.disabled),
]);

function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.checked);
  emit("change", input.checked);
}
</script>

<style lang="scss" scoped src="./puCheckbox.scss"></style>

<template>
  <label class="pu-radio" :class="rootClasses">
    <input
      :id="props.id"
      class="pu-radio__input"
      type="radio"
      :checked="isChecked"
      :disabled="props.disabled"
      :name="props.name"
      :value="props.value"
      :aria-label="inputAriaLabel"
      @change="handleChange"
    />
    <span class="pu-radio__box" aria-hidden="true">
      <span class="pu-radio__indicator" />
    </span>
    <span v-if="hasLabel" class="pu-radio__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuRadio",
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
import { puRadioEmits, puRadioProps, type PuRadioValue } from "./puRadio";

const props = defineProps(puRadioProps);
const emit = defineEmits(puRadioEmits);
const slots = useSlots();

const size = computed<PuSize>(() => normalizePuVariant(puSizes, props.size, "md"));
const tone = computed<PuTone>(() =>
  normalizePuVariant(puTones, props.tone, "primary"),
);
const hasLabel = computed(() => Boolean(slots.default));
const inputAriaLabel = computed(() =>
  hasLabel.value ? undefined : props.ariaLabel,
);
const isChecked = computed(() => Object.is(props.modelValue, props.value));

const rootClasses = computed(() => [
  createPuModifierClass("pu-radio", "size", size.value),
  createPuModifierClass("pu-radio", "tone", tone.value),
  createPuStateClass("checked", isChecked.value),
  createPuStateClass("disabled", props.disabled),
]);

function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.checked) {
    return;
  }

  emit("update:modelValue", props.value as PuRadioValue);
  emit("change", props.value as PuRadioValue);
}
</script>

<style lang="scss" scoped src="./puRadio.scss"></style>

<template>
  <span
    class="pu-spinner"
    :class="rootClasses"
    :role="hasLabel ? 'status' : undefined"
    :aria-live="hasLabel ? 'polite' : undefined"
    :aria-hidden="hasLabel ? undefined : 'true'"
  >
    <span class="pu-spinner__ring" aria-hidden="true" />
    <span v-if="hasLabel" class="pu-spinner__label">
      {{ props.label }}
    </span>
  </span>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuSpinner",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { puExtendedSizes } from "../../types";
import {
  createPuModifierClass,
  normalizePuVariant,
} from "../../utils";
import {
  puSpinnerProps,
  type PuSpinnerSize,
} from "./puSpinner";

const props = defineProps(puSpinnerProps);

const size = computed<PuSpinnerSize>(() =>
  normalizePuVariant(puExtendedSizes, props.size, "md"),
);
const hasLabel = computed(() => Boolean(props.label));

const rootClasses = computed(() => [
  createPuModifierClass("pu-spinner", "size", size.value),
]);
</script>

<style lang="scss" scoped src="./puSpinner.scss"></style>

<template>
  <component
    :is="props.as"
    class="pu-chip-group"
    :class="rootClasses"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuChipGroup",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { puAligns, puGaps, type PuAlign, type PuGap } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puChipGroupProps } from "./puChipGroup";

const props = defineProps(puChipGroupProps);

const gap = computed<PuGap>(() => normalizePuVariant(puGaps, props.gap, "sm"));
const align = computed<PuAlign>(() =>
  normalizePuVariant(puAligns, props.align, "start"),
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-chip-group", "gap", gap.value),
  createPuModifierClass("pu-chip-group", "align", align.value),
  createPuStateClass("wrap", props.wrap),
]);
</script>

<style lang="scss" scoped src="./puChipGroup.scss"></style>

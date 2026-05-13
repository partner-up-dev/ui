<template>
  <component
    :is="props.as"
    class="pu-bento-grid"
    :class="rootClasses"
    :style="rootStyle"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuBentoGrid",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import {
  puBreakpoints,
  puGaps,
  type PuBreakpoint,
  type PuGap,
} from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puBentoGridColumns,
  puBentoGridProps,
  type PuBentoGridColumns,
} from "./puBentoGrid";

const props = defineProps(puBentoGridProps);

const columns = computed<PuBentoGridColumns>(() =>
  puBentoGridColumns.includes(props.columns as PuBentoGridColumns)
    ? props.columns
    : 2,
);
const gap = computed<PuGap>(() => normalizePuVariant(puGaps, props.gap, "md"));
const collapseAt = computed<PuBreakpoint>(() =>
  normalizePuVariant(puBreakpoints, props.collapseAt, "md"),
);
const autoRows = computed(() => props.autoRows || "minmax(120px, auto)");

const rootClasses = computed(() => [
  createPuModifierClass("pu-bento-grid", "columns", columns.value),
  createPuModifierClass("pu-bento-grid", "gap", gap.value),
  createPuModifierClass("pu-bento-grid", "collapse-at", collapseAt.value),
  createPuStateClass("dense", props.dense),
]);

const rootStyle = computed(() => ({
  "--pu-bento-grid-columns": String(columns.value),
  "--pu-bento-grid-auto-rows": autoRows.value,
}));
</script>

<style lang="scss" scoped src="./puBentoGrid.scss"></style>

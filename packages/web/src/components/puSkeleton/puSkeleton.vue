<template>
  <slot v-if="!props.loading" />

  <component
    :is="props.as"
    v-else
    class="pu-skeleton"
    :class="rootClasses"
    :style="rootStyle"
    :aria-hidden="props.announce ? undefined : 'true'"
    :role="props.announce ? 'status' : undefined"
    :aria-live="props.announce ? 'polite' : undefined"
    :aria-busy="props.announce ? 'true' : undefined"
  >
    <span v-if="props.announce" class="pu-skeleton__status">
      {{ props.loadingText }}
    </span>

    <template v-if="variant === 'text'">
      <span
        v-for="(rowStyle, index) in rowStyles"
        :key="index"
        class="pu-skeleton__row"
        :style="rowStyle"
        aria-hidden="true"
      />
    </template>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuSkeleton",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puSkeletonAnimations,
  puSkeletonGaps,
  puSkeletonProps,
  puSkeletonVariants,
  type PuSkeletonAnimation,
  type PuSkeletonDimension,
  type PuSkeletonGap,
  type PuSkeletonVariant,
} from "./puSkeleton";

const props = defineProps(puSkeletonProps);

const variant = computed<PuSkeletonVariant>(() =>
  normalizePuVariant(puSkeletonVariants, props.variant, "text"),
);
const animation = computed<PuSkeletonAnimation>(() =>
  normalizePuVariant(puSkeletonAnimations, props.animation, "pulse"),
);
const gap = computed<PuSkeletonGap>(() =>
  normalizePuVariant(puSkeletonGaps, props.gap, "sm"),
);
const rowCount = computed(() => Math.max(1, Math.floor(props.rows || 1)));

const rootClasses = computed(() => [
  createPuModifierClass("pu-skeleton", "variant", variant.value),
  createPuModifierClass("pu-skeleton", "animation", animation.value),
  createPuModifierClass("pu-skeleton", "gap", gap.value),
  createPuStateClass("block", props.block),
  createPuStateClass("announced", props.announce),
]);

const rootStyle = computed(() => {
  const style: Record<string, string> = {};
  const width = toCssSize(props.width);
  const height = toCssSize(props.height);
  const radius = toCssSize(props.radius);

  if (width) {
    style.width = width;
  }

  if (height && variant.value !== "text") {
    style.height = height;
  }

  if (radius && variant.value !== "text") {
    style.borderRadius = radius;
  }

  if (variant.value === "circle") {
    const size = width ?? height;

    if (size) {
      style.width = size;
      style.height = size;
    }
  }

  return style;
});

const rowStyles = computed(() =>
  Array.from({ length: rowCount.value }, (_unused, index) => ({
    width: getRowWidth(index),
    height: toCssSize(props.height) ?? undefined,
    borderRadius: toCssSize(props.radius) ?? undefined,
  })),
);

function toCssSize(value: PuSkeletonDimension | undefined): string | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value === "number") {
    return `${value}px`;
  }

  return value;
}

function getRowWidth(index: number): string {
  const value = props.rowWidth;

  if (Array.isArray(value) && value.length > 0) {
    return (
      toCssSize(value[index] ?? value[value.length - 1]) ??
      defaultRowWidth(index)
    );
  }

  if (typeof value === "string" || typeof value === "number") {
    return toCssSize(value) ?? defaultRowWidth(index);
  }

  return defaultRowWidth(index);
}

function defaultRowWidth(index: number): string {
  if (rowCount.value === 1) {
    return toCssSize(props.width) ?? "100%";
  }

  if (index === rowCount.value - 1) {
    return "64%";
  }

  if (index === rowCount.value - 2) {
    return "92%";
  }

  return "100%";
}
</script>

<style lang="scss" scoped src="./puSkeleton.scss"></style>

<template>
  <component
    :is="props.as"
    class="pu-bento-item"
    :class="rootClasses"
    :aria-labelledby="defaultHeaderLabelledBy"
    :aria-describedby="defaultHeaderDescribedBy"
  >
    <header v-if="hasHeader" class="pu-bento-item__header">
      <slot name="header">
        <div class="pu-bento-item__heading">
          <h2 v-if="hasTitle" :id="titleId" class="pu-bento-item__title">
            <slot name="title">
              {{ props.title }}
            </slot>
          </h2>
          <p
            v-if="hasDescription"
            :id="descriptionId"
            class="pu-bento-item__description"
          >
            <slot name="description">
              {{ props.description }}
            </slot>
          </p>
        </div>

        <div v-if="$slots.actions" class="pu-bento-item__actions">
          <slot name="actions" />
        </div>
      </slot>
    </header>

    <div v-if="$slots.default" class="pu-bento-item__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="pu-bento-item__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuBentoItem",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { usePuId } from "../../composables";
import {
  puContainerVariants,
  puDensities,
  puSurfaceLevels,
  type PuContainerVariant,
  type PuDensity,
  type PuSurfaceLevel,
} from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  isPuBentoItemRowSpan,
  isPuBentoItemSpan,
  puBentoItemProps,
  type PuBentoItemRowSpan,
  type PuBentoItemSpan,
} from "./puBentoItem";

const props = defineProps(puBentoItemProps);
const slots = useSlots();

const baseId = usePuId("pu-bento-item");
const titleId = computed(() => `${baseId.value}-title`);
const descriptionId = computed(() => `${baseId.value}-description`);

const span = computed<PuBentoItemSpan>(() =>
  isPuBentoItemSpan(props.span)
    ? props.span === "full"
      ? "full"
      : (Number(props.span) as PuBentoItemSpan)
    : 1,
);
const rowSpan = computed<PuBentoItemRowSpan>(() =>
  isPuBentoItemRowSpan(props.rowSpan)
    ? (Number(props.rowSpan) as PuBentoItemRowSpan)
    : 1,
);
const surfaceLevel = computed<PuSurfaceLevel>(() =>
  normalizePuVariant(puSurfaceLevels, props.surfaceLevel, "section"),
);
const variant = computed<PuContainerVariant>(() =>
  normalizePuVariant(puContainerVariants, props.variant, "soft"),
);
const density = computed<PuDensity>(() =>
  normalizePuVariant(puDensities, props.density, "comfortable"),
);

const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasDescription = computed(
  () => Boolean(slots.description) || Boolean(props.description),
);
const hasHeader = computed(
  () =>
    Boolean(slots.header) ||
    hasTitle.value ||
    hasDescription.value ||
    Boolean(slots.actions),
);
const defaultHeaderLabelledBy = computed(() =>
  !slots.header && hasTitle.value ? titleId.value : undefined,
);
const defaultHeaderDescribedBy = computed(() =>
  !slots.header && hasDescription.value ? descriptionId.value : undefined,
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-bento-item", "span", span.value),
  createPuModifierClass("pu-bento-item", "row-span", rowSpan.value),
  createPuModifierClass("pu-bento-item", "surface-level", surfaceLevel.value),
  createPuModifierClass("pu-bento-item", "variant", variant.value),
  createPuModifierClass("pu-bento-item", "density", density.value),
  createPuStateClass("with-header", hasHeader.value),
  createPuStateClass("with-footer", Boolean(slots.footer)),
]);
</script>

<style lang="scss" scoped src="./puBentoItem.scss"></style>

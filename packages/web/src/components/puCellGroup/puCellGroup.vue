<template>
  <component
    :is="props.as"
    class="pu-cell-group"
    :class="rootClasses"
    :aria-labelledby="hasTitle ? titleId : undefined"
    :aria-describedby="hasDescription ? descriptionId : undefined"
  >
    <header v-if="hasHeader" class="pu-cell-group__header">
      <slot name="header">
        <div class="pu-cell-group__heading">
          <h2 v-if="hasTitle" :id="titleId" class="pu-cell-group__title">
            <slot name="title">
              {{ props.title }}
            </slot>
          </h2>
          <p
            v-if="hasDescription"
            :id="descriptionId"
            class="pu-cell-group__description"
          >
            <slot name="description">
              {{ props.description }}
            </slot>
          </p>
        </div>
      </slot>
    </header>

    <div class="pu-cell-group__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="pu-cell-group__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuCellGroup",
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
import { puCellGroupProps } from "./puCellGroup";

const props = defineProps(puCellGroupProps);
const slots = useSlots();

const baseId = usePuId("pu-cell-group");
const titleId = computed(() => `${baseId.value}-title`);
const descriptionId = computed(() => `${baseId.value}-description`);

const surfaceLevel = computed<PuSurfaceLevel>(() =>
  normalizePuVariant(puSurfaceLevels, props.surfaceLevel, "plain"),
);
const variant = computed<PuContainerVariant>(() =>
  normalizePuVariant(puContainerVariants, props.variant, "plain"),
);
const density = computed<PuDensity>(() =>
  normalizePuVariant(puDensities, props.density, "comfortable"),
);

const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasDescription = computed(
  () => Boolean(slots.description) || Boolean(props.description),
);
const hasHeader = computed(
  () => Boolean(slots.header) || hasTitle.value || hasDescription.value,
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-cell-group", "surface-level", surfaceLevel.value),
  createPuModifierClass("pu-cell-group", "variant", variant.value),
  createPuModifierClass("pu-cell-group", "density", density.value),
  createPuStateClass("dividers", props.dividers),
  createPuStateClass("inset", props.inset),
  createPuStateClass("with-header", hasHeader.value),
  createPuStateClass("with-footer", Boolean(slots.footer)),
]);
</script>

<style lang="scss" scoped src="./puCellGroup.scss"></style>

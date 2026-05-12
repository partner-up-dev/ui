<template>
  <component
    :is="props.as"
    class="pu-description-list"
    :class="rootClasses"
    :style="rootStyle"
    :aria-labelledby="defaultHeaderLabelledBy"
  >
    <header v-if="hasHeader" class="pu-description-list__header">
      <slot name="header">
        <div class="pu-description-list__heading">
          <h2 v-if="hasTitle" :id="titleId" class="pu-description-list__title">
            <slot name="title">
              {{ props.title }}
            </slot>
          </h2>
          <p v-if="hasDescription" class="pu-description-list__description">
            <slot name="description">
              {{ props.description }}
            </slot>
          </p>
        </div>
      </slot>
    </header>

    <dl class="pu-description-list__body">
      <slot />
    </dl>

    <footer v-if="$slots.footer" class="pu-description-list__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuDescriptionList",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, provide, useSlots } from "vue";
import { usePuId } from "../../composables";
import {
  puDensities,
  puLayouts,
  puSurfaceTones,
  type PuDensity,
  type PuLayout,
  type PuSurfaceTone,
} from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puDescriptionLabelAligns,
  puDescriptionListProps,
  type PuDescriptionListColumns,
} from "./puDescriptionList";
import { puDescriptionListKey, type PuDescriptionLabelAlign } from "./context";

const props = defineProps(puDescriptionListProps);
const slots = useSlots();

const baseId = usePuId("pu-description-list");
const titleId = computed(() => `${baseId.value}-title`);

const layout = computed<PuLayout>(() =>
  normalizePuVariant(puLayouts, props.layout, "stack"),
);
const density = computed<PuDensity>(() =>
  normalizePuVariant(puDensities, props.density, "comfortable"),
);
const tone = computed<PuSurfaceTone>(() =>
  normalizePuVariant(puSurfaceTones, props.tone, "plain"),
);
const labelAlign = computed<PuDescriptionLabelAlign>(() =>
  normalizePuVariant(puDescriptionLabelAligns, props.labelAlign, "start"),
);
const columns = computed<PuDescriptionListColumns>(() =>
  props.columns === 2 ? 2 : 1,
);
const labelWidth = computed(() => props.labelWidth || "7rem");
const emptyText = computed(() => props.emptyText);

const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasDescription = computed(
  () => Boolean(slots.description) || Boolean(props.description),
);
const hasHeader = computed(
  () => Boolean(slots.header) || hasTitle.value || hasDescription.value,
);
const defaultHeaderLabelledBy = computed(() =>
  !slots.header && hasTitle.value ? titleId.value : undefined,
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-description-list", "layout", layout.value),
  createPuModifierClass("pu-description-list", "density", density.value),
  createPuModifierClass("pu-description-list", "tone", tone.value),
  createPuModifierClass("pu-description-list", "columns", columns.value),
  createPuModifierClass("pu-description-list", "label-align", labelAlign.value),
  createPuStateClass("bordered", props.bordered),
  createPuStateClass("dividers", props.dividers),
  createPuStateClass("collapse-on-mobile", props.collapseOnMobile),
]);

const rootStyle = computed(() => ({
  "--pu-description-list-label-width": labelWidth.value,
  "--pu-description-list-grid-columns": String(columns.value),
}));

provide(puDescriptionListKey, {
  layout,
  density,
  tone,
  dividers: computed(() => props.dividers),
  labelWidth,
  labelAlign,
  columns,
  collapseOnMobile: computed(() => props.collapseOnMobile),
  emptyText,
});
</script>

<style lang="scss" scoped src="./puDescriptionList.scss"></style>

<template>
  <component
    :is="props.as"
    class="pu-page-header"
    :class="rootClasses"
    :aria-labelledby="hasTitle ? titleId : undefined"
  >
    <div class="pu-page-header__main">
      <button
        v-if="props.showBack"
        class="pu-page-header__back"
        type="button"
        :aria-label="props.backLabel"
        @click="onBack"
      >
        <slot name="back-icon">
          <span class="i-mdi-arrow-left" aria-hidden="true" />
        </slot>
      </button>

      <div v-if="hasCopy" class="pu-page-header__content">
        <component
          :is="titleAs"
          v-if="hasTitle"
          :id="titleId"
          class="pu-page-header__title"
        >
          <slot name="title">
            {{ props.title }}
          </slot>
        </component>

        <p v-if="hasSubtitle" class="pu-page-header__subtitle">
          <slot name="subtitle">
            {{ props.subtitle }}
          </slot>
        </p>
      </div>

      <div v-if="$slots.actions" class="pu-page-header__actions">
        <slot name="actions" />
      </div>
    </div>

    <div v-if="$slots.meta" class="pu-page-header__meta">
      <slot name="meta" />
    </div>

    <div v-if="$slots.default" class="pu-page-header__body">
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuPageHeader",
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
  puPageHeaderEmits,
  puPageHeaderLayouts,
  puPageHeaderProps,
  puPageHeaderTitleTags,
  type PuPageHeaderLayout,
  type PuPageHeaderTitleAs,
} from "./puPageHeader";

const props = defineProps(puPageHeaderProps);
const emit = defineEmits(puPageHeaderEmits);
const slots = useSlots();

const baseId = usePuId("pu-page-header");
const titleId = computed(() => `${baseId.value}-title`);

const layout = computed<PuPageHeaderLayout>(() =>
  normalizePuVariant(puPageHeaderLayouts, props.layout, "inline"),
);
const density = computed<PuDensity>(() =>
  normalizePuVariant(puDensities, props.density, "comfortable"),
);
const surfaceLevel = computed<PuSurfaceLevel>(() =>
  normalizePuVariant(puSurfaceLevels, props.surfaceLevel, "plain"),
);
const variant = computed<PuContainerVariant>(() =>
  normalizePuVariant(puContainerVariants, props.variant, "plain"),
);
const titleAs = computed<PuPageHeaderTitleAs>(() =>
  normalizePuVariant(puPageHeaderTitleTags, props.titleAs, "h1"),
);

const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasSubtitle = computed(
  () => Boolean(slots.subtitle) || Boolean(props.subtitle),
);
const hasCopy = computed(() => hasTitle.value || hasSubtitle.value);

const rootClasses = computed(() => [
  createPuModifierClass("pu-page-header", "layout", layout.value),
  createPuModifierClass("pu-page-header", "density", density.value),
  createPuModifierClass("pu-page-header", "surface-level", surfaceLevel.value),
  createPuModifierClass("pu-page-header", "variant", variant.value),
  createPuStateClass("bordered", props.bordered),
  createPuStateClass("with-back", props.showBack),
  createPuStateClass("with-actions", Boolean(slots.actions)),
  createPuStateClass("with-meta", Boolean(slots.meta)),
]);

function onBack(event: MouseEvent): void {
  emit("back", event);
}
</script>

<style lang="scss" scoped src="./puPageHeader.scss"></style>

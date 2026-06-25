<template>
  <component
    :is="props.as"
    class="pu-header"
    :class="rootClasses"
    :aria-labelledby="hasTitle ? resolvedTitleId : undefined"
  >
    <div class="pu-header__main">
      <div v-if="hasLeft" class="pu-header__left">
        <div v-if="hasLeading" class="pu-header__leading">
          <slot name="leading" />
        </div>

        <div v-if="hasCopy" class="pu-header__content">
          <component
            :is="titleAs"
            v-if="hasTitle"
            :id="resolvedTitleId"
            class="pu-header__title"
          >
            <slot name="title">
              {{ props.title }}
            </slot>
          </component>

          <p
            v-if="hasSubtitle"
            :id="resolvedSubtitleId"
            class="pu-header__subtitle"
          >
            <slot name="subtitle">
              {{ props.subtitle }}
            </slot>
          </p>
        </div>
      </div>

      <div v-if="$slots.actions" class="pu-header__actions">
        <slot name="actions" />
      </div>
    </div>

    <div v-if="$slots.meta" class="pu-header__meta">
      <slot name="meta" />
    </div>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuHeader",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { usePuId } from "../../composables";
import { puSizes, type PuSize } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puHeaderProps,
  puHeaderTitleTags,
  puHeaderVariants,
  type PuHeaderTitleAs,
  type PuHeaderVariant,
} from "./puHeader";

const props = defineProps(puHeaderProps);
const slots = useSlots();

const baseId = usePuId("pu-header");

const size = computed<PuSize>(() =>
  normalizePuVariant(puSizes, props.size, "md"),
);
const variant = computed<PuHeaderVariant>(() =>
  normalizePuVariant(puHeaderVariants, props.variant, "plain"),
);
const titleAs = computed<PuHeaderTitleAs>(() =>
  normalizePuVariant(puHeaderTitleTags, props.titleAs, "h2"),
);

const resolvedTitleId = computed(() => props.titleId ?? `${baseId.value}-title`);
const resolvedSubtitleId = computed(
  () => props.subtitleId ?? `${baseId.value}-subtitle`,
);

const hasLeading = computed(() => Boolean(slots.leading));
const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasSubtitle = computed(
  () => Boolean(slots.subtitle) || Boolean(props.subtitle),
);
const hasCopy = computed(() => hasTitle.value || hasSubtitle.value);
const hasLeft = computed(() => hasLeading.value || hasCopy.value);

const rootClasses = computed(() => [
  createPuModifierClass("pu-header", "size", size.value),
  createPuModifierClass("pu-header", "variant", variant.value),
  createPuStateClass("with-leading", hasLeading.value),
  createPuStateClass("with-actions", Boolean(slots.actions)),
  createPuStateClass("with-meta", Boolean(slots.meta)),
  createPuStateClass("without-subtitle", !hasSubtitle.value),
]);
</script>

<style lang="scss" scoped src="./puHeader.scss"></style>

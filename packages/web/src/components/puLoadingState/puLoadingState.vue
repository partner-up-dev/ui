<template>
  <component
    :is="props.as"
    class="pu-loading-state"
    :class="rootClasses"
    role="status"
    aria-live="polite"
    :aria-busy="props.busy ? 'true' : undefined"
    :aria-labelledby="hasTitle ? titleId : undefined"
    :aria-describedby="hasMessage ? messageId : undefined"
  >
    <div class="pu-loading-state__layout">
      <div class="pu-loading-state__spinner" aria-hidden="true">
        <slot name="spinner">
          <PuSpinner :size="size" />
        </slot>
      </div>

      <div v-if="hasContent" class="pu-loading-state__content">
        <h2 v-if="hasTitle" :id="titleId" class="pu-loading-state__title">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h2>
        <p v-if="hasMessage" :id="messageId" class="pu-loading-state__message">
          <slot>
            {{ props.message }}
          </slot>
        </p>
      </div>

      <span v-if="!hasContent" class="pu-loading-state__sr-label">
        {{ statusLabel }}
      </span>
    </div>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuLoadingState",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { usePuId } from "../../composables";
import {
  puContainerVariants,
  puExtendedSizes,
  puSurfaceLevels,
  type PuContainerVariant,
  type PuExtendedSize,
  type PuSurfaceLevel,
} from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import PuSpinner from "../puSpinner/puSpinner.vue";
import {
  puLoadingStateAligns,
  puLoadingStateProps,
  type PuLoadingStateAlign,
} from "./puLoadingState";

const props = defineProps(puLoadingStateProps);
const slots = useSlots();

const baseId = usePuId("pu-loading-state");
const titleId = computed(() => `${baseId.value}-title`);
const messageId = computed(() => `${baseId.value}-message`);

const align = computed<PuLoadingStateAlign>(() =>
  normalizePuVariant(puLoadingStateAligns, props.align, "center"),
);
const size = computed<PuExtendedSize>(() =>
  normalizePuVariant(puExtendedSizes, props.size, "lg"),
);
const surfaceLevel = computed<PuSurfaceLevel>(() =>
  normalizePuVariant(puSurfaceLevels, props.surfaceLevel, "plain"),
);
const variant = computed<PuContainerVariant>(() =>
  normalizePuVariant(puContainerVariants, props.variant, "plain"),
);

const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasMessage = computed(() => Boolean(slots.default) || Boolean(props.message));
const hasContent = computed(() => hasTitle.value || hasMessage.value);
const statusLabel = computed(
  () => props.label || props.message || props.title || "Loading",
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-loading-state", "align", align.value),
  createPuModifierClass("pu-loading-state", "surface-level", surfaceLevel.value),
  createPuModifierClass("pu-loading-state", "variant", variant.value),
  createPuStateClass("compact", props.compact),
  createPuStateClass("with-content", hasContent.value),
]);
</script>

<style lang="scss" scoped src="./puLoadingState.scss"></style>

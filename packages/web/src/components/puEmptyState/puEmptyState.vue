<template>
  <component
    :is="props.as"
    class="pu-empty-state"
    :class="rootClasses"
    :aria-labelledby="hasTitle ? titleId : undefined"
    :aria-describedby="hasDescription ? descriptionId : undefined"
  >
    <div v-if="hasIcon" class="pu-empty-state__icon" aria-hidden="true">
      <slot name="icon">
        <span :class="props.icon" />
      </slot>
    </div>

    <div class="pu-empty-state__content">
      <h2 v-if="hasTitle" :id="titleId" class="pu-empty-state__title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </h2>

      <p
        v-if="hasDescription"
        :id="descriptionId"
        class="pu-empty-state__description"
      >
        <slot name="description">
          {{ props.description }}
        </slot>
      </p>

      <div v-if="$slots.default" class="pu-empty-state__body">
        <slot />
      </div>
    </div>

    <div v-if="$slots.actions" class="pu-empty-state__actions">
      <slot name="actions" />
    </div>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuEmptyState",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { usePuId } from "../../composables";
import { puSurfaceTones, type PuSurfaceTone } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puEmptyStateAligns,
  puEmptyStateProps,
  type PuEmptyStateAlign,
} from "./puEmptyState";

const props = defineProps(puEmptyStateProps);
const slots = useSlots();

const baseId = usePuId("pu-empty-state");
const titleId = computed(() => `${baseId.value}-title`);
const descriptionId = computed(() => `${baseId.value}-description`);

const align = computed<PuEmptyStateAlign>(() =>
  normalizePuVariant(puEmptyStateAligns, props.align, "center"),
);
const tone = computed<PuSurfaceTone>(() =>
  normalizePuVariant(puSurfaceTones, props.tone, "section"),
);

const hasIcon = computed(() => Boolean(slots.icon) || Boolean(props.icon));
const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasDescription = computed(
  () => Boolean(slots.description) || Boolean(props.description),
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-empty-state", "align", align.value),
  createPuModifierClass("pu-empty-state", "tone", tone.value),
  createPuStateClass("compact", props.compact),
  createPuStateClass("with-actions", Boolean(slots.actions)),
]);
</script>

<style lang="scss" scoped src="./puEmptyState.scss"></style>

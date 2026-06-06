<template>
  <component
    :is="props.as"
    class="pu-card"
    :class="cardClasses"
    :aria-labelledby="cardLabelledBy"
  >
    <div v-if="hasHero" class="pu-card__hero">
      <slot name="hero" />
    </div>

    <div
      v-if="hasHeader || props.collapsible"
      class="pu-card__header"
      :class="{ 'pu-card__header--toggle-only': !hasHeader }"
    >
      <div v-if="hasHeader" class="pu-card__header-content">
        <slot name="header" />
      </div>
      <div v-else class="pu-card__header-content">
        <h3 v-if="props.title" :id="titleId" class="pu-card__title">
          {{ props.title }}
        </h3>
        <span v-else :id="titleId" class="pu-card__title">
          {{ props.toggleLabel }}
        </span>
        <p v-if="props.subtitle" class="pu-card__subtitle">
          {{ props.subtitle }}
        </p>
      </div>

      <button
        v-if="props.collapsible"
        type="button"
        class="pu-card__toggle"
        :aria-expanded="isExpanded"
        :aria-label="props.toggleLabel"
        @click="toggleExpanded"
      >
        <span
          class="i-mdi-chevron-down pu-card__toggle-icon"
          :class="{ 'is-expanded': isExpanded }"
          aria-hidden="true"
        ></span>
      </button>
    </div>

    <Transition name="pu-card-body">
      <div v-if="bodyVisible" class="pu-card__body">
        <div v-if="hasDefault" class="pu-card__content">
          <slot />
        </div>

        <div v-if="hasFooter" class="pu-card__footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuCard",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref, useSlots, watch } from "vue";
import { usePuId } from "../../composables";
import { puCardEmits, puCardProps } from "./puCard";

const props = defineProps(puCardProps);
const emit = defineEmits(puCardEmits);
const slots = useSlots();

const internalExpanded = ref(props.defaultExpanded);
const baseId = usePuId("pu-card");
const titleId = computed(() => `${baseId.value}-title`);

const isControlled = computed(() => props.expanded !== undefined);
const isExpanded = computed(() =>
  isControlled.value ? Boolean(props.expanded) : internalExpanded.value,
);

const hasHero = computed(() => Boolean(slots.hero));
const hasHeader = computed(() => Boolean(slots.header));
const hasDefault = computed(() => Boolean(slots.default));
const hasFooter = computed(() => Boolean(slots.footer));
const hasBody = computed(() => hasDefault.value || hasFooter.value);
const effectiveTone = computed(() => props.theme ?? props.tone);

const bodyVisible = computed(
  () => hasBody.value && (!props.collapsible || isExpanded.value),
);

const cardLabelledBy = computed(() =>
  !hasHeader.value && props.title ? titleId.value : undefined,
);

const cardClasses = computed(() => [
  `pu-card--tone-${effectiveTone.value}`,
  `pu-card--padding-${props.padding}`,
  `pu-card--gap-${props.gap}`,
  {
    "pu-card--collapsible": props.collapsible,
    "is-expanded": props.collapsible && isExpanded.value,
    "has-hero": hasHero.value,
    "has-header": hasHeader.value,
    "has-footer": hasFooter.value,
  },
]);

watch(
  () => props.defaultExpanded,
  (value) => {
    if (!isControlled.value) {
      internalExpanded.value = value;
    }
  },
);

function setExpanded(value: boolean): void {
  if (!isControlled.value) {
    internalExpanded.value = value;
  }

  emit("update:expanded", value);
  if (value) {
    emit("expand");
  } else {
    emit("collapse");
  }
}

function toggleExpanded(): void {
  setExpanded(!isExpanded.value);
}
</script>

<style lang="scss" scoped src="./puCard.scss"></style>

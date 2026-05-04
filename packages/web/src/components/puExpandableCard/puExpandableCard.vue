<template>
  <section class="pu-expandable-card">
    <button
      type="button"
      class="pu-expandable-card__toggle"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      <div class="pu-expandable-card__header">
        <h3 class="pu-expandable-card__title">{{ props.title }}</h3>
        <p v-if="props.subtitle" class="pu-expandable-card__subtitle">
          {{ props.subtitle }}
        </p>
      </div>
      <span class="pu-expandable-card__icon" :class="{ 'is-open': expanded }">
        ▾
      </span>
    </button>
    <Transition name="pu-expandable-card-content">
      <div v-if="expanded" class="pu-expandable-card__content">
        <slot />
      </div>
    </Transition>
  </section>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuExpandableCard",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { puExpandableCardProps } from "./puExpandableCard";

const props = defineProps(puExpandableCardProps);
const expanded = ref(props.defaultExpanded);
</script>

<style lang="scss" scoped src="./puExpandableCard.scss"></style>


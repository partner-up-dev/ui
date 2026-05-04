<template>
  <component
    :is="props.as"
    class="pu-surface-card"
    :class="[`pu-surface-card--tone-${props.tone}`, `pu-surface-card--gap-${props.gap}`]"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuSurfaceCard",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { puSurfaceCardProps } from "./puSurfaceCard";

const props = defineProps(puSurfaceCardProps);
</script>

<style lang="scss" scoped src="./puSurfaceCard.scss"></style>


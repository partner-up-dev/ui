<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuScrollView",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { puScrollViewProps, puScrollViewEmits } from "./puScrollView";

const props = defineProps(puScrollViewProps);
const emit = defineEmits(puScrollViewEmits);

const isHorizontal = computed(() => props.direction === "x");

// Compute actual fade position based on edgeFade prop
const computedFadePosition = computed(() => {
  if (!props.edgeFade) return undefined;
  if (props.edgeFade === "auto") {
    return "end";
  }
  return props.edgeFade;
});

const scrollViewClasses = computed(() => [
  "pu-scroll-view",
  computedFadePosition.value ? `fade-${computedFadePosition.value}` : "",
  isHorizontal.value ? "pu-scroll-view--horizontal" : "",
]);

const handleScroll = (event: Event) => {
  emit("scroll", event);
};
</script>

<template>
  <div
    :class="scrollViewClasses"
    @scroll="handleScroll"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped src="./puScrollView.scss"></style>

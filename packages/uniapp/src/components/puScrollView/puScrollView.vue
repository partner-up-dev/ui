<script lang="ts">
import { BasicComponentOptions } from "@/utils/vue";
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
const isVertical = computed(() => props.direction === "y");

// Note: usePulldownRefresher is not available in this package
// Integrate pulldown refresher if onRefresh is provided
const refreshEnabled = computed(() => !!props.onRefresh && isVertical.value);

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
  props.customClass,
  computedFadePosition.value ? `fade-${computedFadePosition.value}` : "",
  isHorizontal.value ? "pu-scroll-view--horizontal" : "",
]);

const handleScroll = (event: any) => {
  emit("scroll", event);
};

// Placeholder handlers for refresh functionality
const handleRefresherRefresh = () => {
  if (props.onRefresh) {
    props.onRefresh();
  }
};
</script>

<template>
  <scroll-view
    class="pu-scroll-view"
    :class="scrollViewClasses"
    :scroll-x="isHorizontal"
    :scroll-y="isVertical"
    :refresher-enabled="refreshEnabled"
    @refresherrefresh="handleRefresherRefresh"
    @scroll="handleScroll"
  >
    <slot />
  </scroll-view>
</template>

<style lang="scss" scoped src="./puScrollView.scss"></style>

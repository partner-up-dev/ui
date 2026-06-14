<template>
  <span :class="rootClasses">
    <span class="text">{{ props.text }}</span>
  </span>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuTag",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { puTagProps } from "./puTag";

const props = defineProps(puTagProps);

const rootClasses = computed(() => {
  const classes = ["pu-tag"] as string[];
  classes.push(`pu-tag--tone-${props.tone}`);
  classes.push(`pu-tag--variant-${props.variant}`);
  classes.push(`pu-tag--shape-${props.shape}`);
  classes.push(`pu-tag--size-${props.size}`);
  return classes;
});
</script>

<style scoped lang="scss" src="./puTag.scss"></style>

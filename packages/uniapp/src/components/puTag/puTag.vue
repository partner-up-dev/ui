<template>
  <view :class="rootClasses" :style="customStyle">
    <text class="text">{{ props.text }}</text>
  </view>
</template>

<script lang="ts">
import { BasicComponentOptions } from "@/utils/vue";
export default {
  name: "PuTag",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { puTagProps } from "./puTag";
import { kebabCase } from '@/utils/string'

const props = defineProps(puTagProps);

const rootClasses = computed(() => {
  const classes = ["pu-tag"] as string[];
  if (props.rounded) classes.push("rounded");
  if (props.outlined) classes.push("outlined");
  classes.push(kebabCase(props.theme));
  classes.push(kebabCase(props.size));
  if (props.customClass) classes.push(props.customClass);
  return classes;
});
</script>

<style scoped lang="scss" src="./puTag.scss"></style>

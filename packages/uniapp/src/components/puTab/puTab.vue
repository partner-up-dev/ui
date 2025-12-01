<template>
  <view :class="rootClasses">
    <slot>
      <text class="pu-tab__text">{{ props.text }}</text>
    </slot>
    <view v-if="props.showDot" :class="['pu-tab__dot', sizeClass]" />
  </view>
</template>

<script lang="ts">
import { BasicComponentOptions } from "@/utils/vue";
export default {
  name: "PuTab",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { puTabProps } from "./puTab";
import { kebabCase } from '@/utils/string'


const props = defineProps(puTabProps);

const sizeClass = computed(() => {
  return kebabCase(props.size);
});

const rootClasses = computed(() => {
  const classes = ["pu-tab"] as string[];
  classes.push(sizeClass.value);
  if (props.customClass) classes.push(props.customClass);
  return classes;
});
</script>

<style scoped lang="scss" src="./puTab.scss"></style>

<template>
  <div :class="rootClasses" :style="props.customStyle" role="tablist">
    <button
      v-for="(tab, index) in props.tabs"
      :key="index"
      type="button"
      role="tab"
      :aria-selected="index === props.modelValue"
      :class="[
        'pu-tabs__item',
        index === props.modelValue ? 'active' : 'deactive',
        props.size,
        index > 0 ? 'space-m-l-med' : '',
      ]"
      @click="onClick(index)"
    >
      <PuTab
        :text="tab.text"
        :showDot="index === props.modelValue ? false : tab.showDot"
        :size="props.size"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuTabs",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { puTabsProps, puTabsEmits } from "./puTabs";
import PuTab from "../puTab/puTab.vue";

const props = defineProps(puTabsProps);
const emit = defineEmits(puTabsEmits);

const rootClasses = computed(() => {
  const classes = ["pu-tabs"];
  if (props.customClass) classes.push(props.customClass);
  return classes;
});

function onClick(index: number) {
  if (index === props.modelValue) return;
  emit("update:modelValue", index);
  emit("change", index);
}
</script>

<style scoped lang="scss" src="./puTabs.scss"></style>

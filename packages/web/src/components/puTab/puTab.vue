<template>
  <div :class="rootClasses">
    <slot>
      <span class="pu-tab__text">{{ props.label }}</span>
    </slot>
    <span v-if="props.showDot" class="pu-tab__dot" aria-hidden="true" />
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuTab",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { puSizes } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puTabsVariants, type PuTabsVariant } from "../puTabs/puTabs";
import { puTabProps } from "./puTab";

const props = defineProps(puTabProps);

const variant = computed<PuTabsVariant>(() =>
  normalizePuVariant(puTabsVariants, props.variant, "line"),
);
const size = computed(() => normalizePuVariant(puSizes, props.size, "md"));

const rootClasses = computed(() => {
  const classes = ["pu-tab"] as string[];
  classes.push(createPuModifierClass("pu-tab", "variant", variant.value) ?? "");
  classes.push(createPuModifierClass("pu-tab", "size", size.value) ?? "");
  classes.push(createPuStateClass("active", props.active) ?? "");
  classes.push(createPuStateClass("disabled", props.disabled) ?? "");
  return classes.filter(Boolean);
});
</script>

<style scoped lang="scss" src="./puTab.scss"></style>

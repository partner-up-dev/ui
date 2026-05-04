<template>
  <div
    class="pu-info-row"
    :class="[
      `pu-info-row--layout-${props.layout}`,
      `pu-info-row--align-${props.align}`,
      { 'pu-info-row--collapse': props.collapseOnMobile },
    ]"
  >
    <div v-if="props.label || $slots.label" class="pu-info-row__label">
      <slot name="label">
        {{ props.label }}
      </slot>
    </div>
    <div class="pu-info-row__value">
      <slot>
        {{ props.value }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuInfoRow",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { puInfoRowProps } from "./puInfoRow";

const props = defineProps(puInfoRowProps);
</script>

<style lang="scss" scoped src="./puInfoRow.scss"></style>


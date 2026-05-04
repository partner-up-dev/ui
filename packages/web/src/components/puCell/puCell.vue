<template>
  <component
    :is="props.as"
    class="pu-cell"
    :class="{ 'pu-cell--border': props.border }"
    :type="props.as === 'button' ? props.type : undefined"
  >
    <div v-if="hasTitle" class="pu-cell__title">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>

    <div v-if="hasRight" class="pu-cell__right">
      <div v-if="hasValue" class="pu-cell__value">
        <slot>
          {{ props.value }}
        </slot>
      </div>

      <span v-if="hasSuffix" class="pu-cell__suffix" aria-hidden="true">
        <slot name="suffix">
          <span v-if="props.suffixIcon" :class="props.suffixIcon"></span>
        </slot>
      </span>
    </div>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuCell",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { puCellProps } from "./puCell";

const props = defineProps(puCellProps);
const slots = useSlots();

const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasValue = computed(
  () =>
    Boolean(slots.default) ||
    (props.value !== null &&
      props.value !== undefined &&
      String(props.value).length > 0),
);
const hasSuffix = computed(
  () => Boolean(slots.suffix) || Boolean(props.suffixIcon),
);
const hasRight = computed(() => hasValue.value || hasSuffix.value);
</script>

<style lang="scss" scoped src="./puCell.scss"></style>


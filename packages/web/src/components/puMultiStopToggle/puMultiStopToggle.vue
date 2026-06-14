<template>
  <div
    class="pu-multi-stop-toggle"
    :class="rootClasses"
    :style="toggleStyle"
    role="slider"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
    :aria-valuemin="0"
    :aria-valuemax="maxIndex"
    :aria-valuenow="activeIndex"
    :aria-valuetext="activeValueText"
    :aria-disabled="props.disabled ? true : undefined"
    :tabindex="props.disabled ? undefined : 0"
    @click="selectNextByBounce"
    @keydown.enter.prevent="selectNextByBounce"
    @keydown.space.prevent="selectNextByBounce"
    @keydown.arrow-right.prevent="selectNextStop"
    @keydown.arrow-down.prevent="selectNextStop"
    @keydown.arrow-left.prevent="selectPreviousStop"
    @keydown.arrow-up.prevent="selectPreviousStop"
    @keydown.home.prevent="selectFirstStop"
    @keydown.end.prevent="selectLastStop"
  >
    <span class="pu-multi-stop-toggle__track" aria-hidden="true">
      <span class="pu-multi-stop-toggle__thumb" />
    </span>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuMultiStopToggle",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { puSizes, type PuSize } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puMultiStopToggleEmits,
  puMultiStopToggleProps,
  type PuMultiStopToggleOption,
} from "./puMultiStopToggle";

const props = defineProps(puMultiStopToggleProps);
const emit = defineEmits(puMultiStopToggleEmits);

const bounceDirection = ref<1 | -1>(1);

const size = computed<PuSize>(() => normalizePuVariant(puSizes, props.size, "md"));
const maxIndex = computed(() => Math.max(props.options.length - 1, 0));

const activeIndex = computed(() => {
  const index = props.options.findIndex((option) =>
    Object.is(option.value, props.modelValue),
  );

  return index >= 0 ? index : 0;
});

const activeOption = computed<PuMultiStopToggleOption | null>(
  () => props.options[activeIndex.value] ?? null,
);

const activeValueText = computed(
  () => activeOption.value?.ariaLabel ?? activeOption.value?.label ?? "",
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-multi-stop-toggle", "size", size.value),
  createPuStateClass("disabled", props.disabled),
]);

const toggleStyle = computed(() => ({
  "--pu-multi-stop-toggle-index": String(activeIndex.value),
  "--pu-multi-stop-toggle-count": String(Math.max(props.options.length, 2)),
}));

function selectOptionAt(index: number): void {
  if (props.disabled || props.options.length === 0) {
    return;
  }

  const nextOption = props.options[index];
  if (!nextOption || Object.is(nextOption.value, props.modelValue)) {
    return;
  }

  emit("update:modelValue", nextOption.value);
  emit("change", nextOption.value, nextOption, index);
}

function syncBounceDirectionForIndex(index: number): void {
  if (index <= 0) {
    bounceDirection.value = 1;
    return;
  }

  if (index >= maxIndex.value) {
    bounceDirection.value = -1;
  }
}

function selectNextByBounce(): void {
  if (props.options.length === 0) {
    return;
  }

  let nextIndex = activeIndex.value + bounceDirection.value;

  if (nextIndex > maxIndex.value) {
    bounceDirection.value = -1;
    nextIndex = Math.max(maxIndex.value - 1, 0);
  }

  if (nextIndex < 0) {
    bounceDirection.value = 1;
    nextIndex = Math.min(1, maxIndex.value);
  }

  selectOptionAt(nextIndex);
  syncBounceDirectionForIndex(nextIndex);
}

function selectNextStop(): void {
  if (props.options.length === 0) {
    return;
  }

  const nextIndex = Math.min(activeIndex.value + 1, maxIndex.value);
  selectOptionAt(nextIndex);
  syncBounceDirectionForIndex(nextIndex);
}

function selectPreviousStop(): void {
  if (props.options.length === 0) {
    return;
  }

  const nextIndex = Math.max(activeIndex.value - 1, 0);
  selectOptionAt(nextIndex);
  syncBounceDirectionForIndex(nextIndex);
}

function selectFirstStop(): void {
  selectOptionAt(0);
  syncBounceDirectionForIndex(0);
}

function selectLastStop(): void {
  selectOptionAt(maxIndex.value);
  syncBounceDirectionForIndex(maxIndex.value);
}
</script>

<style lang="scss" scoped src="./puMultiStopToggle.scss"></style>


<template>
  <button
    :id="itemId"
    ref="buttonRef"
    class="pu-segmented-item"
    :class="rootClasses"
    type="button"
    :role="itemRole"
    :disabled="isDisabled"
    :aria-disabled="ariaDisabled"
    :aria-checked="ariaChecked"
    :aria-selected="ariaSelected"
    :aria-controls="ariaControls"
    :tabindex="tabIndex"
    @click="onClick"
    @keydown="onKeydown"
  >
    <span v-if="hasLeading" class="pu-segmented-item__leading" aria-hidden="true">
      <slot name="leading" />
    </span>

    <span v-if="hasLabel" class="pu-segmented-item__label">
      <slot>
        {{ props.label }}
      </slot>
    </span>

    <span v-if="hasTrailing" class="pu-segmented-item__trailing" aria-hidden="true">
      <slot name="trailing" />
    </span>
  </button>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuSegmentedItem",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, useSlots } from "vue";
import { usePuId } from "../../composables";
import {
  puDensities,
  puSizes,
  type PuDensity,
  type PuSize,
  type PuTone,
} from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puSegmentedKey } from "../puSegmented/context";
import type {
  PuSegmentedSemantics,
  PuSegmentedValue,
} from "../puSegmented/puSegmented";
import { puSegmentedItemProps } from "./puSegmentedItem";

const props = defineProps(puSegmentedItemProps);
const slots = useSlots();
const segmented = inject(puSegmentedKey, null);

const itemId = usePuId("pu-segmented-item");
const buttonRef = ref<HTMLButtonElement | null>(null);
const itemValue = computed<PuSegmentedValue>(() => props.value);

const semantics = computed<PuSegmentedSemantics>(
  () => segmented?.semantics.value ?? "radio",
);
const size = computed<PuSize>(() =>
  segmented ? segmented.size.value : normalizePuVariant(puSizes, "md", "md"),
);
const density = computed<PuDensity>(() =>
  segmented
    ? segmented.density.value
    : normalizePuVariant(puDensities, "comfortable", "comfortable"),
);
const tone = computed<PuTone>(() => segmented?.tone.value ?? "neutral");
const isSelected = computed(() =>
  segmented ? segmented.isSelected(props.value) : false,
);
const isDisabled = computed(() => Boolean(segmented?.disabled.value) || props.disabled);
const itemRole = computed(() => (semantics.value === "tabs" ? "tab" : "radio"));
const ariaChecked = computed(() =>
  semantics.value === "radio" ? isSelected.value : undefined,
);
const ariaSelected = computed(() =>
  semantics.value === "tabs" ? isSelected.value : undefined,
);
const ariaControls = computed(() =>
  semantics.value === "tabs" ? props.panelId : undefined,
);
const ariaDisabled = computed(() => (isDisabled.value ? true : undefined));
const tabIndex = computed(() =>
  segmented ? segmented.getItemTabIndex(props.value, isDisabled.value) : 0,
);

const hasLeading = computed(() => Boolean(slots.leading));
const hasTrailing = computed(() => Boolean(slots.trailing));
const hasLabel = computed(() => Boolean(slots.default) || Boolean(props.label));

const rootClasses = computed(() => [
  createPuModifierClass("pu-segmented-item", "size", size.value),
  createPuModifierClass("pu-segmented-item", "density", density.value),
  createPuModifierClass("pu-segmented-item", "tone", tone.value),
  createPuStateClass("selected", isSelected.value),
  createPuStateClass("disabled", isDisabled.value),
]);

function onClick(event: MouseEvent): void {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }

  segmented?.selectValue(props.value);
}

function onKeydown(event: KeyboardEvent): void {
  segmented?.handleItemKeydown(props.value, event);
}

onMounted(() => {
  segmented?.registerItem({
    id: itemId.value,
    value: itemValue,
    disabled: isDisabled,
    element: buttonRef,
  });
});

onBeforeUnmount(() => {
  segmented?.unregisterItem(itemId.value);
});
</script>

<style lang="scss" scoped src="./puSegmentedItem.scss"></style>

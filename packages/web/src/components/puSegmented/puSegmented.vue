<template>
  <div
    ref="rootRef"
    class="pu-segmented"
    :class="rootClasses"
    :role="rootRole"
    :aria-orientation="orientation"
    :aria-disabled="ariaDisabled"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuSegmented",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, nextTick, provide, ref, shallowRef } from "vue";
import {
  puControlVariants,
  puDensities,
  puOrientations,
  puSizes,
  puTones,
  type PuControlVariant,
  type PuDensity,
  type PuOrientation,
  type PuSize,
  type PuTone,
} from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puSegmentedActivations,
  puSegmentedEmits,
  puSegmentedProps,
  puSegmentedSemantics,
  type PuSegmentedActivation,
  type PuSegmentedSemantics,
  type PuSegmentedValue,
} from "./puSegmented";
import {
  puSegmentedKey,
  type PuSegmentedItemRegistration,
} from "./context";

const props = defineProps(puSegmentedProps);
const emit = defineEmits(puSegmentedEmits);

const rootRef = ref<HTMLElement | null>(null);
const items = shallowRef<PuSegmentedItemRegistration[]>([]);
const focusedValue = ref<PuSegmentedValue | undefined>(undefined);

const semantics = computed<PuSegmentedSemantics>(() =>
  normalizePuVariant(puSegmentedSemantics, props.semantics, "radio"),
);
const activation = computed<PuSegmentedActivation>(() =>
  normalizePuVariant(puSegmentedActivations, props.activation, "automatic"),
);
const orientation = computed<PuOrientation>(() =>
  normalizePuVariant(puOrientations, props.orientation, "horizontal"),
);
const size = computed<PuSize>(() => normalizePuVariant(puSizes, props.size, "md"));
const density = computed<PuDensity>(() =>
  normalizePuVariant(puDensities, props.density, "comfortable"),
);
const tone = computed<PuTone>(() =>
  normalizePuVariant(puTones, props.tone, "neutral"),
);
const variant = computed<PuControlVariant>(() =>
  normalizePuVariant(puControlVariants, props.variant, "soft"),
);
const selectedValue = computed(() => props.modelValue);

const rootRole = computed(() =>
  semantics.value === "tabs" ? "tablist" : "radiogroup",
);
const ariaDisabled = computed(() => (props.disabled ? true : undefined));

const rootClasses = computed(() => [
  createPuModifierClass("pu-segmented", "semantics", semantics.value),
  createPuModifierClass("pu-segmented", "orientation", orientation.value),
  createPuModifierClass("pu-segmented", "size", size.value),
  createPuModifierClass("pu-segmented", "density", density.value),
  createPuModifierClass("pu-segmented", "tone", tone.value),
  createPuModifierClass("pu-segmented", "variant", variant.value),
  createPuStateClass("disabled", props.disabled),
  createPuStateClass("full-width", props.fullWidth),
  createPuStateClass("equal-width", props.equalWidth),
]);

function valuesEqual(a: PuSegmentedValue | undefined, b: PuSegmentedValue): boolean {
  return a !== undefined && Object.is(a, b);
}

function getOrderedItems(): PuSegmentedItemRegistration[] {
  return [...items.value].sort((a, b) => {
    const elementA = a.element.value;
    const elementB = b.element.value;

    if (!elementA || !elementB || elementA === elementB) {
      return 0;
    }

    const position = elementA.compareDocumentPosition(elementB);

    if (position & 4) {
      return -1;
    }

    if (position & 2) {
      return 1;
    }

    return 0;
  });
}

function getEnabledItems(): PuSegmentedItemRegistration[] {
  return getOrderedItems().filter((item) => !item.disabled.value);
}

function findItem(value: PuSegmentedValue): PuSegmentedItemRegistration | undefined {
  return items.value.find((item) => Object.is(item.value.value, value));
}

function getTabStopValue(): PuSegmentedValue | undefined {
  const enabledItems = getEnabledItems();
  const focusedItem = enabledItems.find((item) =>
    valuesEqual(focusedValue.value, item.value.value),
  );

  if (focusedItem) {
    return focusedItem.value.value;
  }

  const selectedItem = enabledItems.find((item) =>
    valuesEqual(selectedValue.value, item.value.value),
  );

  return selectedItem?.value.value ?? enabledItems[0]?.value.value;
}

function focusItem(item: PuSegmentedItemRegistration | undefined): void {
  if (!item) {
    return;
  }

  focusedValue.value = item.value.value;
  nextTick(() => item.element.value?.focus());
}

function selectValue(value: PuSegmentedValue): void {
  if (props.disabled) {
    return;
  }

  const item = findItem(value);

  if (!item || item.disabled.value) {
    return;
  }

  focusedValue.value = value;

  if (Object.is(props.modelValue, value)) {
    return;
  }

  emit("update:modelValue", value);
  emit("change", value);
}

function moveFromValue(value: PuSegmentedValue, offset: 1 | -1): void {
  const enabledItems = getEnabledItems();

  if (enabledItems.length === 0) {
    return;
  }

  const currentIndex = enabledItems.findIndex((item) =>
    Object.is(item.value.value, value),
  );
  const startIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextIndex =
    (startIndex + offset + enabledItems.length) % enabledItems.length;
  const nextItem = enabledItems[nextIndex];

  focusItem(nextItem);

  if (activation.value === "automatic" && nextItem) {
    selectValue(nextItem.value.value);
  }
}

function moveToBoundary(boundary: "first" | "last"): void {
  const enabledItems = getEnabledItems();
  const item =
    boundary === "first" ? enabledItems[0] : enabledItems[enabledItems.length - 1];

  focusItem(item);

  if (activation.value === "automatic" && item) {
    selectValue(item.value.value);
  }
}

function handleItemKeydown(
  value: PuSegmentedValue,
  event: KeyboardEvent,
): void {
  if (props.disabled) {
    return;
  }

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    moveFromValue(value, 1);
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    moveFromValue(value, -1);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    moveToBoundary("first");
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    moveToBoundary("last");
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectValue(value);
  }
}

function registerItem(item: PuSegmentedItemRegistration): void {
  if (items.value.some((entry) => entry.id === item.id)) {
    return;
  }

  items.value = [...items.value, item];
}

function unregisterItem(id: string): void {
  const removedItem = items.value.find((item) => item.id === id);
  items.value = items.value.filter((item) => item.id !== id);

  if (
    removedItem &&
    focusedValue.value !== undefined &&
    Object.is(removedItem.value.value, focusedValue.value)
  ) {
    focusedValue.value = undefined;
  }
}

function isSelected(value: PuSegmentedValue): boolean {
  return valuesEqual(selectedValue.value, value);
}

function getItemTabIndex(value: PuSegmentedValue, disabled: boolean): number {
  if (disabled) {
    return -1;
  }

  return valuesEqual(getTabStopValue(), value) ? 0 : -1;
}

provide(puSegmentedKey, {
  selectedValue,
  semantics,
  activation,
  disabled: computed(() => props.disabled),
  orientation,
  size,
  density,
  tone,
  variant,
  registerItem,
  unregisterItem,
  isSelected,
  getItemTabIndex,
  selectValue,
  handleItemKeydown,
});
</script>

<style lang="scss" scoped src="./puSegmented.scss"></style>

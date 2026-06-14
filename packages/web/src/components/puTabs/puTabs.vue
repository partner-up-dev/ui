<template>
  <div :class="rootClasses">
    <div class="pu-tabs__list" role="tablist">
      <button
        v-for="(tab, index) in props.tabs"
        :key="tab.value"
        :ref="(element) => setTabRef(element, index)"
        type="button"
        role="tab"
        :aria-selected="isActive(tab)"
        :aria-disabled="tab.disabled ? true : undefined"
        :tabindex="getTabIndex(tab)"
        :disabled="tab.disabled"
        class="pu-tabs__item"
        @click="selectTab(index)"
        @keydown="handleKeydown(index, $event)"
      >
        <PuTab
          :label="tab.label"
          :show-dot="!isActive(tab) && Boolean(tab.showDot)"
          :active="isActive(tab)"
          :disabled="Boolean(tab.disabled)"
          :variant="variant"
          :size="size"
        />
      </button>
    </div>
    <div v-if="$slots.append" class="pu-tabs__append">
      <slot name="append" />
    </div>
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
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
  type ComponentPublicInstance,
} from "vue";
import { puSizes, type PuSize } from "../../types";
import {
  createPuModifierClass,
  normalizePuVariant,
} from "../../utils";
import {
  puTabsProps,
  puTabsEmits,
  puTabsVariants,
  type PuTabItem,
  type PuTabValue,
  type PuTabsVariant,
} from "./puTabs";
import PuTab from "../puTab/puTab.vue";

const props = defineProps(puTabsProps);
const emit = defineEmits(puTabsEmits);

const tabRefs = ref<(HTMLButtonElement | null)[]>([]);

const variant = computed<PuTabsVariant>(() =>
  normalizePuVariant(puTabsVariants, props.variant, "line"),
);
const size = computed<PuSize>(() => normalizePuVariant(puSizes, props.size, "md"));

const rootClasses = computed(() => {
  const classes = [
    "pu-tabs",
    createPuModifierClass("pu-tabs", "variant", variant.value),
    createPuModifierClass("pu-tabs", "size", size.value),
  ];
  return classes.filter(Boolean);
});

const selectedIndex = computed(() =>
  props.tabs.findIndex((tab) => valuesEqual(tab.value, props.modelValue)),
);

const enabledIndexes = computed(() =>
  props.tabs.reduce<number[]>((indexes, tab, index) => {
    if (!tab.disabled) indexes.push(index);
    return indexes;
  }, []),
);

function valuesEqual(a: PuTabValue | undefined, b: PuTabValue | undefined): boolean {
  return a !== undefined && b !== undefined && Object.is(a, b);
}

function setTabRef(
  element: Element | ComponentPublicInstance | null,
  index: number,
): void {
  tabRefs.value[index] = element instanceof HTMLButtonElement ? element : null;
}

function isActive(tab: PuTabItem): boolean {
  return valuesEqual(tab.value, props.modelValue);
}

function getTabStopIndex(): number {
  if (
    selectedIndex.value >= 0 &&
    !props.tabs[selectedIndex.value]?.disabled
  ) {
    return selectedIndex.value;
  }

  return enabledIndexes.value[0] ?? -1;
}

function getTabIndex(tab: PuTabItem): number {
  if (tab.disabled) return -1;
  const index = props.tabs.indexOf(tab);
  return index === getTabStopIndex() ? 0 : -1;
}

function emitSelection(index: number): void {
  const tab = props.tabs[index];
  if (!tab || tab.disabled) return;

  if (!valuesEqual(tab.value, props.modelValue)) {
    emit("update:modelValue", tab.value);
    emit("change", {
      value: tab.value,
      index,
      tab,
    });
  }
}

function selectTab(index: number): void {
  emitSelection(index);
}

function focusTab(index: number): void {
  nextTick(() => tabRefs.value[index]?.focus());
}

function selectAndFocus(index: number): void {
  emitSelection(index);
  focusTab(index);
}

function getRelativeEnabledIndex(index: number, offset: 1 | -1): number {
  const indexes = enabledIndexes.value;
  if (indexes.length === 0) return -1;

  const enabledPosition = indexes.indexOf(index);
  const startPosition = enabledPosition >= 0 ? enabledPosition : 0;
  return indexes[(startPosition + offset + indexes.length) % indexes.length];
}

function handleKeydown(index: number, event: KeyboardEvent): void {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    selectAndFocus(getRelativeEnabledIndex(index, 1));
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    selectAndFocus(getRelativeEnabledIndex(index, -1));
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    selectAndFocus(enabledIndexes.value[0] ?? -1);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    selectAndFocus(enabledIndexes.value[enabledIndexes.value.length - 1] ?? -1);
  }
}

function scrollActiveTabIntoView(): void {
  const activeElement = tabRefs.value[selectedIndex.value];
  if (!activeElement) return;

  activeElement.scrollIntoView({
    block: "nearest",
    inline: "nearest",
  });
}

onMounted(() => {
  scrollActiveTabIntoView();
});

watch(
  () => [props.modelValue, props.tabs.length],
  () => nextTick(scrollActiveTabIntoView),
);
</script>

<style scoped lang="scss" src="./puTabs.scss"></style>

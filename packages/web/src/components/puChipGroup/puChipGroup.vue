<template>
  <component
    :is="props.as"
    ref="rootRef"
    class="pu-chip-group"
    :class="rootClasses"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuChipGroup",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { puAligns, puGaps, type PuAlign, type PuGap } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puChipGroupProps } from "./puChipGroup";

const props = defineProps(puChipGroupProps);

const rootRef = ref<HTMLElement | null>(null);
const fitReady = ref(false);
let resizeObserver: ResizeObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let animationFrame = 0;

const gap = computed<PuGap>(() => normalizePuVariant(puGaps, props.gap, "sm"));
const align = computed<PuAlign>(() =>
  normalizePuVariant(puAligns, props.align, "start"),
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-chip-group", "gap", gap.value),
  createPuModifierClass("pu-chip-group", "align", align.value),
  createPuStateClass("wrap", props.wrap && !props.fit),
  createPuStateClass("fit", props.fit),
  createPuStateClass("fit-ready", fitReady.value || !props.fit),
]);

function getElementChildren(): HTMLElement[] {
  return Array.from(rootRef.value?.children ?? []).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
}

function setChildrenHidden(hiddenFromIndex: number): void {
  getElementChildren().forEach((child, index) => {
    child.hidden = index >= hiddenFromIndex;
  });
}

function measureFit(): void {
  const root = rootRef.value;
  if (!root || !props.fit) {
    setChildrenHidden(Number.POSITIVE_INFINITY);
    fitReady.value = true;
    return;
  }

  const children = getElementChildren();
  children.forEach((child) => {
    child.hidden = false;
  });

  const availableWidth = root.clientWidth;
  let visibleCount = children.length;

  for (const [index, child] of children.entries()) {
    const childRightEdge = child.offsetLeft + child.offsetWidth;
    if (childRightEdge > availableWidth) {
      visibleCount = index;
      break;
    }
  }

  setChildrenHidden(visibleCount);
  fitReady.value = true;
}

async function scheduleMeasure(): Promise<void> {
  if (!props.fit) {
    setChildrenHidden(Number.POSITIVE_INFINITY);
    fitReady.value = true;
    return;
  }

  fitReady.value = false;
  await nextTick();

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  animationFrame = requestAnimationFrame(() => {
    animationFrame = 0;
    measureFit();
  });
}

watch(
  () => [props.fit, props.gap, props.align, props.wrap] as const,
  () => {
    void scheduleMeasure();
  },
);

onMounted(() => {
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => {
      void scheduleMeasure();
    });

    if (rootRef.value) {
      resizeObserver.observe(rootRef.value);
    }
  }

  if (typeof MutationObserver !== "undefined" && rootRef.value) {
    mutationObserver = new MutationObserver(() => {
      void scheduleMeasure();
    });

    mutationObserver.observe(rootRef.value, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  void scheduleMeasure();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  mutationObserver?.disconnect();
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<style lang="scss" scoped src="./puChipGroup.scss"></style>

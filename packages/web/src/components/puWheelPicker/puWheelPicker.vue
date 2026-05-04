<template>
  <div
    ref="rootRef"
    class="pu-wheel-picker"
    :class="[
      `pu-wheel-picker--tone-${resolvedTone}`,
      {
        'is-disabled': props.disabled,
        'is-dragging': isDragging,
        'is-snapping': isSnapping,
      },
    ]"
    :style="rootStyle"
    role="listbox"
    :aria-label="props.ariaLabel"
    :aria-disabled="props.disabled ? 'true' : undefined"
    :aria-activedescendant="activeOptionId"
    :tabindex="props.disabled ? -1 : 0"
    @keydown="handleKeydown"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerCancel"
    @wheel="handleWheel"
  >
    <div class="pu-wheel-picker__viewport">
      <div class="pu-wheel-picker__highlight" aria-hidden="true"></div>
      <div class="pu-wheel-picker__fade pu-wheel-picker__fade--top" aria-hidden="true"></div>
      <div
        class="pu-wheel-picker__fade pu-wheel-picker__fade--bottom"
        aria-hidden="true"
      ></div>

      <div class="pu-wheel-picker__list" :style="listStyle">
        <button
          v-for="(option, index) in props.options"
          :id="getOptionId(index)"
          :key="`${String(option.value)}-${index}`"
          class="pu-wheel-picker__option"
          :class="{
            'pu-wheel-picker__option--active': index === activeIndex,
            'pu-wheel-picker__option--disabled': option.disabled,
          }"
          :style="getOptionStyle(index)"
          type="button"
          role="option"
          :aria-selected="index === activeIndex"
          :disabled="props.disabled || option.disabled"
          @click="handleOptionClick(index)"
        >
          <span class="pu-wheel-picker__option-label">
            <slot
              name="option"
              :option="option"
              :index="index"
              :active="index === activeIndex"
              :selected="index === activeIndex"
              :disabled="option.disabled === true"
            >
              {{ option.label }}
            </slot>
          </span>
        </button>
      </div>

      <div
        v-if="props.emptyLabel && props.options.length === 0"
        class="pu-wheel-picker__empty"
      >
        {{ props.emptyLabel }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

let wheelPickerIdSeed = 0;

export default {
  name: "PuWheelPicker",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch, type CSSProperties } from "vue";
import {
  puWheelPickerEmits,
  puWheelPickerProps,
  type PuWheelPickerOption,
  type PuWheelPickerTone,
} from "./puWheelPicker";

type WheelPickerStyle = CSSProperties & Record<`--${string}`, string>;

type DragState = {
  pointerId: number;
  startY: number;
  startScrollPosition: number;
  lastY: number;
  lastTime: number;
  velocityY: number;
};

const SNAP_DURATION_MS = 220;
const WHEEL_IDLE_MS = 140;
const INERTIA_MS = 180;
const DRAG_CLICK_SUPPRESSION_PX = 4;
const WHEEL_DELTA_LINE = 1;
const WHEEL_DELTA_PAGE = 2;

const props = defineProps(puWheelPickerProps);
const emit = defineEmits(puWheelPickerEmits);

defineSlots<{
  option(props: {
    option: PuWheelPickerOption;
    index: number;
    active: boolean;
    selected: boolean;
    disabled: boolean;
  }): unknown;
}>();

const rootRef = ref<HTMLElement | null>(null);
const pickerId = `pu-wheel-picker-${++wheelPickerIdSeed}`;
const scrollPositionPx = ref(0);
const isDragging = ref(false);
const isSnapping = ref(false);
const suppressNextClick = ref(false);
const dragState = ref<DragState | null>(null);

let snapTimer: number | null = null;
let wheelTimer: number | null = null;
let lastWheelDirection = 0;

const resolvedTone = computed<PuWheelPickerTone>(() => {
  const rawTone = props.tone ?? props.variant;
  return rawTone === "teritary" ? "tertiary" : rawTone;
});

const itemHeightPx = computed(() => {
  if (!Number.isFinite(props.itemHeight)) {
    return 44;
  }

  return Math.max(32, Math.round(props.itemHeight));
});

const normalizedVisibleCount = computed(() => {
  if (!Number.isFinite(props.visibleCount)) {
    return 5;
  }

  const rounded = Math.max(3, Math.round(props.visibleCount));
  return rounded % 2 === 0 ? rounded + 1 : rounded;
});

const viewportHeightPx = computed(
  () => itemHeightPx.value * normalizedVisibleCount.value,
);

const centerOffsetPx = computed(
  () => (viewportHeightPx.value - itemHeightPx.value) / 2,
);

const maxScrollPositionPx = computed(() =>
  Math.max(0, (props.options.length - 1) * itemHeightPx.value),
);

const activeIndex = computed(() => {
  if (props.options.length === 0) {
    return -1;
  }

  return clampIndex(Math.round(scrollPositionPx.value / itemHeightPx.value));
});

const activeOptionId = computed(() =>
  activeIndex.value >= 0 ? getOptionId(activeIndex.value) : undefined,
);

const rootStyle = computed<WheelPickerStyle>(() => ({
  "--pu-wheel-picker-item-height": `${itemHeightPx.value}px`,
  "--pu-wheel-picker-viewport-height": `${viewportHeightPx.value}px`,
}));

const listStyle = computed<CSSProperties>(() => ({
  transform: `translate3d(0, ${
    centerOffsetPx.value - scrollPositionPx.value
  }px, 0)`,
}));

watch(
  () => [props.modelValue, props.options, itemHeightPx.value] as const,
  () => {
    syncScrollPositionToModel();
  },
  { immediate: true, flush: "post" },
);

onBeforeUnmount(() => {
  clearSnapTimer();
  clearWheelTimer();
});

function getOptionId(index: number): string {
  return `${pickerId}-option-${index}`;
}

function getOptionStyle(index: number): CSSProperties {
  const virtualIndex = scrollPositionPx.value / itemHeightPx.value;
  const distance = index - virtualIndex;
  const absoluteDistance = Math.min(
    Math.abs(distance),
    normalizedVisibleCount.value,
  );
  const scale = Math.max(0.82, 1 - absoluteDistance * 0.075);
  const opacity = Math.max(0.22, 1 - absoluteDistance * 0.22);
  const rotateX = clampNumber(distance * -16, -42, 42);

  return {
    height: `${itemHeightPx.value}px`,
    transform: `rotateX(${rotateX}deg) scale(${scale})`,
    opacity: String(opacity),
  };
}

function handlePointerDown(event: PointerEvent): void {
  if (props.disabled || props.options.length === 0 || !isPrimaryPointer(event)) {
    return;
  }

  clearSnapTimer();
  clearWheelTimer();

  const target = event.currentTarget;
  if (target instanceof HTMLElement) {
    target.setPointerCapture(event.pointerId);
    target.focus({ preventScroll: true });
  }

  const now = performance.now();
  isDragging.value = true;
  isSnapping.value = false;
  suppressNextClick.value = false;
  dragState.value = {
    pointerId: event.pointerId,
    startY: event.clientY,
    startScrollPosition: scrollPositionPx.value,
    lastY: event.clientY,
    lastTime: now,
    velocityY: 0,
  };
}

function handlePointerMove(event: PointerEvent): void {
  const state = dragState.value;
  if (!state || state.pointerId !== event.pointerId) {
    return;
  }

  event.preventDefault();

  const deltaY = event.clientY - state.startY;
  if (Math.abs(deltaY) > DRAG_CLICK_SUPPRESSION_PX) {
    suppressNextClick.value = true;
  }

  setScrollPosition(state.startScrollPosition - deltaY);

  const now = performance.now();
  const elapsed = Math.max(1, now - state.lastTime);
  state.velocityY = (event.clientY - state.lastY) / elapsed;
  state.lastY = event.clientY;
  state.lastTime = now;
}

function handlePointerUp(event: PointerEvent): void {
  finishPointerInteraction(event);
}

function handlePointerCancel(event: PointerEvent): void {
  finishPointerInteraction(event);
}

function handleWheel(event: WheelEvent): void {
  if (props.disabled || props.options.length === 0) {
    return;
  }

  event.preventDefault();
  clearSnapTimer();

  const delta = normalizeWheelDelta(event);
  lastWheelDirection = Math.sign(delta);
  isSnapping.value = false;
  setScrollPosition(scrollPositionPx.value + delta);

  clearWheelTimer();
  wheelTimer = window.setTimeout(() => {
    wheelTimer = null;
    snapToNearest(lastWheelDirection);
  }, WHEEL_IDLE_MS);
}

function handleOptionClick(index: number): void {
  if (suppressNextClick.value) {
    window.setTimeout(() => {
      suppressNextClick.value = false;
    }, 0);
    return;
  }

  if (props.disabled || props.options[index]?.disabled) {
    return;
  }

  snapToIndex(index, true);
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled || props.options.length === 0) {
    return;
  }

  const currentIndex = activeIndex.value >= 0 ? activeIndex.value : 0;
  let targetIndex: number | null = null;

  if (event.key === "ArrowDown") {
    targetIndex = findEnabledIndex(currentIndex + 1, 1);
  } else if (event.key === "ArrowUp") {
    targetIndex = findEnabledIndex(currentIndex - 1, -1);
  } else if (event.key === "PageDown") {
    targetIndex = resolveSnapIndex(
      (currentIndex + Math.floor(normalizedVisibleCount.value / 2)) *
        itemHeightPx.value,
      1,
    );
  } else if (event.key === "PageUp") {
    targetIndex = resolveSnapIndex(
      (currentIndex - Math.floor(normalizedVisibleCount.value / 2)) *
        itemHeightPx.value,
      -1,
    );
  } else if (event.key === "Home") {
    targetIndex = findEnabledIndex(0, 1);
  } else if (event.key === "End") {
    targetIndex = findEnabledIndex(props.options.length - 1, -1);
  }

  if (targetIndex === null) {
    return;
  }

  event.preventDefault();
  snapToIndex(targetIndex, true);
}

function finishPointerInteraction(event: PointerEvent): void {
  const state = dragState.value;
  if (!state || state.pointerId !== event.pointerId) {
    return;
  }

  const target = event.currentTarget;
  if (target instanceof HTMLElement && target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId);
  }

  const predictedPosition = scrollPositionPx.value - state.velocityY * INERTIA_MS;
  const targetIndex = resolveSnapIndex(predictedPosition, Math.sign(-state.velocityY));

  dragState.value = null;
  isDragging.value = false;
  snapToIndex(targetIndex, true);
}

function syncScrollPositionToModel(): void {
  const modelIndex = props.options.findIndex((option) =>
    Object.is(option.value, props.modelValue),
  );

  if (modelIndex >= 0) {
    moveToIndex(modelIndex, false, false);
    return;
  }

  const fallbackIndex =
    findNearestEnabledIndex(activeIndex.value, 0) ?? clampIndex(0);
  moveToIndex(fallbackIndex, false, false);
}

function snapToNearest(preferredDirection: number): void {
  const targetIndex = resolveSnapIndex(scrollPositionPx.value, preferredDirection);
  snapToIndex(targetIndex, true);
}

function snapToIndex(index: number, shouldCommit: boolean): void {
  moveToIndex(index, true, shouldCommit);
}

function moveToIndex(
  index: number,
  shouldAnimate: boolean,
  shouldCommit: boolean,
): void {
  const targetIndex = clampIndex(index);
  clearSnapTimer();

  if (targetIndex < 0) {
    isSnapping.value = false;
    setScrollPosition(0);
    return;
  }

  isSnapping.value = shouldAnimate;
  setScrollPosition(targetIndex * itemHeightPx.value);

  if (!shouldAnimate) {
    isSnapping.value = false;
    if (shouldCommit) {
      commitIndex(targetIndex);
    }
    return;
  }

  snapTimer = window.setTimeout(() => {
    snapTimer = null;
    isSnapping.value = false;
    if (shouldCommit) {
      commitIndex(targetIndex);
    }
  }, SNAP_DURATION_MS);
}

function commitIndex(index: number): void {
  const option = props.options[index];
  if (!option) {
    return;
  }

  if (!Object.is(props.modelValue, option.value)) {
    emit("update:modelValue", option.value);
  }
  emit("change", option.value, option, index);
}

function setScrollPosition(value: number): void {
  scrollPositionPx.value = clampNumber(value, 0, maxScrollPositionPx.value);
}

function resolveSnapIndex(positionPx: number, preferredDirection: number): number {
  const rawIndex = clampIndex(Math.round(positionPx / itemHeightPx.value));
  return findNearestEnabledIndex(rawIndex, preferredDirection) ?? rawIndex;
}

function findNearestEnabledIndex(
  index: number,
  preferredDirection: number,
): number | null {
  const boundedIndex = clampIndex(index);
  if (boundedIndex < 0) {
    return null;
  }

  if (isEnabledIndex(boundedIndex)) {
    return boundedIndex;
  }

  const forwardIndex = findEnabledIndex(boundedIndex + 1, 1);
  const backwardIndex = findEnabledIndex(boundedIndex - 1, -1);

  if (forwardIndex === null) {
    return backwardIndex;
  }

  if (backwardIndex === null) {
    return forwardIndex;
  }

  const forwardDistance = Math.abs(forwardIndex - boundedIndex);
  const backwardDistance = Math.abs(backwardIndex - boundedIndex);

  if (forwardDistance === backwardDistance) {
    return preferredDirection < 0 ? backwardIndex : forwardIndex;
  }

  return forwardDistance < backwardDistance ? forwardIndex : backwardIndex;
}

function findEnabledIndex(startIndex: number, direction: number): number | null {
  if (direction === 0 || props.options.length === 0) {
    return null;
  }

  const step = direction > 0 ? 1 : -1;
  let index = clampIndex(startIndex);

  while (index >= 0 && index < props.options.length) {
    if (isEnabledIndex(index)) {
      return index;
    }
    index += step;
  }

  return null;
}

function isEnabledIndex(index: number): boolean {
  const option = props.options[index];
  return option !== undefined && option.disabled !== true;
}

function clampIndex(index: number): number {
  if (props.options.length === 0) {
    return -1;
  }

  return Math.round(clampNumber(index, 0, props.options.length - 1));
}

function clampNumber(value: number, min: number, max: number): number {
  if (max < min) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

function normalizeWheelDelta(event: WheelEvent): number {
  if (event.deltaMode === WHEEL_DELTA_LINE) {
    return event.deltaY * itemHeightPx.value * 0.35;
  }

  if (event.deltaMode === WHEEL_DELTA_PAGE) {
    return event.deltaY * itemHeightPx.value;
  }

  return event.deltaY;
}

function isPrimaryPointer(event: PointerEvent): boolean {
  return event.pointerType !== "mouse" || event.button === 0;
}

function clearSnapTimer(): void {
  if (snapTimer !== null) {
    window.clearTimeout(snapTimer);
    snapTimer = null;
  }
}

function clearWheelTimer(): void {
  if (wheelTimer !== null) {
    window.clearTimeout(wheelTimer);
    wheelTimer = null;
  }
}
</script>

<style lang="scss" scoped src="./puWheelPicker.scss"></style>


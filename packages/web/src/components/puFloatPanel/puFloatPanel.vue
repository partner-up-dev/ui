<template>
  <div
    ref="rootRef"
    class="pu-float-panel"
    :class="rootClasses"
    :style="rootStyle"
  >
    <div
      ref="handleRef"
      class="pu-float-panel__handle"
      role="slider"
      :aria-label="handleAriaLabel"
      :aria-labelledby="props.ariaLabelledby"
      :aria-valuemin="0"
      :aria-valuemax="maxSliderIndex"
      :aria-valuenow="ariaStopIndex"
      :aria-valuetext="ariaStopLabel"
      :aria-disabled="isHandleDisabled ? 'true' : undefined"
      :tabindex="isHandleDisabled ? undefined : 0"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerCancel"
      @keydown.arrow-up.prevent="selectNextStop"
      @keydown.arrow-down.prevent="selectPreviousStop"
      @keydown.home.prevent="selectFirstStop"
      @keydown.end.prevent="selectLastStop"
    >
      <slot
        name="handle"
        :active-stop="committedPublicStop"
        :active-index="committedOriginalIndex"
        :height="liveHeight"
        :dragging="isDragging"
      >
        <span class="pu-float-panel__handle-bar" aria-hidden="true"></span>
      </slot>
    </div>

    <div
      class="pu-float-panel__content"
      :class="{ 'pu-float-panel__content--unpadded': !props.contentPadding }"
    >
      <slot
        :active-stop="committedPublicStop"
        :active-index="committedOriginalIndex"
        :height="liveHeight"
        :dragging="isDragging"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuFloatPanel",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch, type CSSProperties } from "vue";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puFloatPanelEmits,
  puFloatPanelPositions,
  puFloatPanelProps,
  type PuFloatPanelPosition,
  type PuFloatPanelStop,
} from "./puFloatPanel";

type FloatPanelStyle = CSSProperties & Record<`--${string}`, string>;

type NormalizedStop = PuFloatPanelStop & {
  originalIndex: number;
};

type DragState = {
  pointerId: number;
  startY: number;
  startHeight: number;
  lastY: number;
  lastTime: number;
  velocityY: number;
};

const SNAP_DURATION_MS = 220;
const INERTIA_MS = 160;

const props = defineProps(puFloatPanelProps);
const emit = defineEmits(puFloatPanelEmits);

defineSlots<{
  default(props: {
    activeStop: PuFloatPanelStop | null;
    activeIndex: number;
    height: number;
    dragging: boolean;
  }): unknown;
  handle(props: {
    activeStop: PuFloatPanelStop | null;
    activeIndex: number;
    height: number;
    dragging: boolean;
  }): unknown;
}>();

const rootRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);
const liveHeight = ref(0);
const isDragging = ref(false);
const isSnapping = ref(false);
const dragState = ref<DragState | null>(null);

let snapTimer: number | null = null;

const normalizedPosition = computed<PuFloatPanelPosition>(() =>
  normalizePuVariant(puFloatPanelPositions, props.position, "absolute"),
);

const normalizedStops = computed<NormalizedStop[]>(() =>
  props.stops
    .map((stop, index) => ({ ...stop, originalIndex: index }))
    .filter((stop) => Number.isFinite(stop.height) && stop.height >= 0)
    .sort((a, b) => a.height - b.height || a.originalIndex - b.originalIndex),
);

const enabledStops = computed(() =>
  normalizedStops.value.filter((stop) => stop.disabled !== true),
);

const minHeight = computed(() => enabledStops.value[0]?.height ?? 0);
const maxHeight = computed(() =>
  enabledStops.value[enabledStops.value.length - 1]?.height ?? minHeight.value,
);
const canMove = computed(() => !props.disabled && enabledStops.value.length > 1);
const isHandleDisabled = computed(
  () => props.disabled || enabledStops.value.length <= 1,
);

const committedStop = computed<NormalizedStop | null>(() => {
  const matchedStop = normalizedStops.value.find((stop) =>
    Object.is(stop.value, props.modelValue),
  );

  return matchedStop ?? enabledStops.value[0] ?? normalizedStops.value[0] ?? null;
});

const committedPublicStop = computed<PuFloatPanelStop | null>(() =>
  toPublicStop(committedStop.value),
);

const committedOriginalIndex = computed(
  () => committedStop.value?.originalIndex ?? -1,
);

const ariaStop = computed(
  () => resolveNearestStop(liveHeight.value, 0) ?? committedStop.value,
);

const ariaStopIndex = computed(() => {
  const stop = ariaStop.value;
  if (!stop) {
    return 0;
  }

  return Math.max(
    normalizedStops.value.findIndex(
      (candidate) => candidate.originalIndex === stop.originalIndex,
    ),
    0,
  );
});

const ariaStopLabel = computed(() => ariaStop.value?.label ?? "");
const maxSliderIndex = computed(() => Math.max(normalizedStops.value.length - 1, 0));
const handleAriaLabel = computed(() =>
  props.ariaLabelledby ? undefined : props.ariaLabel,
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-float-panel", "position", normalizedPosition.value),
  createPuStateClass("disabled", props.disabled),
  createPuStateClass("dragging", isDragging.value),
  createPuStateClass("snapping", isSnapping.value),
]);

const rootStyle = computed<FloatPanelStyle>(() => ({
  "--pu-float-panel-height": `${liveHeight.value}px`,
  zIndex: props.zIndex,
}));

watch(
  () => [props.modelValue, props.stops] as const,
  () => {
    if (isDragging.value) {
      return;
    }

    moveToStop(committedStop.value, false, false);
  },
  { immediate: true, flush: "post" },
);

onBeforeUnmount(() => {
  clearSnapTimer();
});

function handlePointerDown(event: PointerEvent): void {
  if (!canMove.value || !isPrimaryPointer(event)) {
    return;
  }

  event.preventDefault();
  clearSnapTimer();

  const target = event.currentTarget;
  if (target instanceof HTMLElement) {
    target.setPointerCapture(event.pointerId);
    target.focus({ preventScroll: true });
  }

  const now = performance.now();
  isDragging.value = true;
  isSnapping.value = false;
  dragState.value = {
    pointerId: event.pointerId,
    startY: event.clientY,
    startHeight: liveHeight.value,
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
  setLiveHeight(state.startHeight - deltaY);

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

function finishPointerInteraction(event: PointerEvent): void {
  const state = dragState.value;
  if (!state || state.pointerId !== event.pointerId) {
    return;
  }

  const target = event.currentTarget;
  if (target instanceof HTMLElement && target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId);
  }

  const predictedHeight = liveHeight.value - state.velocityY * INERTIA_MS;
  const targetStop = resolveNearestStop(predictedHeight, Math.sign(-state.velocityY));

  dragState.value = null;
  isDragging.value = false;
  moveToStop(targetStop, true, true);
}

function selectNextStop(): void {
  if (!canMove.value) {
    return;
  }

  const currentIndex = getCommittedEnabledIndex();
  if (currentIndex < 0) {
    moveToStop(enabledStops.value[0] ?? null, true, true);
    return;
  }

  moveToStop(
    enabledStops.value[Math.min(currentIndex + 1, enabledStops.value.length - 1)] ??
      null,
    true,
    true,
  );
}

function selectPreviousStop(): void {
  if (!canMove.value) {
    return;
  }

  const currentIndex = getCommittedEnabledIndex();
  if (currentIndex < 0) {
    moveToStop(enabledStops.value[0] ?? null, true, true);
    return;
  }

  moveToStop(
    enabledStops.value[Math.max(currentIndex - 1, 0)] ?? null,
    true,
    true,
  );
}

function selectFirstStop(): void {
  if (!canMove.value) {
    return;
  }

  moveToStop(enabledStops.value[0] ?? null, true, true);
}

function selectLastStop(): void {
  if (!canMove.value) {
    return;
  }

  moveToStop(enabledStops.value[enabledStops.value.length - 1] ?? null, true, true);
}

function moveToStop(
  stop: NormalizedStop | null,
  shouldAnimate: boolean,
  shouldCommit: boolean,
): void {
  if (!stop) {
    clearSnapTimer();
    isSnapping.value = false;
    liveHeight.value = 0;
    return;
  }

  clearSnapTimer();
  isSnapping.value = shouldAnimate;
  setLiveHeight(stop.height);

  if (!shouldAnimate) {
    isSnapping.value = false;
    if (shouldCommit) {
      commitStop(stop);
    }
    return;
  }

  snapTimer = window.setTimeout(() => {
    snapTimer = null;
    isSnapping.value = false;
    if (shouldCommit) {
      commitStop(stop);
    }
  }, SNAP_DURATION_MS);
}

function commitStop(stop: NormalizedStop): void {
  if (Object.is(props.modelValue, stop.value)) {
    return;
  }

  const publicStop = toPublicStop(stop);
  if (!publicStop) {
    return;
  }

  emit("update:modelValue", stop.value);
  emit("change", stop.value, publicStop, stop.originalIndex);
}

function setLiveHeight(value: number): void {
  liveHeight.value = clampNumber(value, minHeight.value, maxHeight.value);
}

function resolveNearestStop(
  height: number,
  preferredDirection: number,
): NormalizedStop | null {
  if (enabledStops.value.length === 0) {
    return null;
  }

  const boundedHeight = clampNumber(height, minHeight.value, maxHeight.value);
  let nearest = enabledStops.value[0];
  let nearestDistance = Math.abs(nearest.height - boundedHeight);

  for (const stop of enabledStops.value.slice(1)) {
    const distance = Math.abs(stop.height - boundedHeight);

    if (distance < nearestDistance) {
      nearest = stop;
      nearestDistance = distance;
      continue;
    }

    if (
      distance === nearestDistance &&
      preferredDirection !== 0 &&
      Math.sign(stop.height - nearest.height) === Math.sign(preferredDirection)
    ) {
      nearest = stop;
    }
  }

  return nearest;
}

function getCommittedEnabledIndex(): number {
  const stop = committedStop.value;
  if (!stop) {
    return -1;
  }

  return enabledStops.value.findIndex(
    (candidate) => candidate.originalIndex === stop.originalIndex,
  );
}

function toPublicStop(stop: NormalizedStop | null): PuFloatPanelStop | null {
  if (!stop) {
    return null;
  }

  const { originalIndex: _originalIndex, ...publicStop } = stop;
  return publicStop;
}

function clearSnapTimer(): void {
  if (snapTimer === null) {
    return;
  }

  window.clearTimeout(snapTimer);
  snapTimer = null;
}

function clampNumber(value: number, min: number, max: number): number {
  if (max < min) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

function isPrimaryPointer(event: PointerEvent): boolean {
  return event.pointerType !== "mouse" || event.button === 0;
}
</script>

<style lang="scss" scoped src="./puFloatPanel.scss"></style>

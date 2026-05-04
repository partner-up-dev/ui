<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuImgCropper",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import {
  puImgCropperProps,
  puImgCropperEmits,
  clamp,
  getDistance,
  getAngle,
  DEFAULT_CROPPER_SIZE,
  type PuImgCropperConfirmResult,
} from "./puImgCropper";

type Point = { x: number; y: number };

const props = defineProps(puImgCropperProps);
const emit = defineEmits(puImgCropperEmits);

const rootRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const container = reactive({
  width: 0,
  height: 0,
});

const transformState = reactive({
  scale: props.scale,
  rotate: props.rotate,
  translateX: 0,
  translateY: 0,
});

const imageInfo = reactive({
  naturalWidth: 0,
  naturalHeight: 0,
});

const imageLoaded = ref(false);

let touchStartPoints: Point[] = [];
let gestureStart = {
  translateX: 0,
  translateY: 0,
  scale: 1,
  rotate: 0,
};

const rootStyle = computed(() => {
  const w = props.width || DEFAULT_CROPPER_SIZE;
  const h = props.height || DEFAULT_CROPPER_SIZE;
  return {
    width: `${w}px`,
    height: `${h}px`,
  };
});

const cropperMaskStyle = computed(() => ({
  width: `${props.width || DEFAULT_CROPPER_SIZE}px`,
  height: `${props.height || DEFAULT_CROPPER_SIZE}px`,
}));

const imageStyle = computed(() => {
  const { scale, rotate, translateX, translateY } = transformState;
  return {
    transform: `translate(${translateX}px, ${translateY}px) translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
  };
});

function emitChange() {
  emit("change", {
    scale: transformState.scale,
    rotate: transformState.rotate,
    translateX: transformState.translateX,
    translateY: transformState.translateY,
  });
  emit("update:scale", transformState.scale);
  emit("update:rotate", transformState.rotate);
}

function handleImageLoad(event: Event) {
  const target = event.currentTarget as HTMLImageElement;
  imageInfo.naturalWidth = target.naturalWidth;
  imageInfo.naturalHeight = target.naturalHeight;
  imageLoaded.value = true;
  emit("ready");
}

function getTouchPoints(event: TouchEvent): Point[] {
  return Array.from(event.touches).slice(0, 2).map((touch) => ({
    x: touch.clientX,
    y: touch.clientY,
  }));
}

function beginGesture(points: Point[]) {
  touchStartPoints = points;
  gestureStart = {
    translateX: transformState.translateX,
    translateY: transformState.translateY,
    scale: transformState.scale,
    rotate: transformState.rotate,
  };
}

function updateGesture(points: Point[]) {
  if (props.disabled || points.length === 0 || touchStartPoints.length === 0) return;

  if (points.length === 1 && touchStartPoints.length === 1) {
    const dx = points[0].x - touchStartPoints[0].x;
    const dy = points[0].y - touchStartPoints[0].y;
    transformState.translateX = gestureStart.translateX + dx;
    transformState.translateY = gestureStart.translateY + dy;
  }

  if (points.length >= 2 && touchStartPoints.length >= 2) {
    const currentDistance = getDistance(points[0], points[1]);
    const startDistance = getDistance(touchStartPoints[0], touchStartPoints[1]);
    const scaleDelta = startDistance === 0 ? 1 : currentDistance / startDistance;

    transformState.scale = clamp(
      gestureStart.scale * scaleDelta,
      props.minScale,
      props.maxScale
    );

    if (props.enableRotate) {
      const currentAngle = getAngle(points[0], points[1]);
      const startAngle = getAngle(touchStartPoints[0], touchStartPoints[1]);
      transformState.rotate = gestureStart.rotate + currentAngle - startAngle;
    }
  }

  emitChange();
}

function handlePointerDown(event: PointerEvent) {
  if (props.disabled || event.pointerType === "touch") return;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  beginGesture([{ x: event.clientX, y: event.clientY }]);
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType === "touch" || touchStartPoints.length === 0) return;
  updateGesture([{ x: event.clientX, y: event.clientY }]);
}

function handlePointerUp(event: PointerEvent) {
  if (event.pointerType !== "touch") {
    touchStartPoints = [];
  }
}

function handleTouchStart(event: TouchEvent) {
  if (props.disabled) return;
  beginGesture(getTouchPoints(event));
}

function handleTouchMove(event: TouchEvent) {
  if (props.disabled) return;
  updateGesture(getTouchPoints(event));
}

function handleTouchEnd() {
  touchStartPoints = [];
}

async function getCroppedImage(): Promise<PuImgCropperConfirmResult | null> {
  if (!imageLoaded.value || !canvasRef.value || imageInfo.naturalWidth === 0) {
    console.warn("[PuImgCropper] Image not loaded yet");
    return null;
  }

  const outputWidth = props.outputWidth || props.width || DEFAULT_CROPPER_SIZE;
  const outputHeight = props.outputHeight || props.height || DEFAULT_CROPPER_SIZE;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const image = rootRef.value?.querySelector("img");

  if (!ctx || !image) {
    return null;
  }

  try {
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.clearRect(0, 0, outputWidth, outputHeight);
    if (props.format === "jpg") {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, outputWidth, outputHeight);
    }

    const coverScale = Math.max(
      outputWidth / imageInfo.naturalWidth,
      outputHeight / imageInfo.naturalHeight
    );
    const ratioX = outputWidth / (container.width || outputWidth);
    const ratioY = outputHeight / (container.height || outputHeight);

    ctx.save();
    ctx.translate(
      outputWidth / 2 + transformState.translateX * ratioX,
      outputHeight / 2 + transformState.translateY * ratioY
    );
    ctx.rotate((transformState.rotate * Math.PI) / 180);
    ctx.scale(coverScale * transformState.scale, coverScale * transformState.scale);
    ctx.drawImage(
      image,
      -imageInfo.naturalWidth / 2,
      -imageInfo.naturalHeight / 2,
      imageInfo.naturalWidth,
      imageInfo.naturalHeight
    );
    ctx.restore();

    const mimeType = props.format === "png" ? "image/png" : "image/jpeg";
    const tempFilePath = canvas.toDataURL(
      mimeType,
      props.format === "jpg" ? props.quality : undefined
    );

    const result: PuImgCropperConfirmResult = {
      tempFilePath,
      width: outputWidth,
      height: outputHeight,
    };

    emit("confirm", result);
    return result;
  } catch (error) {
    console.error("[PuImgCropper] Crop failed:", error);
    emit("error", error);
    return null;
  }
}

function reset() {
  transformState.scale = props.scale;
  transformState.rotate = props.rotate;
  transformState.translateX = 0;
  transformState.translateY = 0;
  emitChange();
}

onMounted(async () => {
  await nextTick();
  const rect = rootRef.value?.getBoundingClientRect();
  container.width = rect?.width || props.width || DEFAULT_CROPPER_SIZE;
  container.height = rect?.height || props.height || DEFAULT_CROPPER_SIZE;
});

watch(
  () => props.scale,
  (newScale) => {
    transformState.scale = newScale;
  }
);

watch(
  () => props.rotate,
  (newRotate) => {
    transformState.rotate = newRotate;
  }
);

defineExpose({
  getCroppedImage,
  reset,
});
</script>

<template>
  <div
    ref="rootRef"
    class="pu-img-cropper"
    :class="[
      props.customClass,
      {
        'pu-img-cropper--round': props.shape === 'round',
        'pu-img-cropper--disabled': props.disabled,
      },
    ]"
    :style="[rootStyle, props.customStyle]"
  >
    <div
      class="pu-img-cropper__stage"
      @pointerdown.prevent="handlePointerDown"
      @pointermove.prevent="handlePointerMove"
      @pointerup.prevent="handlePointerUp"
      @pointercancel.prevent="handlePointerUp"
      @touchstart.prevent="handleTouchStart"
      @touchmove.prevent="handleTouchMove"
      @touchend.prevent="handleTouchEnd"
      @touchcancel.prevent="handleTouchEnd"
    >
      <img
        class="pu-img-cropper__image"
        :src="props.src"
        alt=""
        :style="imageStyle"
        draggable="false"
        @load="handleImageLoad"
      />

      <canvas ref="canvasRef" class="pu-img-cropper__canvas" />

      <div
        v-if="props.shape === 'round'"
        class="pu-img-cropper__mask pu-img-cropper__mask--round"
        :style="cropperMaskStyle"
      />
      <div
        v-else
        class="pu-img-cropper__mask pu-img-cropper__mask--square"
        :style="cropperMaskStyle"
      />

      <div
        v-if="props.showGrid"
        class="pu-img-cropper__grid"
        :style="cropperMaskStyle"
      >
        <div class="pu-img-cropper__grid-line pu-img-cropper__grid-line--v1" />
        <div class="pu-img-cropper__grid-line pu-img-cropper__grid-line--v2" />
        <div class="pu-img-cropper__grid-line pu-img-cropper__grid-line--h1" />
        <div class="pu-img-cropper__grid-line pu-img-cropper__grid-line--h2" />
      </div>
    </div>

    <slot />
  </div>
</template>

<style lang="scss" scoped src="./puImgCropper.scss"></style>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuImg",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type CSSProperties } from "vue";
import { puImgEmits, puImgProps } from "./puImg";

const props = defineProps(puImgProps);
const emit = defineEmits(puImgEmits);

const isLoading = ref(Boolean(props.src));
const isError = ref(false);

const hasSrc = computed(() => Boolean(props.src));
const shouldRenderImage = computed(() => hasSrc.value && !isError.value);
const showLoadingState = computed(
  () => props.showLoading && isLoading.value && hasSrc.value,
);
const showFallback = computed(() => !hasSrc.value || isError.value);

const rootStyle = computed(() => {
  const style: Record<string, string> = {};

  if (!props.size) {
    if (props.width) {
      style.width =
        typeof props.width === "number" ? `${props.width}px` : props.width;
    }

    if (props.height) {
      style.height =
        typeof props.height === "number" ? `${props.height}px` : props.height;
    }
  }

  return style;
});

const rootClasses = computed(() => [
  `pu-img--shape-${props.shape}`,
  {
    [`pu-img--${props.size}`]: Boolean(props.size),
    "is-bordered": props.bordered,
    "is-loading": showLoadingState.value,
    "is-error": isError.value,
    "has-fallback": showFallback.value,
  },
]);

const objectFit = computed(() => {
  switch (props.mode) {
    case "aspectFit":
      return "contain";
    case "scaleToFill":
      return "fill";
    case "center":
    case "top":
    case "bottom":
    case "left":
    case "right":
      return "none";
    case "aspectFill":
    default:
      return "cover";
  }
});

const objectPosition = computed(() => {
  switch (props.mode) {
    case "top":
      return "top center";
    case "bottom":
      return "bottom center";
    case "left":
      return "center left";
    case "right":
      return "center right";
    default:
      return "center";
  }
});

const imageStyle = computed<CSSProperties>(() => ({
  objectFit: objectFit.value,
  objectPosition: objectPosition.value,
}));

const fallbackInitial = computed(() => {
  const explicitInitial = props.fallbackInitial?.trim();
  if (explicitInitial) {
    return Array.from(explicitInitial)[0]?.toUpperCase() ?? "";
  }

  const normalizedName = props.name?.trim();
  if (normalizedName) {
    return Array.from(normalizedName)[0]?.toUpperCase() ?? "";
  }

  return "";
});

const fallbackLabel = computed(() => {
  const alt = props.alt.trim();
  if (alt) {
    return alt;
  }

  return props.name?.trim() || undefined;
});

function resetState(src = props.src): void {
  isLoading.value = Boolean(src);
  isError.value = false;
}

watch(
  () => props.src,
  (src) => {
    resetState(src);
  },
);

function onLoad(event: Event): void {
  isLoading.value = false;
  isError.value = false;
  emit("load", event);
}

function onError(event: Event): void {
  isLoading.value = false;
  isError.value = true;
  emit("error", event);
}

onMounted(() => {
  if (!hasSrc.value) {
    isLoading.value = false;
    isError.value = false;
  }
});
</script>

<template>
  <div
    class="pu-img"
    :class="rootClasses"
    :style="rootStyle"
  >
    <img
      v-if="shouldRenderImage"
      class="pu-img__image"
      :class="{ 'is-hidden': showLoadingState }"
      :src="props.src"
      :alt="props.alt"
      :loading="props.lazyLoad ? 'lazy' : 'eager'"
      :style="imageStyle"
      @load="onLoad"
      @error="onError"
    />

    <div
      v-if="showLoadingState"
      class="pu-img__placeholder is-loading"
    >
      <slot name="loading">
        <span class="pu-img__spinner" aria-hidden="true" />
      </slot>
    </div>

    <div
      v-else-if="showFallback"
      class="pu-img__placeholder is-fallback"
      :role="fallbackLabel ? 'img' : undefined"
      :aria-label="fallbackLabel"
    >
      <slot
        name="fallback"
        :initial="fallbackInitial"
        :name="props.name"
      >
        <span v-if="fallbackInitial" class="pu-img__fallback-initial">
          {{ fallbackInitial }}
        </span>
        <span v-else class="pu-img__fallback-icon" aria-hidden="true" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./puImg.scss"></style>

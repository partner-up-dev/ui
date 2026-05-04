<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuImg",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type CSSProperties } from "vue";
import { puImgProps, puImgEmits } from "./puImg";
import { kebabCase } from '../../utils/string'


const props = defineProps(puImgProps);
const emit = defineEmits(puImgEmits);

const isLoading = ref(true);
const isError = ref(false);

const hasSrc = computed(() => Boolean(props.src));

function resetState(src = props.src) {
  isLoading.value = Boolean(src);
  isError.value = false;
  if (!src) {
    isError.value = true;
  }
}

watch(
  () => props.src,
  (src) => {
    resetState(src);
  }
);

function onLoad(e: any) {
  isLoading.value = false;
  isError.value = false;
  emit("load", e);
}

function onError(e: any) {
  isLoading.value = false;
  isError.value = true;
  emit("error", e);
}

const rootStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.size) {
    return style;
  } else {
    if (props.width)
      style.width =
        typeof props.width === "number" ? `${props.width}px` : props.width;
    if (props.height)
      style.height =
        typeof props.height === "number" ? `${props.height}px` : props.height;
  }
  return style;
});

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

onMounted(() => {
  if (!hasSrc.value) {
    isLoading.value = false;
    isError.value = true;
  }
});
</script>

<template>
  <div class="pu-img" :class="[props.customClass, props.size ? `pu-img--${props.size}` : '']" :style="rootStyle">
    <img
      class="pu-img__image"
      :class="[
        props.customImage,
        `pu-img__image--r-${kebabCase(props.radius)}`,
        {
          'is-hidden':
            (props.showError && isError) || (props.showLoading && isLoading),
        },
      ]"
      :src="props.src"
      alt=""
      :loading="props.lazyLoad ? 'lazy' : 'eager'"
      :style="imageStyle"
      @load="onLoad"
      @error="onError"
    />

    <div v-if="props.showLoading && isLoading && hasSrc" class="pu-img__placeholder is-loading">
      <slot name="loading">
        <span class="pu-img__spinner" />
      </slot>
    </div>

    <div v-if="props.showError && isError" class="pu-img__placeholder is-error">
      <slot name="error">
        <span class="pu-img__error-icon" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./puImg.scss"></style>

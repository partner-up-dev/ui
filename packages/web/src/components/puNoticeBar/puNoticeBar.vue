<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuNoticeBar",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref, onUnmounted } from "vue";
import { puNoticeBarProps, puNoticeBarEmits } from "./puNoticeBar";

const props = defineProps(puNoticeBarProps);
const emit = defineEmits(puNoticeBarEmits);

const visible = ref(true);
const currentIndex = ref(0);

const textList = computed((): string[] => {
  if (Array.isArray(props.text)) {
    return props.text;
  }
  return [props.text];
});

const currentText = computed((): string => {
  if (props.direction === "vertical" && textList.value.length > 0) {
    return textList.value[currentIndex.value % textList.value.length];
  }
  return textList.value.join(" ");
});

const onClose = () => {
  visible.value = false;
  emit("close");
};

const onClick = () => {
  emit("click");
};

// Vertical text rotation
let timer: ReturnType<typeof setInterval> | undefined;
if (props.direction === "vertical" && textList.value.length > 1) {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % textList.value.length;
  }, 3000);
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <div
    v-if="visible"
    class="pu-notice-bar"
    :class="{ 'pu-notice-bar--wrapable': props.wrapable }"
    :style="{
      backgroundColor: props.backgroundColor,
      color: props.color,
    }"
    @click="onClick"
  >
    <span v-if="props.prefix" class="pu-notice-bar__prefix" aria-hidden="true">
      <span :class="`i-mdi-${props.prefix}`" class="pu-notice-bar__icon"></span>
    </span>

    <div class="pu-notice-bar__content">
      <div
        class="pu-notice-bar__text"
        :class="{
          'pu-notice-bar__text--scrollable': props.scrollable && props.direction === 'horizontal',
          'pu-notice-bar__text--vertical': props.direction === 'vertical',
        }"
      >
        <span>{{ currentText }}</span>
      </div>
    </div>

    <button v-if="props.closeable" type="button" class="pu-notice-bar__close" @click.stop="onClose">
      <span class="i-mdi-close pu-notice-bar__icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<style scoped lang="scss" src="./puNoticeBar.scss"></style>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuAnnouncementBar",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref, onUnmounted } from "vue";
import { puAnnouncementBarProps, puAnnouncementBarEmits } from "./puAnnouncementBar";

const props = defineProps(puAnnouncementBarProps);
const emit = defineEmits(puAnnouncementBarEmits);

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
    class="pu-announcement-bar"
    :class="{ 'pu-announcement-bar--wrapable': props.wrapable }"
    :style="{
      backgroundColor: props.backgroundColor,
      color: props.color,
    }"
    @click="onClick"
  >
    <span v-if="props.prefix" class="pu-announcement-bar__prefix" aria-hidden="true">
      <span :class="`i-mdi-${props.prefix}`" class="pu-announcement-bar__icon"></span>
    </span>

    <div class="pu-announcement-bar__content">
      <div
        class="pu-announcement-bar__text"
        :class="{
          'pu-announcement-bar__text--scrollable': props.scrollable && props.direction === 'horizontal',
          'pu-announcement-bar__text--vertical': props.direction === 'vertical',
        }"
      >
        <span>{{ currentText }}</span>
      </div>
    </div>

    <button v-if="props.closeable" type="button" class="pu-announcement-bar__close" @click.stop="onClose">
      <span class="i-mdi-close pu-announcement-bar__icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<style scoped lang="scss" src="./puAnnouncementBar.scss"></style>

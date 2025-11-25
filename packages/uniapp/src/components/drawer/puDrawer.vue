<template>
  <view
    v-show="visible"
    class="pu-drawer-scrim"
    @click="handleClose"
    @touchmove="noop"
  ></view>
  <view
    class="pu-drawer"
    :style="{ bottom: computedBottom, height: props.height }"
  >
    <slot name="full" />
    <view class="default" v-if="!fullCustom">
      <view class="drawer-header">
        <text class="drawer-title">{{ props.title }}</text>
        <view role="button" class="drawer-close" @click="handleClose">
          <text class="i-mdi-close"></text>
        </view>
      </view>
      <view class="drawer-content">
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { BasicComponentOptions } from "@/utils/vue";
export default {
  name: "PuDrawer",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { puDrawerProps, puDrawerEmits } from "./puDrawer";

const props = defineProps(puDrawerProps);
const emit = defineEmits(puDrawerEmits);

const visible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  visible.value = newVal;
});

const computedBottom = computed(() => (visible.value ? "0" : `-${props.height}`));

function handleClose() {
  visible.value = false;
  emit("update:visible", false);
}

// 阻止触摸移动事件传播
function noop() {}
</script>

<style lang="scss" scoped src="./puDrawer.scss"></style>

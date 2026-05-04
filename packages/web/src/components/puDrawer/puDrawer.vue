<template>
  <div
    v-show="visible"
    class="pu-drawer-scrim"
    @click="handleClose"
  ></div>
  <div
    class="pu-drawer"
    :style="{ bottom: computedBottom, height: props.height }"
  >
    <slot name="full" />
    <div class="default" v-if="!props.fullCustom">
      <div class="drawer-header">
        <span class="drawer-title">{{ props.title }}</span>
        <button type="button" class="drawer-close" @click="handleClose">
          <span class="i-mdi-close" aria-hidden="true"></span>
        </button>
      </div>
      <div class="drawer-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuDrawer",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch, watchEffect } from "vue";
import { puDrawerProps, puDrawerEmits } from "./puDrawer";

const props = defineProps(puDrawerProps);
const emit = defineEmits(puDrawerEmits);

const visible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  visible.value = newVal;
});

const computedBottom = computed(() => (visible.value ? "0" : `-${props.height}`));

const previousBodyOverflow = ref<string>();

watchEffect((onCleanup) => {
  if (!props.lockScroll || !visible.value || typeof document === "undefined") return;

  previousBodyOverflow.value = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  onCleanup(() => {
    document.body.style.overflow = previousBodyOverflow.value ?? "";
    previousBodyOverflow.value = undefined;
  });
});

function handleClose() {
  visible.value = false;
  emit("update:visible", false);
}

onBeforeUnmount(() => {
  if (typeof document !== "undefined" && previousBodyOverflow.value !== undefined) {
    document.body.style.overflow = previousBodyOverflow.value;
  }
});
</script>

<style lang="scss" scoped src="./puDrawer.scss"></style>

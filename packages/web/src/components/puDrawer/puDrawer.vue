<template>
  <div
    v-show="visible"
    class="pu-drawer-scrim"
    @click="handleClose"
  ></div>
  <div
    :id="drawerId"
    ref="drawerRef"
    class="pu-drawer"
    :style="{ bottom: computedBottom, height: props.height }"
    :role="visible ? 'dialog' : undefined"
    :aria-modal="visible ? 'true' : undefined"
    :aria-labelledby="drawerLabelledBy"
    :aria-label="drawerAriaLabel"
    :aria-hidden="visible ? undefined : 'true'"
    :inert="visible ? undefined : true"
    tabindex="-1"
  >
    <slot name="full" />
    <div class="default" v-if="!props.fullCustom">
      <div class="drawer-header">
        <span :id="titleId" class="drawer-title">{{ props.title }}</span>
        <button
          type="button"
          class="drawer-close"
          :aria-label="props.closeLabel"
          @click="handleClose"
        >
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
import { computed, ref, watch } from "vue";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusReturn,
  useFocusTrap,
  usePuId,
} from "../../composables";
import { puDrawerProps, puDrawerEmits } from "./puDrawer";

const props = defineProps(puDrawerProps);
const emit = defineEmits(puDrawerEmits);

const visible = ref(props.visible);
const drawerRef = ref<HTMLElement | null>(null);
const baseId = usePuId("pu-drawer", () => props.id);
const drawerId = computed(() => baseId.value);
const titleId = computed(() => `${baseId.value}-title`);

watch(() => props.visible, (newVal) => {
  visible.value = newVal;
});

const computedBottom = computed(() => (visible.value ? "0" : `-${props.height}`));

const drawerLabelledBy = computed(() =>
  props.title && !props.fullCustom ? titleId.value : undefined,
);

const drawerAriaLabel = computed(() =>
  drawerLabelledBy.value ? undefined : props.ariaLabel,
);

useBodyScrollLock(() => visible.value && props.lockScroll, {
  reserveScrollbarGap: true,
});
useEscapeKey(() => visible.value && props.closeOnEscape, handleClose, {
  preventDefault: true,
  stopPropagation: true,
});
useFocusReturn(() => visible.value);
useFocusTrap(drawerRef, () => visible.value, { initialFocus: "container" });

function handleClose() {
  if (!visible.value) {
    return;
  }

  visible.value = false;
  emit("update:visible", false);
  emit("close");
}
</script>

<style lang="scss" scoped src="./puDrawer.scss"></style>

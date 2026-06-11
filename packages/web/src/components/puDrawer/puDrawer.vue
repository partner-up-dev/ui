<template>
  <Teleport :to="props.teleportTo">
    <div
      v-show="visible"
      class="pu-drawer-scrim"
      :style="{ zIndex: scrimZIndex }"
      @click="handleOverlayClick"
    ></div>
    <div
      :id="drawerId"
      ref="drawerRef"
      class="pu-drawer"
      :style="drawerStyle"
      :role="visible ? 'dialog' : undefined"
      :aria-modal="visible ? 'true' : undefined"
      :aria-labelledby="drawerLabelledBy"
      :aria-label="drawerAriaLabel"
      :aria-hidden="visible ? undefined : 'true'"
      :inert="visible ? undefined : true"
      tabindex="-1"
    >
      <slot v-if="props.fullCustom" name="full" />
      <div v-else class="pu-drawer__shell">
        <slot name="header" :close="handleCloseButton">
          <div v-if="hasHeader" class="drawer-header">
            <slot name="title">
              <span v-if="props.title" :id="titleId" class="drawer-title">
                {{ props.title }}
              </span>
            </slot>
            <slot name="close" :close="handleCloseButton">
              <button
                v-if="props.showClose"
                type="button"
                class="drawer-close"
                :aria-label="props.closeLabel"
                @click="handleCloseButton"
              >
                <span class="i-mdi-close" aria-hidden="true"></span>
              </button>
            </slot>
          </div>
        </slot>
        <div
          class="drawer-content"
          :class="{ 'drawer-content--unpadded': !props.contentPadding }"
        >
          <slot />
        </div>
        <div v-if="$slots.footer" class="drawer-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";
export default {
  name: "PuDrawer",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed, ref, useSlots, watch } from "vue";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusReturn,
  useFocusTrap,
  usePuId,
} from "../../composables";
import { puDrawerProps, puDrawerEmits, type PuDrawerCloseReason } from "./puDrawer";

const props = defineProps(puDrawerProps);
const emit = defineEmits(puDrawerEmits);
const slots = useSlots();

const visible = ref(props.visible);
const drawerRef = ref<HTMLElement | null>(null);
const baseId = usePuId("pu-drawer", () => props.id);
const drawerId = computed(() => baseId.value);
const titleId = computed(() => `${baseId.value}-title`);

watch(() => props.visible, (newVal) => {
  visible.value = newVal;
});

const scrimZIndex = computed(() => Number(props.zIndex));

const drawerStyle = computed<CSSProperties>(() => ({
  bottom: "0",
  height: props.height,
  maxWidth: props.maxWidth,
  transform: visible.value
    ? "translate3d(-50%, 0, 0)"
    : "translate3d(-50%, 100%, 0)",
  zIndex: scrimZIndex.value + 1,
}));

const hasHeader = computed(() =>
  Boolean(props.title || props.showClose || slots.title || slots.close),
);

const drawerLabelledBy = computed(() =>
  props.title && !props.fullCustom && !slots.header && !slots.title
    ? titleId.value
    : undefined,
);

const drawerAriaLabel = computed(() =>
  drawerLabelledBy.value ? undefined : props.ariaLabel,
);

useBodyScrollLock(() => visible.value && props.lockScroll, {
  reserveScrollbarGap: true,
});
useEscapeKey(() => visible.value && props.closeOnEscape, () => requestClose("escape"), {
  preventDefault: true,
  stopPropagation: true,
});
useFocusReturn(() => visible.value);
useFocusTrap(drawerRef, () => visible.value, { initialFocus: "container" });

function requestClose(reason: PuDrawerCloseReason) {
  if (!visible.value) {
    return;
  }

  visible.value = false;
  emit("update:visible", false);
  emit("close", { reason });
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    requestClose("overlay");
  }
}

function handleCloseButton() {
  requestClose("close-button");
}
</script>

<style lang="scss" scoped src="./puDrawer.scss"></style>

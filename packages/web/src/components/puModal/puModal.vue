<template>
  <Teleport to="body">
    <div
      v-if="props.open"
      class="pu-modal-overlay"
      @click.self="handleOverlayClick"
    >
      <div class="pu-modal" :style="{ maxWidth: props.maxWidth }">
        <slot name="header">
          <h3 v-if="props.title" class="pu-modal__title">{{ props.title }}</h3>
        </slot>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuModal",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue";
import { puModalEmits, puModalProps } from "./puModal";

const props = defineProps(puModalProps);
const emit = defineEmits(puModalEmits);

let previousBodyOverflow: string | null = null;

watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === "undefined") {
      return;
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      lockBodyScroll();
      return;
    }

    document.removeEventListener("keydown", handleEscape);
    unlockBodyScroll();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (typeof document !== "undefined") {
    document.removeEventListener("keydown", handleEscape);
  }
  unlockBodyScroll();
});

function handleOverlayClick(): void {
  if (props.closeOnOverlay) {
    emit("close");
  }
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === "Escape" && props.open && props.closeOnEscape) {
    emit("close");
  }
}

function lockBodyScroll(): void {
  if (!props.lockScroll || typeof document === "undefined" || previousBodyOverflow !== null) {
    return;
  }

  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
}

function unlockBodyScroll(): void {
  if (typeof document === "undefined" || previousBodyOverflow === null) {
    return;
  }

  document.body.style.overflow = previousBodyOverflow;
  previousBodyOverflow = null;
}
</script>

<style lang="scss" scoped src="./puModal.scss"></style>


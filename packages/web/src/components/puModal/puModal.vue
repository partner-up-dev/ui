<template>
  <Teleport to="body">
    <div
      v-if="props.open"
      class="pu-modal-overlay"
      @click.self="handleOverlayClick"
    >
      <div
        :id="dialogId"
        ref="dialogRef"
        class="pu-modal"
        :style="{ maxWidth: props.maxWidth }"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="dialogLabelledBy"
        :aria-label="dialogAriaLabel"
        tabindex="-1"
      >
        <slot name="header">
          <h3 v-if="props.title" :id="titleId" class="pu-modal__title">
            {{ props.title }}
          </h3>
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
import { computed, ref, useSlots } from "vue";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusReturn,
  useFocusTrap,
  usePuId,
} from "../../composables";
import { puModalEmits, puModalProps } from "./puModal";

const props = defineProps(puModalProps);
const emit = defineEmits(puModalEmits);
const slots = useSlots();

const dialogRef = ref<HTMLElement | null>(null);
const baseId = usePuId("pu-modal", () => props.id);
const dialogId = computed(() => baseId.value);
const titleId = computed(() => `${baseId.value}-title`);

const dialogLabelledBy = computed(() =>
  props.title && !slots.header ? titleId.value : undefined,
);

const dialogAriaLabel = computed(() =>
  dialogLabelledBy.value ? undefined : props.ariaLabel,
);

useBodyScrollLock(() => props.open && props.lockScroll, {
  reserveScrollbarGap: true,
});
useEscapeKey(() => props.open && props.closeOnEscape, () => emit("close"), {
  preventDefault: true,
  stopPropagation: true,
});
useFocusReturn(() => props.open);
useFocusTrap(dialogRef, () => props.open, { initialFocus: "container" });

function handleOverlayClick(): void {
  if (props.closeOnOverlay) {
    emit("close");
  }
}
</script>

<style lang="scss" scoped src="./puModal.scss"></style>

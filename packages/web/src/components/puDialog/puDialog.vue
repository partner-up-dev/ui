<template>
  <Teleport to="body">
    <div
      v-if="props.open"
      class="pu-dialog-overlay"
      @click.self="handleOverlayClick"
    >
      <div
        :id="dialogId"
        ref="dialogRef"
        :class="dialogClasses"
        :style="{ maxWidth: props.maxWidth }"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="dialogLabelledBy"
        :aria-describedby="dialogDescribedBy"
        :aria-label="dialogAriaLabel"
        tabindex="-1"
      >
        <slot name="header">
          <PuHeader
            v-if="hasDefaultHeader"
            as="header"
            class="pu-dialog__header"
            :title="props.title"
            :subtitle="props.description"
            title-as="h2"
            :title-id="titleId"
            :subtitle-id="descriptionId"
          >
            <template v-if="$slots.icon" #leading>
              <div class="pu-dialog__icon" aria-hidden="true">
                <slot name="icon" />
              </div>
            </template>

            <template v-if="$slots.title" #title>
              <slot name="title" />
            </template>

            <template v-if="$slots.description" #subtitle>
              <slot name="description" />
            </template>

            <template v-if="props.showClose" #actions>
              <button
                type="button"
                class="pu-dialog__close"
                :aria-label="props.closeLabel"
                @click="requestClose('close')"
              >
                <span class="i-mdi-close" aria-hidden="true"></span>
              </button>
            </template>
          </PuHeader>
        </slot>

        <div
          v-if="$slots.default"
          class="pu-dialog__body"
        >
          <slot />
        </div>

        <slot name="footer">
          <footer
            v-if="hasDefaultFooter"
            class="pu-dialog__footer"
          >
            <slot name="actions">
              <PuButton
                v-if="props.showCancel"
                tone="neutral"
                variant="soft"
                :disabled="props.cancelDisabled"
                @click="requestClose('cancel')"
              >
                {{ props.cancelText }}
              </PuButton>
              <PuButton
                v-if="props.showConfirm"
                :disabled="props.confirmDisabled"
                :loading="props.confirmLoading"
                @click="handleConfirm"
              >
                {{ props.confirmText }}
              </PuButton>
            </slot>
          </footer>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuDialog",
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
import PuButton from "../puButton/puButton.vue";
import PuHeader from "../puHeader/puHeader.vue";
import {
  puDialogEmits,
  puDialogProps,
  type PuDialogCloseReason,
} from "./puDialog";

const props = defineProps(puDialogProps);
const emit = defineEmits(puDialogEmits);
const slots = useSlots();

const dialogRef = ref<HTMLElement | null>(null);
const baseId = usePuId("pu-dialog", () => props.id);
const dialogId = computed(() => baseId.value);
const titleId = computed(() => `${baseId.value}-title`);
const descriptionId = computed(() => `${baseId.value}-description`);

const hasCustomHeader = computed(() => Boolean(slots.header));
const hasTitle = computed(() => Boolean(props.title || slots.title));
const hasDescription = computed(() =>
  Boolean(props.description || slots.description),
);
const hasDefaultHeader = computed(() =>
  Boolean(
    slots.icon ||
      hasTitle.value ||
      hasDescription.value ||
      props.showClose,
  ),
);
const hasDefaultFooter = computed(() =>
  Boolean(slots.actions || props.showCancel || props.showConfirm),
);

const dialogClasses = computed(() => [
  "pu-dialog",
  `pu-dialog--tone-${props.tone}`,
]);

const dialogLabelledBy = computed(() =>
  !hasCustomHeader.value && hasTitle.value ? titleId.value : undefined,
);

const dialogDescribedBy = computed(() =>
  !hasCustomHeader.value && hasDescription.value
    ? descriptionId.value
    : undefined,
);

const dialogAriaLabel = computed(() =>
  dialogLabelledBy.value ? undefined : props.ariaLabel,
);

useBodyScrollLock(() => props.open && props.lockScroll, {
  reserveScrollbarGap: true,
});
useEscapeKey(
  () => props.open && props.closeOnEscape,
  () => requestClose("escape"),
  {
    preventDefault: true,
    stopPropagation: true,
  },
);
useFocusReturn(() => props.open);
useFocusTrap(dialogRef, () => props.open, { initialFocus: "container" });

function handleOverlayClick(): void {
  if (props.closeOnOverlay) {
    requestClose("overlay");
  }
}

function requestClose(reason: PuDialogCloseReason): void {
  if (reason === "cancel") {
    emit("cancel");
  }

  emit("close", reason);
}

function handleConfirm(): void {
  if (props.confirmDisabled || props.confirmLoading) {
    return;
  }

  emit("confirm");
}
</script>

<style lang="scss" scoped src="./puDialog.scss"></style>

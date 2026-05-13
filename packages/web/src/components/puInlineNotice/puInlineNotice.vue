<template>
  <component
    :is="props.as"
    v-if="visible"
    class="pu-inline-notice"
    :class="rootClasses"
    :role="noticeRole"
  >
    <span v-if="hasIcon" class="pu-inline-notice__icon" aria-hidden="true">
      <slot name="icon">
        <span :class="resolvedIcon" />
      </slot>
    </span>

    <div class="pu-inline-notice__content">
      <div v-if="hasTitle" class="pu-inline-notice__title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>

      <div v-if="hasMessage" class="pu-inline-notice__message">
        <slot>
          {{ props.message }}
        </slot>
      </div>
    </div>

    <div v-if="$slots.actions" class="pu-inline-notice__actions">
      <slot name="actions" />
    </div>

    <button
      v-if="props.dismissible"
      class="pu-inline-notice__close"
      type="button"
      :aria-label="props.closeLabel"
      @click="onClose"
    >
      <slot name="close-icon">
        <span class="i-mdi-close" aria-hidden="true" />
      </slot>
    </button>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuInlineNotice",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import { puStatusTones, type PuStatusTone } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puInlineNoticeEmits,
  puInlineNoticeProps,
  type PuInlineNoticeTone,
} from "./puInlineNotice";

const props = defineProps(puInlineNoticeProps);
const emit = defineEmits(puInlineNoticeEmits);
const slots = useSlots();
const visible = ref(true);

const defaultIcons: Record<PuInlineNoticeTone, string> = {
  info: "i-mdi-information-outline",
  success: "i-mdi-check-circle-outline",
  warning: "i-mdi-alert-outline",
  error: "i-mdi-alert-circle-outline",
};

const tone = computed<PuStatusTone>(() =>
  normalizePuVariant(puStatusTones, props.tone, "info"),
);
const noticeRole = computed(() =>
  tone.value === "warning" || tone.value === "error" ? "alert" : "status",
);
const resolvedIcon = computed(() => props.icon ?? defaultIcons[tone.value]);
const hasIcon = computed(() => props.showIcon && (Boolean(slots.icon) || Boolean(resolvedIcon.value)));
const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasMessage = computed(() => Boolean(slots.default) || Boolean(props.message));

const rootClasses = computed(() => [
  createPuModifierClass("pu-inline-notice", "tone", tone.value),
  createPuStateClass("dismissible", props.dismissible),
  createPuStateClass("with-actions", Boolean(slots.actions)),
]);

function onClose(event: MouseEvent): void {
  visible.value = false;
  emit("close", event);
}
</script>

<style lang="scss" scoped src="./puInlineNotice.scss"></style>

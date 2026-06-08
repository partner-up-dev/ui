<template>
  <section
    v-if="visible"
    class="pu-snackbar"
    :class="rootClasses"
    :role="liveRole"
    :aria-live="ariaLive"
    @mouseenter="pauseTimer"
    @mouseleave="resumeTimer"
    @focusin="pauseTimer"
    @focusout="resumeTimer"
  >
    <div class="pu-snackbar__message">
      <slot>
        {{ props.message }}
      </slot>
    </div>

    <button
      v-if="hasAction"
      class="pu-snackbar__action"
      type="button"
      @click="handleAction"
    >
      <slot name="action">
        {{ props.actionLabel }}
      </slot>
    </button>

    <button
      v-if="props.dismissible"
      class="pu-snackbar__close"
      type="button"
      :aria-label="props.closeLabel"
      @click="handleDismiss"
    >
      <slot name="close-icon">
        <span class="i-mdi-close" aria-hidden="true" />
      </slot>
    </button>
  </section>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuSnackbar",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useSlots, watch } from "vue";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import {
  puSnackbarEmits,
  puSnackbarProps,
  puSnackbarTones,
  type PuSnackbarCloseReason,
  type PuSnackbarTone,
} from "./puSnackbar";

const props = defineProps(puSnackbarProps);
const emit = defineEmits(puSnackbarEmits);
const slots = useSlots();

const visible = ref(props.open);
const remainingDuration = ref(props.duration);
const timerStartedAt = ref(0);
let timerId: number | undefined;

const tone = computed<PuSnackbarTone>(() =>
  normalizePuVariant(puSnackbarTones, props.tone, "neutral"),
);
const hasAction = computed(() => Boolean(slots.action) || Boolean(props.actionLabel));
const isAssertive = computed(() => tone.value === "warning" || tone.value === "error");
const liveRole = computed(() => (isAssertive.value ? "alert" : "status"));
const ariaLive = computed(() => (isAssertive.value ? "assertive" : "polite"));
const rootClasses = computed(() => [
  createPuModifierClass("pu-snackbar", "tone", tone.value),
  createPuStateClass("with-action", hasAction.value),
  createPuStateClass("dismissible", props.dismissible),
]);

watch(
  () => props.open,
  (nextOpen) => {
    visible.value = nextOpen;
    if (nextOpen) {
      resetTimer();
    } else {
      clearTimer();
    }
  },
);

watch(
  () => props.duration,
  () => {
    remainingDuration.value = props.duration;
    if (visible.value) {
      resetTimer();
    }
  },
);

watch(
  () => visible.value,
  (nextVisible) => {
    if (nextVisible) {
      resetTimer();
    } else {
      clearTimer();
    }
  },
  { immediate: true },
);

onBeforeUnmount(clearTimer);

function clearTimer(): void {
  if (timerId !== undefined) {
    window.clearTimeout(timerId);
    timerId = undefined;
  }
  timerStartedAt.value = 0;
}

function startTimer(duration: number): void {
  clearTimer();

  if (duration <= 0) {
    return;
  }

  remainingDuration.value = duration;
  timerStartedAt.value = Date.now();
  timerId = window.setTimeout(() => {
    close("timeout");
  }, duration);
}

function resetTimer(): void {
  remainingDuration.value = props.duration;
  startTimer(props.duration);
}

function pauseTimer(): void {
  if (!props.pauseOnHover || timerId === undefined) {
    return;
  }

  const elapsed = Date.now() - timerStartedAt.value;
  remainingDuration.value = Math.max(0, remainingDuration.value - elapsed);
  clearTimer();
}

function resumeTimer(): void {
  if (!props.pauseOnHover || !visible.value || remainingDuration.value <= 0) {
    return;
  }

  startTimer(remainingDuration.value);
}

function close(reason: PuSnackbarCloseReason): void {
  if (!visible.value) {
    return;
  }

  visible.value = false;
  emit("update:open", false);
  emit("close", reason);
}

function handleDismiss(): void {
  close("dismiss");
}

function handleAction(event: MouseEvent): void {
  emit("action", event);
  close("action");
}
</script>

<style lang="scss" scoped src="./puSnackbar.scss"></style>

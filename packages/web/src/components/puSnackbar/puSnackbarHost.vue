<template>
  <div
    v-if="visibleItems.length > 0"
    class="pu-snackbar-host"
    :class="hostClasses"
    role="region"
    :aria-label="props.ariaLabel"
  >
    <TransitionGroup
      tag="div"
      class="pu-snackbar-host__stack"
      name="pu-snackbar-host"
    >
      <PuSnackbar
        v-for="item in visibleItems"
        :key="item.id"
        :message="item.message"
        :tone="item.tone ?? 'neutral'"
        :action-label="item.actionLabel"
        :dismissible="item.dismissible ?? Boolean(item.actionLabel)"
        :close-label="item.closeLabel ?? 'Dismiss'"
        :duration="item.duration ?? props.defaultDuration"
        :pause-on-hover="Boolean(props.pauseOnHover)"
        @close="handleClose(item, $event)"
        @action="handleAction(item, $event)"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuSnackbarHost",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { createPuModifierClass, normalizePuVariant } from "../../utils";
import PuSnackbar from "./puSnackbar.vue";
import {
  puSnackbarHostEmits,
  puSnackbarHostPositions,
  puSnackbarHostProps,
  type PuSnackbarClosePayload,
  type PuSnackbarHostPosition,
  type PuSnackbarItem,
} from "./puSnackbarHost";
import type { PuSnackbarCloseReason } from "./puSnackbar";

const props = defineProps(puSnackbarHostProps);
const emit = defineEmits(puSnackbarHostEmits);

const position = computed<PuSnackbarHostPosition>(() =>
  normalizePuVariant(puSnackbarHostPositions, props.position, "bottom"),
);
const visibleItems = computed(() => props.items.slice(0, props.maxVisible));
const hostClasses = computed(() => [
  createPuModifierClass("pu-snackbar-host", "position", position.value),
]);

function removeItem(id: PuSnackbarItem["id"]): PuSnackbarItem[] {
  return props.items.filter((item) => item.id !== id);
}

function handleClose(
  item: PuSnackbarItem,
  reason: PuSnackbarCloseReason,
): void {
  const payload: PuSnackbarClosePayload = { item, reason };
  emit("update:items", removeItem(item.id));
  emit("close", payload);
}

function handleAction(item: PuSnackbarItem, event: MouseEvent): void {
  emit("action", { item, event });
}
</script>

<style lang="scss" scoped src="./puSnackbarHost.scss"></style>

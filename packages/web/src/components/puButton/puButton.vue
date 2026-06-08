<template>
  <component
    :is="rootComponent"
    :class="buttonClasses"
    v-bind="rootAttrs"
    @click="handleClick"
  >
    <span
      v-if="isPending"
      class="pu-button__loading"
      aria-hidden="true"
    >
      <span class="i-mdi-loading pu-button__loading-icon"></span>
    </span>

    <span
      v-if="$slots.leading && !isPending"
      class="pu-button__leading"
      aria-hidden="true"
    >
      <slot name="leading" />
    </span>

    <span
      v-if="$slots.default"
      class="pu-button__content"
    >
      <slot />
    </span>

    <span
      v-if="$slots.trailing && !isPending"
      class="pu-button__trailing"
      aria-hidden="true"
    >
      <slot name="trailing" />
    </span>
  </component>
</template>

<script lang="ts">
export default {
  name: "PuButton",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
  puButtonEmits,
  puButtonProps,
} from "./puButton";
import type { PuAction, PuHrefAction, PuRouteAction } from "../../types";
import { BasicComponentOptions } from "../../utils/vue";

const props = defineProps(puButtonProps);
const emit = defineEmits(puButtonEmits);
const slots = useSlots();

const isPending = computed(() => props.loading || props.feedback === "pending");
const isDisabled = computed(() => props.disabled || isPending.value);
const isIconOnly = computed(() => !slots.default);

const buttonClasses = computed(() => [
  "pu-button",
  `pu-button--shape-${props.shape}`,
  `pu-button--tone-${props.tone}`,
  `pu-button--variant-${props.variant}`,
  `pu-button--size-${props.size}`,
  `pu-button--feedback-${resolvedFeedback.value}`,
  {
    "pu-button--block": props.block,
    "pu-button--icon-only": isIconOnly.value,
    "is-disabled": isDisabled.value,
    "is-loading": isPending.value,
  },
]);

const rootComponent = computed(() => {
  if (isRouteAction(props.action)) {
    return "RouterLink";
  }

  if (isHrefAction(props.action)) {
    return "a";
  }

  return "button";
});

const rootAttrs = computed<Record<string, unknown>>(() => {
  if (isRouteAction(props.action)) {
    return {
      to: props.action.to,
      "aria-disabled": isDisabled.value ? "true" : undefined,
      "aria-busy": isPending.value ? "true" : undefined,
      tabindex: isDisabled.value ? -1 : undefined,
    };
  }

  if (isHrefAction(props.action)) {
    const target = props.action.target ?? (props.action.external ? "_blank" : undefined);
    const rel =
      props.action.rel ??
      (target === "_blank" ? "noopener noreferrer" : undefined);

    return {
      href: props.action.href,
      target,
      rel,
      "aria-disabled": isDisabled.value ? "true" : undefined,
      "aria-busy": isPending.value ? "true" : undefined,
      tabindex: isDisabled.value ? -1 : undefined,
    };
  }

  return {
    type: props.action?.native ?? "button",
    disabled: isDisabled.value || undefined,
    "aria-busy": isPending.value ? "true" : undefined,
  };
});

const resolvedFeedback = computed(() => {
  if (isPending.value) {
    return "pending";
  }

  return props.feedback;
});

function isHrefAction(
  action: PuAction | undefined,
): action is PuHrefAction {
  return Boolean(action && "href" in action);
}

function isRouteAction(
  action: PuAction | undefined,
): action is PuRouteAction {
  return Boolean(action && "to" in action);
}

function handleClick(event: MouseEvent): void {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  emit("click", event);
}
</script>

<style lang="scss" scoped src="./puButton.scss"></style>

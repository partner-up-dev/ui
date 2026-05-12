<template>
  <component
    :is="props.as"
    class="pu-chip"
    :class="rootClasses"
    :type="buttonType"
    :disabled="buttonDisabled"
    :aria-disabled="ariaDisabled"
    :aria-pressed="ariaPressed"
    @click="onClick"
  >
    <span v-if="hasPrefix" class="pu-chip__prefix" aria-hidden="true">
      <slot name="prefix">
        <span v-if="props.prefixIcon" :class="props.prefixIcon" />
      </slot>
    </span>

    <span v-if="hasLabel" class="pu-chip__label">
      <slot>
        {{ props.label }}
      </slot>
    </span>

    <span v-if="hasSuffix" class="pu-chip__suffix" aria-hidden="true">
      <slot name="suffix">
        <span v-if="props.suffixIcon" :class="props.suffixIcon" />
      </slot>
    </span>

    <button
      v-if="props.removable"
      class="pu-chip__remove"
      type="button"
      :aria-label="props.removeLabel"
      :disabled="props.disabled"
      @click.stop="onRemove"
    >
      <slot name="remove-icon">
        <span class="i-mdi-close" aria-hidden="true" />
      </slot>
    </button>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuChip",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { puSizes } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puChipEmits, puChipProps, puChipTones, type PuChipSize } from "./puChip";

const props = defineProps(puChipProps);
const emit = defineEmits(puChipEmits);
const slots = useSlots();

const isButton = computed(() => props.as === "button");
const tone = computed(() => normalizePuVariant(puChipTones, props.tone, "surface"));
const size = computed<PuChipSize>(() => normalizePuVariant(puSizes, props.size, "md"));

const hasPrefix = computed(() => Boolean(slots.prefix) || Boolean(props.prefixIcon));
const hasSuffix = computed(() => Boolean(slots.suffix) || Boolean(props.suffixIcon));
const hasLabel = computed(() => Boolean(slots.default) || Boolean(props.label));

const buttonType = computed(() => (isButton.value ? props.type : undefined));
const buttonDisabled = computed(() =>
  isButton.value && props.disabled ? true : undefined,
);
const ariaDisabled = computed(() =>
  !isButton.value && props.disabled ? "true" : undefined,
);
const ariaPressed = computed(() =>
  isButton.value && props.selected ? "true" : undefined,
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-chip", "tone", tone.value),
  createPuModifierClass("pu-chip", "size", size.value),
  createPuStateClass("selected", props.selected),
  createPuStateClass("disabled", props.disabled),
  createPuStateClass("removable", props.removable),
]);

function onClick(event: MouseEvent): void {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit("click", event);
}

function onRemove(event: MouseEvent): void {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit("remove", event);
}
</script>

<style lang="scss" scoped src="./puChip.scss"></style>

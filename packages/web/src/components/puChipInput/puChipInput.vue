<template>
  <PuChip
    v-bind="rootAttrs"
    class="pu-chip-input"
    :class="rootClass"
    as="span"
    :tone="props.tone"
    :variant="props.variant"
    :size="props.size"
    :shape="props.shape"
    :disabled="props.disabled"
    :removable="showRemove"
    :remove-label="props.removeLabel"
    @click="handleRootClick"
    @remove="handleRemove"
  >
    <template v-if="hasPrefix" #prefix>
      <slot name="prefix">
        <span v-if="props.prefixIcon" :class="props.prefixIcon" />
      </slot>
    </template>

    <input
      ref="inputRef"
      v-bind="controlAttrs"
      class="pu-chip-input__control"
      type="text"
      :value="inputValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :maxlength="nativeMaxlength"
      :aria-invalid="nativeAriaInvalid"
      :style="controlStyle"
      @input="handleInput"
      @change="handleChange"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <template v-if="hasSuffix" #suffix>
      <slot name="suffix">
        <span v-if="props.suffixIcon" :class="props.suffixIcon" />
      </slot>
    </template>

    <template v-if="$slots['remove-icon']" #remove-icon>
      <slot name="remove-icon" />
    </template>
  </PuChip>
</template>

<script lang="ts">
export default {
  name: "PuChipInput",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, nextTick, ref, useSlots, watch } from "vue";
import { useNativeControlAttrs } from "../_utils/nativeAttrs";
import type { PuNativeAriaInvalidValue } from "../_utils/nativeAttrs";
import PuChip from "../puChip/puChip.vue";
import {
  puChipInputEmits,
  puChipInputProps,
  type PuChipInputCommitSource,
} from "./puChipInput";

const props = defineProps(puChipInputProps);
const emit = defineEmits(puChipInputEmits);
const slots = useSlots();
const { rootAttrs, controlAttrs } = useNativeControlAttrs();

const inputRef = ref<HTMLInputElement>();
const inputValue = ref(formatValue(props.modelValue));
const editStartValue = ref(inputValue.value);
const isFocused = ref(false);

const hasPrefix = computed(() => Boolean(slots.prefix) || Boolean(props.prefixIcon));
const hasSuffix = computed(() => Boolean(slots.suffix) || Boolean(props.suffixIcon));
const hasValue = computed(() => inputValue.value.length > 0);
const showRemove = computed(
  () => props.removable && !props.disabled && !props.readonly,
);

const nativeMaxlength = computed(() =>
  props.maxlength > -1 ? props.maxlength : undefined,
);

const nativeAriaInvalid = computed<PuNativeAriaInvalidValue>(() =>
  props.invalid
    ? "true"
    : (controlAttrs.value["aria-invalid"] as PuNativeAriaInvalidValue),
);

const controlStyle = computed(() => {
  const visibleText = inputValue.value || props.placeholder;
  const width = Math.min(Math.max(visibleText.length + 1, 2), 32);

  return {
    inlineSize: `${width}ch`,
  };
});

const rootClass = computed(() => ({
  "is-focused": isFocused.value,
  "is-readonly": props.readonly,
  "is-invalid": props.invalid,
  "is-not-empty": hasValue.value,
}));

function formatValue(value: string): string {
  if (props.maxlength > -1 && value.length > props.maxlength) {
    return value.slice(0, props.maxlength);
  }

  return value;
}

function setValue(value: string): string {
  const nextValue = formatValue(value);

  if (nextValue !== inputValue.value) {
    inputValue.value = nextValue;
    emit("update:modelValue", nextValue);
  }

  return nextValue;
}

function commitValue(event: Event, source: PuChipInputCommitSource): void {
  if (props.disabled || props.readonly) {
    return;
  }

  emit("commit", inputValue.value, { event, source });
}

function focusInput(): void {
  if (!props.disabled) {
    inputRef.value?.focus();
  }
}

function handleInput(event: Event): void {
  if (props.disabled || props.readonly) {
    return;
  }

  const target = event.target as HTMLInputElement | null;
  setValue(target?.value ?? "");
}

function handleChange(event: Event): void {
  emit("change", inputValue.value, event);
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled || props.readonly) {
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    commitValue(event, "keyboard");
    return;
  }

  if (event.key === "Escape" && !props.readonly) {
    event.preventDefault();
    const restoredValue = setValue(editStartValue.value);
    emit("cancel", restoredValue, event);
  }
}

function handleFocus(event: FocusEvent): void {
  isFocused.value = true;
  editStartValue.value = inputValue.value;

  if (props.selectOnFocus) {
    void nextTick(() => inputRef.value?.select());
  }

  emit("focus", event);
}

function handleBlur(event: FocusEvent): void {
  isFocused.value = false;

  if (props.commitOnBlur && !props.readonly) {
    commitValue(event, "blur");
  }

  emit("blur", event);
}

function handleRootClick(event: MouseEvent): void {
  emit("click", event);
  focusInput();
}

function handleRemove(event: MouseEvent): void {
  if (props.disabled || props.readonly) {
    event.preventDefault();
    return;
  }

  const removedValue = inputValue.value;
  setValue("");
  emit("change", "", event);
  emit("remove", removedValue, event);
}

watch(
  () => props.modelValue,
  (value) => {
    const nextValue = formatValue(value);
    if (nextValue !== inputValue.value) {
      inputValue.value = nextValue;
    }
  },
);

defineExpose({
  focus: focusInput,
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
});
</script>

<style lang="scss" scoped src="./puChipInput.scss"></style>

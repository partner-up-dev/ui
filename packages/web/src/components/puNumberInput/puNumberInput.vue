<template>
  <div
    class="pu-number-input"
    :class="[rootClass, attrs.class]"
    :style="attrs.style"
    @click="handleRootClick"
  >
    <input
      ref="inputRef"
      v-bind="controlAttrs"
      class="pu-number-input__control"
      :id="id"
      :name="name"
      type="number"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :value="textValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="invalid || undefined"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <button
      v-if="showClear"
      type="button"
      class="i-mdi-close-circle pu-number-input__clear"
      :disabled="disabled"
      aria-label="Clear value"
      @mousedown.prevent
      @click.stop="handleClear"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "PuNumberInput",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from "vue";
import { puNumberInputEmits, puNumberInputProps } from "./puNumberInput";
import type { PuNumberInputValue } from "./puNumberInput";

const props = defineProps(puNumberInputProps);
const emit = defineEmits(puNumberInputEmits);
const attrs = useAttrs();

const inputRef = ref<HTMLInputElement>();
const textValue = ref(formatValue(props.modelValue));
const isFocused = ref(false);
const lastAcceptedValue = ref<PuNumberInputValue>(props.modelValue);

const controlAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});

const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    textValue.value.length > 0,
);

const rootClass = computed(() => [
  `pu-number-input--size-${props.size}`,
  `pu-number-input--variant-${props.variant}`,
  `pu-number-input--tone-${props.tone}`,
  `pu-number-input--align-${props.align}`,
  {
    "is-disabled": props.disabled,
    "is-readonly": props.readonly,
    "is-focused": isFocused.value,
    "is-invalid": props.invalid,
    "is-not-empty": textValue.value.length > 0,
  },
]);

function formatValue(value: PuNumberInputValue): string {
  return value === null ? "" : String(value);
}

function parseValue(
  value: string,
  badInput = false,
):
  | { valid: true; value: PuNumberInputValue }
  | { valid: false } {
  if (badInput) {
    return { valid: false };
  }

  if (value === "") {
    return { valid: true, value: null };
  }

  const parsed = Number(value);
  if (Number.isFinite(parsed)) {
    return { valid: true, value: parsed };
  }

  return { valid: false };
}

function valuesEqual(
  first: PuNumberInputValue,
  second: PuNumberInputValue,
): boolean {
  return Object.is(first, second);
}

function acceptValue(value: PuNumberInputValue): void {
  lastAcceptedValue.value = value;
  if (!valuesEqual(value, props.modelValue)) {
    emit("update:modelValue", value);
  }
}

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  const value = target?.value ?? "";
  textValue.value = value;

  const parsed = parseValue(value, target?.validity.badInput ?? false);
  if (parsed.valid) {
    acceptValue(parsed.value);
  }
}

function handleChange(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  const parsed = parseValue(textValue.value, target?.validity.badInput ?? false);
  if (!parsed.valid) {
    textValue.value = formatValue(lastAcceptedValue.value);
    return;
  }

  acceptValue(parsed.value);
  textValue.value = formatValue(parsed.value);
  emit("change", parsed.value, event);
}

function handleFocus(event: FocusEvent): void {
  isFocused.value = true;
  emit("focus", event);
}

function handleBlur(event: FocusEvent): void {
  isFocused.value = false;

  if (!parseValue(textValue.value, inputRef.value?.validity.badInput ?? false).valid) {
    textValue.value = formatValue(lastAcceptedValue.value);
  }

  emit("blur", event);
}

function handleClear(): void {
  textValue.value = "";
  acceptValue(null);
  emit("clear");
  inputRef.value?.focus();
}

function handleRootClick(): void {
  if (!props.disabled) {
    inputRef.value?.focus();
  }
}

watch(
  () => props.modelValue,
  (value) => {
    lastAcceptedValue.value = value;
    const nextValue = formatValue(value);
    if (nextValue !== textValue.value) {
      textValue.value = nextValue;
    }
  },
);
</script>

<style lang="scss" scoped src="./puNumberInput.scss"></style>

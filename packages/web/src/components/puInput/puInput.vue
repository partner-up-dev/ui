<template>
  <div :class="rootClass" @click="handleClick">
    <div v-if="prefixIcon || $slots.prefix" class="pu-input__prefix">
      <button
        v-if="prefixIcon && !$slots.prefix"
        type="button"
        :class="[prefixIcon, 'pu-input__icon']"
        :disabled="disabled"
        @mousedown.prevent
        @click.stop="handlePrefixClick"
      />
      <slot v-else name="prefix" />
    </div>

    <input
      ref="inputRef"
      class="pu-input__control"
      :id="id"
      :name="name"
      :type="nativeInputType"
      :inputmode="resolvedInputMode"
      :autocomplete="autocomplete"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="nativeMaxlength"
      :aria-invalid="invalid || undefined"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <div
      v-if="
        showClear ||
        showPassword ||
        showCharacterCount ||
        suffixIcon ||
        $slots.suffix
      "
      class="pu-input__suffix"
    >
      <button
        v-if="showClear"
        type="button"
        class="i-mdi-close-circle pu-input__clear"
        :disabled="disabled"
        @mousedown.prevent
        @click.stop="handleClear"
      />

      <button
        v-if="showPassword"
        type="button"
        :class="[
          isPasswordVisible ? 'i-mdi-eye' : 'i-mdi-eye-off',
          'pu-input__icon',
        ]"
        :disabled="disabled"
        @mousedown.prevent
        @click.stop="togglePasswordVisibility"
      />

      <span v-if="showCharacterCount" class="pu-input__count">
        <span :class="{ 'is-over-limit': isOverLimit }">
          {{ inputValue.length }}
        </span>
        /{{ maxlength }}
      </span>

      <button
        v-if="suffixIcon && !$slots.suffix"
        type="button"
        :class="[suffixIcon, 'pu-input__icon']"
        :disabled="disabled"
        @mousedown.prevent
        @click.stop="handleSuffixClick"
      />
      <slot v-else name="suffix" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PuInput",
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { puInputEmits, puInputProps } from "./puInput";

const props = defineProps(puInputProps);
const emit = defineEmits(puInputEmits);

const inputRef = ref<HTMLInputElement>();
const inputValue = ref(formatValue(props.modelValue));
const isFocused = ref(false);
const isPasswordVisible = ref(false);

const nativeInputType = computed(() => {
  if (props.showPassword || props.type === "password") {
    return isPasswordVisible.value ? "text" : "password";
  }

  return props.type;
});

const resolvedInputMode = computed(() => {
  if (props.inputmode) {
    return props.inputmode;
  }

  if (props.type === "number") {
    return "numeric";
  }

  if (props.type === "tel") {
    return "tel";
  }

  if (props.type === "email") {
    return "email";
  }

  if (props.type === "url") {
    return "url";
  }

  if (props.type === "search") {
    return "search";
  }

  return undefined;
});

const nativeMaxlength = computed(() =>
  props.maxlength > -1 ? props.maxlength : undefined,
);

const showClear = computed(() => {
  if (!props.clearable || props.disabled || props.readonly || !inputValue.value) {
    return false;
  }

  return props.clearTrigger === "always" || isFocused.value;
});

const showCharacterCount = computed(
  () =>
    props.showCount &&
    !props.disabled &&
    !props.readonly &&
    props.maxlength > -1,
);

const isOverLimit = computed(
  () => props.maxlength > -1 && inputValue.value.length > props.maxlength,
);

const rootClass = computed(() => [
  "pu-input",
  `pu-input--size-${props.size}`,
  `pu-input--variant-${props.variant}`,
  `pu-input--tone-${props.tone}`,
  `pu-input--align-${props.align}`,
  {
    "is-disabled": props.disabled,
    "is-readonly": props.readonly,
    "is-focused": isFocused.value,
    "is-invalid": props.invalid,
    "is-not-empty": inputValue.value.length > 0,
  },
]);

function formatValue(value: string): string {
  if (props.maxlength !== -1 && value.length > props.maxlength) {
    return value.slice(0, props.maxlength);
  }

  return value;
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | null;
  const value = formatValue(target?.value ?? "");

  inputValue.value = value;
  emit("update:modelValue", value);
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true;
  emit("focus", event);
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false;
  emit("blur", event);
}

function handleClear() {
  inputValue.value = "";
  emit("update:modelValue", "");
  emit("clear");
  inputRef.value?.focus();
}

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

function handlePrefixClick(event: MouseEvent) {
  emit("clickPrefixIcon", event);
}

function handleSuffixClick(event: MouseEvent) {
  emit("clickSuffixIcon", event);
}

function handleClick(event: MouseEvent) {
  emit("click", event);
  inputRef.value?.focus();
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
</script>

<style lang="scss" scoped src="./puInput.scss"></style>

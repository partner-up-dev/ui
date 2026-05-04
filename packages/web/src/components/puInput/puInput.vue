<template>
  <div :style="rootStyle" :class="rootClass" @click="handleClick">
    <!-- Label -->
    <div v-if="label || $slots.label" :class="labelClass" :style="labelStyle">
      <span
        v-if="isRequired && markerSide === 'before'"
        class="pu-input__required pu-input__required--left"
      >
        *
      </span>

      <div v-if="prefixIcon || $slots.prefix" class="pu-input__prefix">
        <span
          v-if="prefixIcon && !$slots.prefix"
          :class="[prefixIcon, 'pu-input__icon']"
          @click="onClickPrefixIcon"
        />
        <slot v-else name="prefix" />
      </div>

      <div class="pu-input__label-inner">
        <span v-if="label && !$slots.label">{{ label }}</span>
        <slot v-else-if="$slots.label" name="label" />
      </div>

      <span
        v-if="isRequired && markerSide === 'after'"
        class="pu-input__required"
      >
        *
      </span>
    </div>

    <!-- Body -->
    <div class="pu-input__body">
      <div class="pu-input__value">
        <!-- Prefix icon (without label) -->
        <div
          v-if="(prefixIcon || $slots.prefix) && !label"
          class="pu-input__prefix"
        >
          <span
            v-if="prefixIcon && !$slots.prefix"
            :class="[prefixIcon, 'pu-input__icon']"
            @click="onClickPrefixIcon"
          />
          <slot v-else name="prefix" />
        </div>

        <!-- Input -->
        <input
          ref="inputRef"
          :class="inputClass"
          :type="nativeInputType"
          :inputmode="inputMode"
          v-model="inputValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="nativeMaxlength"
          :style="placeholderStyle"
          :selection-start="selectionStart"
          :selection-end="selectionEnd"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown.enter="handleConfirm"
        />

        <!-- Suffix -->
        <div
          v-if="
            showClear ||
            showPassword ||
            showWordCount ||
            suffixIcon ||
            $slots.suffix
          "
          class="pu-input__suffix"
        >
          <!-- Clear button -->
          <button
            v-if="showClear"
            type="button"
            class="i-mdi-close-circle pu-input__clear"
            @click="handleClear"
          />

          <!-- Password toggle -->
          <button
            v-if="showPassword"
            type="button"
            :class="[
              isPwdVisible ? 'i-mdi-eye' : 'i-mdi-eye-off',
              'pu-input__icon',
            ]"
            @click="togglePwdVisible"
          />

          <!-- Word count -->
          <div v-if="showWordCount" class="pu-input__count">
            <span
              :class="[
                inputValue && String(inputValue).length > 0
                  ? 'pu-input__count-current'
                  : '',
                String(inputValue).length > maxlength ? 'is-error' : '',
              ]"
            >
              {{ String(inputValue).length }}
            </span>
            /{{ maxlength }}
          </div>

          <!-- Suffix icon -->
          <button
            v-if="suffixIcon && !$slots.suffix"
            type="button"
            :class="[suffixIcon, 'pu-input__icon']"
            @click="onClickSuffixIcon"
          />
          <slot v-else name="suffix" />
        </div>
      </div>

      <!-- Error message -->
      <div v-if="displayErrorMessage" class="pu-input__error-message">
        {{ displayErrorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PuInput",
};
</script>

<script setup lang="ts">
import { computed, nextTick, ref, watch, useSlots } from "vue";
import { puInputProps, puInputEmits } from "./puInput";

const props = defineProps(puInputProps);
const emit = defineEmits(puInputEmits);
const slots = useSlots();

// ==================== State ====================

const inputValue = ref<string | number>(props.modelValue);
const inputRef = ref<HTMLInputElement>();
const isPwdVisible = ref(false);
const focused = ref(props.focus);
const focusing = ref(false);
const clearing = ref(false);

// ==================== Computed ====================

const isRequired = computed(() => {
  return props.required || props.rules.some((rule) => rule.required);
});

const showClear = computed(() => {
  const { disabled, readonly, clearable, clearTrigger } = props;
  if (!clearable || disabled || readonly || !inputValue.value) {
    return false;
  }
  return (
    clearTrigger === "always" || (clearTrigger === "focus" && focusing.value)
  );
});

const showWordCount = computed(() => {
  const { disabled, readonly, maxlength, showWordLimit } = props;
  return Boolean(!disabled && !readonly && maxlength > -1 && showWordLimit);
});

const displayErrorMessage = computed(() => {
  return props.errorMessage || "";
});

const rootStyle = computed(() => {
  const base: Record<string, string> = {};
  base["--pu-input-height"] = `${props.height}px`;
  return base;
});

const rootClass = computed(() => {
  return [
    "pu-input",
    props.label || slots.label ? "is-cell" : "",
    props.center ? "is-center" : "",
    props.error ? "is-error" : "",
    props.disabled ? "is-disabled" : "",
    inputValue.value && String(inputValue.value).length > 0 ? "is-not-empty" : "",
    props.noBorder ? "is-no-border" : "",
  ].join(" ");
});

const labelClass = computed(() => {
  return `pu-input__label ${props.customLabelClass}`;
});

const inputClass = computed(() => {
  return [
    "pu-input__inner",
    props.prefixIcon ? "pu-input__inner--prefix" : "",
    showWordCount.value ? "pu-input__inner--count" : "",
    props.alignRight ? "is-align-right" : "",
    props.customInputClass,
  ].join(" ");
});

const nativeInputType = computed(() => {
  if (props.showPassword) return isPwdVisible.value ? "text" : "password";
  if (props.password || props.type === "safe-password") return "password";
  if (props.type === "number") return "number";
  if (props.type === "tel") return "tel";
  return "text";
});

const inputMode = computed(() => {
  if (props.type === "digit") return "decimal";
  if (props.type === "number") return "numeric";
  if (props.type === "tel") return "tel";
  return undefined;
});

const nativeMaxlength = computed(() => (props.maxlength > -1 ? props.maxlength : undefined));

const labelStyle = computed(() => {
  return props.labelWidth
    ? `min-width: ${props.labelWidth}; max-width: ${props.labelWidth}`
    : "";
});

// ==================== Methods ====================

function formatValue(value: string | number) {
  const { maxlength } = props;
  if (maxlength !== -1 && String(value).length > maxlength) {
    return value.toString().slice(0, maxlength);
  }
  return value;
}

function togglePwdVisible() {
  isPwdVisible.value = !isPwdVisible.value;
}

async function handleClear(event?: MouseEvent) {
  event?.stopPropagation?.();
  focusing.value = false;
  inputValue.value = "";

  if (props.focusWhenClear) {
    clearing.value = true;
    focused.value = false;
  }

  await new Promise((resolve) => setTimeout(resolve, 20));

  if (props.focusWhenClear) {
    focused.value = true;
    focusing.value = true;
    await nextTick();
    inputRef.value?.focus();
  }

  emit("update:modelValue", inputValue.value);
  emit("clear");
}

async function handleBlur(event: any) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  if (clearing.value) {
    clearing.value = false;
    return;
  }

  focusing.value = false;
  emit("blur", {
    value: inputValue.value,
    cursor: event.target?.selectionStart || 0,
  });
}

function handleFocus(event: any) {
  focusing.value = true;
  emit("focus", {
    value: inputValue.value,
    height: 0,
  });
}

function handleInput(event: any) {
  const value = event.target?.value || "";
  inputValue.value = value;
  emit("update:modelValue", value);
  emit("input", { value });
}

function handleConfirm(event?: any) {
  emit("confirm", {
    value: event?.target?.value || inputValue.value,
  });
}

function handleKeyboardHeightChange(event: any) {
  emit("keyboardheightchange", {
    height: event.detail?.height || 0,
    duration: event.detail?.duration || 0,
  });
}

function onClickPrefixIcon() {
  emit("clickPrefixIcon");
}

function onClickSuffixIcon() {
  emit("clickSuffixIcon");
}

function handleClick() {
  emit("click");
}

// ==================== Watchers ====================

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== inputValue.value) {
      inputValue.value = formatValue(newVal);
    }
  }
);

watch(
  () => props.focus,
  (newVal) => {
    focused.value = newVal;
    if (newVal) {
      nextTick(() => inputRef.value?.focus());
    } else {
      inputRef.value?.blur();
    }
  }
);

// Initialize
inputValue.value = formatValue(props.modelValue);
</script>

<style lang="scss" scoped src="./puInput.scss"></style>

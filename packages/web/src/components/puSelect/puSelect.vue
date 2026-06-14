<template>
  <div
    v-bind="rootAttrs"
    class="pu-select"
    :class="rootClass"
  >
    <select
      ref="selectRef"
      v-bind="controlAttrs"
      class="pu-select__control"
      :value="selectedNativeValue"
      :disabled="disabled"
      :aria-invalid="nativeAriaInvalid"
      :aria-readonly="nativeAriaReadonly"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @pointerdown="handleReadonlyPointer"
      @keydown="handleKeydown"
    >
      <option
        v-if="hasPlaceholder"
        value=""
        :disabled="!clearable"
      >
        {{ placeholder }}
      </option>
      <option
        v-else-if="needsEmptyOption"
        value=""
        disabled
        hidden
      />
      <option
        v-for="(option, optionIndex) in options"
        :key="getOptionKey(option, optionIndex)"
        :value="getOptionNativeValue(option)"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <span
      class="i-mdi-chevron-down pu-select__chevron"
      aria-hidden="true"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "PuSelect",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { puSelectEmits, puSelectProps } from "./puSelect";
import type { PuSelectOption, PuSelectValue } from "./puSelect";
import { useNativeControlAttrs } from "../_utils/nativeAttrs";
import type {
  PuNativeAriaBooleanishValue,
  PuNativeAriaInvalidValue,
} from "../_utils/nativeAttrs";

const props = defineProps(puSelectProps);
const emit = defineEmits(puSelectEmits);
const { rootAttrs, controlAttrs } = useNativeControlAttrs();

const selectRef = ref<HTMLSelectElement>();
const isFocused = ref(false);

const nativeAriaInvalid = computed<PuNativeAriaInvalidValue>(() =>
  props.invalid
    ? "true"
    : (controlAttrs.value["aria-invalid"] as PuNativeAriaInvalidValue),
);

const nativeAriaReadonly = computed<PuNativeAriaBooleanishValue>(() =>
  props.readonly
    ? "true"
    : (controlAttrs.value["aria-readonly"] as PuNativeAriaBooleanishValue),
);

const selectedOptionIndex = computed(() =>
  props.options.findIndex((option) => valuesEqual(option.value, props.modelValue)),
);

const selectedNativeValue = computed(() => {
  if (props.modelValue === null || selectedOptionIndex.value === -1) {
    return "";
  }

  return getOptionNativeValue(props.options[selectedOptionIndex.value]);
});

const hasPlaceholder = computed(() => Boolean(props.placeholder));
const needsEmptyOption = computed(() => selectedNativeValue.value === "");
const emptyOptionOffset = computed(() =>
  hasPlaceholder.value || needsEmptyOption.value ? 1 : 0,
);

const rootClass = computed(() => [
  `pu-select--size-${props.size}`,
  `pu-select--variant-${props.variant}`,
  `pu-select--tone-${props.tone}`,
  {
    "is-disabled": props.disabled,
    "is-readonly": props.readonly,
    "is-focused": isFocused.value,
    "is-invalid": props.invalid,
    "is-empty": selectedNativeValue.value === "",
  },
]);

function valuesEqual(first: PuSelectValue, second: PuSelectValue): boolean {
  return Object.is(first, second);
}

function getOptionNativeValue(option: PuSelectOption | undefined): string {
  return option ? String(option.value) : "";
}

function getOptionKey(option: PuSelectOption, index: number): string {
  return `${index}:${typeof option.value}:${String(option.value)}`;
}

function getOptionFromEvent(event: Event): PuSelectOption | undefined {
  const target = event.target as HTMLSelectElement | null;
  if (!target || target.value === "") {
    return undefined;
  }

  const optionIndex = target.selectedIndex - emptyOptionOffset.value;
  return props.options[optionIndex];
}

function updateValue(value: PuSelectValue): void {
  if (!valuesEqual(value, props.modelValue)) {
    emit("update:modelValue", value);
  }
}

function handleFocus(event: FocusEvent): void {
  isFocused.value = true;
  emit("focus", event);
}

function handleBlur(event: FocusEvent): void {
  isFocused.value = false;
  emit("blur", event);
}

function handleChange(event: Event): void {
  if (props.readonly) {
    resetNativeValue();
    return;
  }

  const option = getOptionFromEvent(event);
  const value = option ? option.value : null;
  updateValue(value);
  emit("change", value, option, event);
}

function handleReadonlyPointer(event: PointerEvent): void {
  if (!props.readonly || props.disabled) {
    return;
  }

  event.preventDefault();
  selectRef.value?.focus();
}

function handleKeydown(event: KeyboardEvent): void {
  if (!props.readonly || props.disabled) {
    return;
  }

  const blockedKeys = [
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "End",
    "Enter",
    "Home",
    "PageDown",
    "PageUp",
    " ",
  ];

  if (blockedKeys.includes(event.key)) {
    event.preventDefault();
  }
}

function resetNativeValue(): void {
  if (selectRef.value) {
    selectRef.value.value = selectedNativeValue.value;
  }
}
</script>

<style lang="scss" scoped src="./puSelect.scss"></style>

<template>
  <div
    :class="rootClass"
    @click="handleClick"
  >
    <textarea
      ref="textareaRef"
      class="pu-textarea__control"
      :id="id"
      :name="name"
      :value="textareaValue"
      :placeholder="placeholder"
      :maxlength="nativeMaxlength"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="invalid || undefined"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />

    <span v-if="showCharacterCount" class="pu-textarea__count">
      <span :class="{ 'is-over-limit': isOverLimit }">
        {{ textareaValue.length }}
      </span>
      /{{ maxlength }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "PuTextarea",
};
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { puTextareaProps, puTextareaEmits } from "./puTextarea";

const props = defineProps(puTextareaProps);
const emit = defineEmits(puTextareaEmits);

const isFocused = ref(false);
const textareaValue = ref(formatValue(props.modelValue));
const textareaRef = ref<HTMLTextAreaElement>();

const nativeMaxlength = computed(() =>
  props.maxlength > -1 ? props.maxlength : undefined,
);

const showCharacterCount = computed(
  () => props.showCount && props.maxlength > -1,
);

const isOverLimit = computed(
  () => props.maxlength > -1 && textareaValue.value.length > props.maxlength,
);

const rootClass = computed(() => [
  "pu-textarea",
  `pu-textarea--size-${props.size}`,
  `pu-textarea--variant-${props.variant}`,
  `pu-textarea--tone-${props.tone}`,
  {
    "is-disabled": props.disabled,
    "is-readonly": props.readonly,
    "is-focused": isFocused.value,
    "is-invalid": props.invalid,
    "has-count": showCharacterCount.value,
    "has-auto-height": props.autoHeight,
    "is-not-empty": textareaValue.value.length > 0,
  },
]);

function formatValue(value: string): string {
  if (props.maxlength !== -1 && value.length > props.maxlength) {
    return value.slice(0, props.maxlength);
  }

  return value;
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true;
  emit("focus", event);
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false;
  emit("blur", event);
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement | null;
  const value = formatValue(target?.value ?? "");

  if (target && target.value !== value) {
    target.value = value;
  }

  textareaValue.value = value;
  syncAutoHeight();
  emit("update:modelValue", value);
}

function handleClick() {
  if (!props.disabled) {
    textareaRef.value?.focus();
  }
}

function syncAutoHeight() {
  if (!props.autoHeight || !textareaRef.value) return;
  const target = textareaRef.value;
  target.style.height = "auto";
  target.style.height = `${target.scrollHeight}px`;
}

watch(
  () => [props.modelValue, props.maxlength] as const,
  ([value]) => {
    const nextValue = formatValue(value);
    if (nextValue !== textareaValue.value) {
      textareaValue.value = nextValue;
    }
    nextTick(syncAutoHeight);
  },
);

watch(
  () => props.autoHeight,
  (autoHeight) => {
    if (autoHeight) {
      nextTick(syncAutoHeight);
    } else if (textareaRef.value) {
      textareaRef.value.style.height = "";
    }
  },
);

onMounted(() => nextTick(syncAutoHeight));
</script>

<style lang="scss" scoped src="./puTextarea.scss"></style>

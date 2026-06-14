<template>
  <div
    v-bind="rootAttrs"
    class="pu-chip-input"
    :class="rootClass"
    @click="handleRootClick"
  >
    <div v-if="$slots.prefix" class="pu-chip-input__prefix">
      <slot name="prefix" />
    </div>

    <PuChipGroup class="pu-chip-input__content" gap="xs">
      <template v-for="(value, index) in props.modelValue" :key="`${value}-${index}`">
        <slot
          name="chip"
          :value="value"
          :index="index"
          :remove="(event: MouseEvent) => removeValue(index, event, 'remove')"
        >
          <PuChip
            class="pu-chip-input__chip"
            :label="value"
            :tone="props.tone"
            variant="soft"
            :size="props.size"
            :shape="props.shape"
            :removable="!props.readonly"
            :disabled="props.disabled"
            :remove-label="getRemoveLabel(value)"
            @remove="removeValue(index, $event, 'remove')"
          />
        </slot>
      </template>

      <input
        ref="inputRef"
        v-bind="inputAttrs"
        class="pu-chip-input__control"
        type="text"
        :value="draftText"
        :placeholder="visiblePlaceholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :aria-invalid="nativeAriaInvalid"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </PuChipGroup>

    <div v-if="showClear || $slots.suffix" class="pu-chip-input__suffix">
      <button
        v-if="showClear"
        type="button"
        class="i-mdi-close-circle pu-chip-input__clear"
        :disabled="props.disabled"
        aria-label="Clear chips"
        @mousedown.prevent
        @click.stop="handleClear"
      />
      <slot name="suffix" />
    </div>

    <input
      v-for="(value, index) in hiddenValues"
      :key="`${nativeName}-${index}`"
      type="hidden"
      :name="nativeName"
      :form="nativeForm"
      :value="value"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "PuChipInput",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useNativeControlAttrs } from "../_utils/nativeAttrs";
import type { PuNativeAriaInvalidValue } from "../_utils/nativeAttrs";
import PuChip from "../puChip/puChip.vue";
import PuChipGroup from "../puChipGroup/puChipGroup.vue";
import {
  puChipInputEmits,
  puChipInputProps,
  type PuChipInputChangeContext,
  type PuChipInputChangeSource,
  type PuChipInputValue,
} from "./puChipInput";

const props = defineProps(puChipInputProps);
const emit = defineEmits(puChipInputEmits);
const { rootAttrs, controlAttrs } = useNativeControlAttrs();

const inputRef = ref<HTMLInputElement>();
const draftText = ref(props.draftValue ?? "");
const isFocused = ref(false);
const isComposing = ref(false);

const inputAttrs = computed(() => {
  const { name: _name, ...rest } = controlAttrs.value;
  return rest;
});

const nativeName = computed(() => {
  const name = controlAttrs.value.name;
  return typeof name === "string" ? name : undefined;
});

const nativeForm = computed(() => {
  const form = controlAttrs.value.form;
  return typeof form === "string" ? form : undefined;
});

const hiddenValues = computed(() => (nativeName.value ? props.modelValue : []));

const nativeAriaInvalid = computed<PuNativeAriaInvalidValue>(() =>
  props.invalid
    ? "true"
    : (controlAttrs.value["aria-invalid"] as PuNativeAriaInvalidValue),
);

const isDraftControlled = computed(() => props.draftValue !== undefined);

const hasValue = computed(
  () => props.modelValue.length > 0 || draftText.value.length > 0,
);

const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    hasValue.value,
);

const visiblePlaceholder = computed(() =>
  props.modelValue.length === 0 ? props.placeholder : undefined,
);

const rootClass = computed(() => [
  `pu-chip-input--size-${props.size}`,
  `pu-chip-input--variant-${props.variant}`,
  `pu-chip-input--tone-${props.tone}`,
  `pu-chip-input--shape-${props.shape}`,
  {
    "is-disabled": props.disabled,
    "is-readonly": props.readonly,
    "is-focused": isFocused.value,
    "is-invalid": props.invalid,
    "is-not-empty": hasValue.value,
  },
]);

function setDraftValue(value: string): void {
  if (!isDraftControlled.value) {
    draftText.value = value;
  }

  emit("update:draftValue", value);
}

function normalizeValue(value: string): string {
  return value.trim();
}

function splitBySeparators(value: string): { entries: string[]; remainder: string } {
  const separators = props.separators.filter(Boolean);
  if (separators.length === 0) {
    return { entries: [], remainder: value };
  }

  const entries: string[] = [];
  let buffer = "";
  let index = 0;

  while (index < value.length) {
    const separator = separators.find((item) => value.startsWith(item, index));
    if (separator) {
      entries.push(buffer);
      buffer = "";
      index += separator.length;
      continue;
    }

    buffer += value[index];
    index += 1;
  }

  return {
    entries,
    remainder: buffer,
  };
}

function collectAdditions(values: string[]): string[] {
  const additions: string[] = [];
  const seen = new Set(props.modelValue);
  const capacity =
    props.max >= 0
      ? Math.max(props.max - props.modelValue.length, 0)
      : Number.POSITIVE_INFINITY;

  for (const rawValue of values) {
    if (additions.length >= capacity) {
      break;
    }

    const value = normalizeValue(rawValue);
    if (!value) {
      continue;
    }

    if (!props.allowDuplicates && seen.has(value)) {
      continue;
    }

    additions.push(value);
    if (!props.allowDuplicates) {
      seen.add(value);
    }
  }

  return additions;
}

function emitValue(nextValue: PuChipInputValue, event: Event): void {
  emit("update:modelValue", nextValue);
  emit("change", nextValue, event);
}

function addValues(
  rawValues: string[],
  event: Event,
  source: PuChipInputChangeSource,
): string[] {
  if (props.disabled || props.readonly) {
    return [];
  }

  const additions = collectAdditions(rawValues);
  if (additions.length === 0) {
    return additions;
  }

  const nextValue = [...props.modelValue, ...additions];
  const context: PuChipInputChangeContext = { event, source };

  emitValue(nextValue, event);
  additions.forEach((value) => {
    emit("add", value, context);
  });

  return additions;
}

function commitDraft(event: Event, source: PuChipInputChangeSource): boolean {
  const value = draftText.value;
  const additions = addValues([value], event, source);

  if (additions.length > 0 || normalizeValue(value).length === 0) {
    setDraftValue("");
    return additions.length > 0;
  }

  return false;
}

function removeValue(
  index: number,
  event: Event,
  source: PuChipInputChangeSource,
): void {
  if (props.disabled || props.readonly) {
    event.preventDefault();
    return;
  }

  const value = props.modelValue[index];
  if (value === undefined) {
    return;
  }

  const nextValue = props.modelValue.filter((_, itemIndex) => itemIndex !== index);
  const context: PuChipInputChangeContext = { event, source };

  emitValue(nextValue, event);
  emit("remove", value, index, context);
}

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  const value = target?.value ?? "";

  if (props.disabled || props.readonly) {
    return;
  }

  if (isComposing.value) {
    setDraftValue(value);
    return;
  }

  const { entries, remainder } = splitBySeparators(value);
  if (entries.length === 0) {
    setDraftValue(value);
    return;
  }

  addValues(entries, event, "separator");
  setDraftValue(remainder);
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled || props.readonly || isComposing.value || event.isComposing) {
    return;
  }

  if (event.key === "Enter") {
    if (draftText.value.length > 0) {
      event.preventDefault();
      commitDraft(event, "keyboard");
    }
    return;
  }

  if (event.key === "Backspace" && draftText.value.length === 0) {
    const lastIndex = props.modelValue.length - 1;
    if (lastIndex >= 0) {
      event.preventDefault();
      removeValue(lastIndex, event, "remove");
    }
    return;
  }

  if (event.key === "Escape" && draftText.value.length > 0) {
    event.preventDefault();
    setDraftValue("");
  }
}

function handleCompositionStart(): void {
  isComposing.value = true;
}

function handleCompositionEnd(event: CompositionEvent): void {
  isComposing.value = false;
  handleInput(event);
}

function handleFocus(event: FocusEvent): void {
  isFocused.value = true;
  emit("focus", event);
}

function handleBlur(event: FocusEvent): void {
  isFocused.value = false;

  if (props.addOnBlur && draftText.value.length > 0) {
    commitDraft(event, "blur");
  }

  emit("blur", event);
}

function handleClear(event: MouseEvent): void {
  if (props.disabled || props.readonly) {
    event.preventDefault();
    return;
  }

  setDraftValue("");
  if (props.modelValue.length > 0) {
    emitValue([], event);
  }
  emit("clear", event);
  inputRef.value?.focus();
}

function handleRootClick(): void {
  if (!props.disabled) {
    inputRef.value?.focus();
  }
}

function getRemoveLabel(value: string): string {
  return `${props.removeLabel}: ${value}`;
}

watch(
  () => props.draftValue,
  (value) => {
    if (value !== undefined && value !== draftText.value) {
      draftText.value = value;
    }
  },
);
</script>

<style lang="scss" scoped src="./puChipInput.scss"></style>

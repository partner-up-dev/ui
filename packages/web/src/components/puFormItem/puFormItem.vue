<script lang="ts">
export default {
  name: "PuFormItem",
};
</script>

<script setup lang="ts">
import { puFormItemProps, puFormItemEmits } from "./puFormItem";
import type { FormErrorState } from "../puForm/puForm";
import { inject, computed, useSlots } from "vue";
import { puAligns, type PuAlign } from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";

const props = defineProps(puFormItemProps);
defineEmits(puFormItemEmits);
const slots = useSlots();

// Inject form context if inside PuForm
const formErrors = inject<{ value: FormErrorState } | undefined>(
  "puFormErrors",
  undefined
);

const injectedErrorMessage = computed(() => {
  if (!props.prop || !formErrors?.value?.errors) {
    return undefined;
  }

  const errors = formErrors.value.errors;

  // If includeSub is enabled, collect all errors for this prop and its sub-fields
  if (props.includeSub) {
    const prefix = props.prop + ".";
    const relatedErrors: string[] = [];

    if (errors[props.prop]) {
      relatedErrors.push(errors[props.prop]);
    }

    for (const key in errors) {
      if (key.startsWith(prefix)) {
        relatedErrors.push(errors[key]);
      }
    }

    return relatedErrors.length > 0 ? relatedErrors.join("; ") : undefined;
  }

  return errors[props.prop];
});

const errorMessage = computed(() => props.error || injectedErrorMessage.value);
const align = computed<PuAlign>(() =>
  normalizePuVariant(puAligns, props.align, "start"),
);
const hasHeader = computed(
  () => Boolean(props.label) || Boolean(slots.label) || Boolean(slots.labelTrailing),
);
const hasHint = computed(() => Boolean(props.hint) && !errorMessage.value);
const hasControl = computed(() => Boolean(slots.default) || Boolean(slots.control));
const rootClasses = computed(() => [
  createPuModifierClass("pu-form-item", "align", align.value),
  createPuStateClass("required", props.required),
  createPuStateClass("invalid", Boolean(errorMessage.value)),
  createPuStateClass("with-header", hasHeader.value),
]);
</script>

<template>
  <component
    :is="props.as"
    class="pu-form-item"
    :class="rootClasses"
  >
    <div v-if="hasHeader" class="pu-form-item__header">
      <label
        v-if="props.label || $slots.label"
        class="pu-form-item__label"
        :for="props.forId"
      >
        <slot name="label">
          {{ props.label }}
        </slot>
        <span
          v-if="props.required"
          class="pu-form-item__required"
          aria-hidden="true"
        >
          *
        </span>
      </label>
      <div v-if="$slots.labelTrailing" class="pu-form-item__label-trailing">
        <slot name="labelTrailing" />
      </div>
    </div>

    <div v-if="hasControl" class="pu-form-item__control">
      <slot name="control">
        <slot />
      </slot>
    </div>

    <p v-if="errorMessage" class="pu-form-item__message pu-form-item__message--error">
      {{ errorMessage }}
    </p>
    <p v-else-if="hasHint" class="pu-form-item__message pu-form-item__message--hint">
      {{ props.hint }}
    </p>
  </component>
</template>

<style lang="scss" scoped src="./puFormItem.scss"></style>

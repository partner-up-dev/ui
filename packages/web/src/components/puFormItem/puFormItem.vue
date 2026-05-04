<script lang="ts">
export default {
  name: "PuFormItem",
};
</script>

<script setup lang="ts">
import { puFormItemProps, puFormItemEmits } from "./puFormItem";
import type { FormErrorState } from "../puForm/puForm";
import { inject, computed } from "vue";

const props = defineProps(puFormItemProps);
defineEmits(puFormItemEmits);

// Inject form context if inside PuForm
const formErrors = inject<{ value: FormErrorState } | undefined>(
  "puFormErrors",
  undefined
);

// Compute error message for this field
const errorMessage = computed(() => {
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
</script>

<template>
  <div class="pu-form-item">
    <slot></slot>
    <div v-if="errorMessage" class="pu-form-item__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped src="./puFormItem.scss"></style>

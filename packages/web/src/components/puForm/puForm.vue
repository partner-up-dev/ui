<script lang="ts">
export default {
  name: "PuForm",
};
</script>

<script setup lang="ts">
import { puFormProps, puFormEmits } from "./puForm";
import type { FormValidationResult, FormErrorState } from "./puForm";
import { ref, provide, computed } from "vue";

const props = defineProps(puFormProps);
const emit = defineEmits(puFormEmits);

// Reactive error state
const formErrors = ref<Record<string, string>>({});

// Provide error state to child cells
const errorState = computed<FormErrorState>(() => ({
  errors: formErrors.value,
}));

provide("puFormErrors", errorState);
provide(
  "puFormCellPadding",
  computed(() => props.cellPadding)
);

/**
 * Validate the form using the schema instance
 * @returns Promise with validation result
 */
function validate<T = any>(): Promise<FormValidationResult<T>> {
  formErrors.value = {};

  const schema = props.schema as any;

  if (!schema || typeof schema.validate !== "function") {
    console.error("PuForm: schema must be an instance with validate method");
    return Promise.resolve({
      success: false,
      errors: { _form: "Invalid schema: must be an instance with validate method" },
    });
  }

  return schema.validate().then((result: { success: boolean; errors: Record<string, string[]> }) => {
    if (result.success) {
      return {
        success: true,
        validatedForm: schema as T,
      };
    }

    // Convert array of errors to single string per field
    const errors: Record<string, string> = {};
    for (const [key, messages] of Object.entries(result.errors)) {
      errors[key] = messages.join(", ");
    }

    formErrors.value = errors;

    return {
      success: false,
      errors,
    };
  });
}

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  emit("submit", event);
}

// Expose validate method
defineExpose({
  validate,
});
</script>

<template>
  <form class="pu-form" @submit="handleSubmit">
    <slot></slot>
  </form>
</template>

<style lang="scss" scoped src="./puForm.scss"></style>

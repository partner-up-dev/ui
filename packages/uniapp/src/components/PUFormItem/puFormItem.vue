<script lang="ts">
import { BasicComponentOptions } from "@/utils/vue";
export default {
  name: "PuFormItem",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { puFormItemProps, puFormItemEmits } from "./puFormItem";
import type { FormErrorState } from "@/components/PUForm/puForm";
import { inject, computed } from "vue";

const props = defineProps(puFormItemProps);
const emit = defineEmits(puFormItemEmits);

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
  <view class="pu-form-item">
    <slot></slot>
    <view v-if="errorMessage" class="pu-form-item__error">
      {{ errorMessage }}
    </view>
  </view>
</template>

<style lang="scss" scoped src="./puFormItem.scss"></style>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuPicker",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import PuDrawer from "../puDrawer/puDrawer.vue";
import {
  puPickerProps,
  puPickerEmits,
  formatColumns,
  getSelectedIndex,
  getSelectedItems,
  getSelectedValues,
  defaultDisplayFormat,
  type PickerColumnItem,
  type PickerValue,
} from "./puPicker";

const props = defineProps(puPickerProps);
const emit = defineEmits(puPickerEmits);

const isOpen = ref(false);
const showValue = ref("");
const formattedColumns = ref<PickerColumnItem[][]>([]);
const selectedIndex = ref<number[]>([]);
const draftIndex = ref<number[]>([]);

const isInteractive = computed(() => !props.disabled && !props.readonly);

const showClear = computed(
  () =>
    props.clearable &&
    isInteractive.value &&
    showValue.value.length > 0
);

const showArrow = computed(() => isInteractive.value && !showClear.value);

const cellClass = computed(() => {
  const classes = ["pu-picker__cell"];
  if (props.disabled) classes.push("is-disabled");
  if (props.readonly) classes.push("is-readonly");
  if (props.error) classes.push("is-error");
  if (!showValue.value) classes.push("pu-picker__cell--placeholder");
  return classes.join(" ");
});

const rootClass = computed(() => {
  const classes = ["pu-picker"];
  if (props.disabled) classes.push("is-disabled");
  if (props.size) classes.push(`is-${props.size}`);
  if (props.alignRight) classes.push("is-align-right");
  if (props.error) classes.push("is-error");
  if (props.customClass) classes.push(props.customClass);
  return classes.join(" ");
});

const selectedItems = computed(() =>
  getSelectedItems(draftIndex.value, formattedColumns.value)
);

function normalizeDraftIndex() {
  draftIndex.value = formattedColumns.value.map((column, columnIndex) => {
    const index = draftIndex.value[columnIndex] ?? selectedIndex.value[columnIndex] ?? 0;
    return Math.min(Math.max(index, 0), Math.max(column.length - 1, 0));
  });
}

function openPicker() {
  if (!isInteractive.value) return;

  draftIndex.value = [...selectedIndex.value];
  normalizeDraftIndex();
  isOpen.value = true;
}

function closePicker() {
  isOpen.value = false;
}

function onPickerCancel() {
  closePicker();
  emit("cancel");
}

function selectOption(columnIndex: number, optionIndex: number) {
  draftIndex.value[columnIndex] = optionIndex;
  normalizeDraftIndex();

  if (props.columnChange && formattedColumns.value.length > 1) {
    props.columnChange({
      selectedIndex: [...draftIndex.value],
      selectedItems: selectedItems.value,
      columnIndex,
      resolve: (newColumns) => {
        formattedColumns.value = formatColumns(
          newColumns,
          props.valueKey,
          props.labelKey
        );
        normalizeDraftIndex();
      },
    });
  }
}

function handleConfirm(values: PickerValue) {
  if (props.disabled) return;

  const items = getSelectedItems(selectedIndex.value, formattedColumns.value);
  emit("update:modelValue", values);
  updateShowValue(items);
  emit("confirm", {
    value: values,
    selectedItems: items.length === 1 ? items[0] : items,
  });
  emit("change", { value: values });
  closePicker();
}

function confirmDraft() {
  selectedIndex.value = [...draftIndex.value];
  const values = getSelectedValues(
    selectedIndex.value,
    formattedColumns.value,
    props.valueKey
  );

  if (props.beforeConfirm) {
    props.beforeConfirm(values, (isPass: boolean) => {
      if (isPass) handleConfirm(values);
    });
    return;
  }

  handleConfirm(values);
}

function handleClear() {
  const clearValue: PickerValue = Array.isArray(props.modelValue) ? [] : "";
  selectedIndex.value = formattedColumns.value.map(() => 0);
  draftIndex.value = [...selectedIndex.value];
  showValue.value = "";
  emit("update:modelValue", clearValue);
  emit("clear");
}

function updateSelectedIndex(value: PickerValue) {
  selectedIndex.value = getSelectedIndex(
    value,
    formattedColumns.value,
    props.valueKey
  );
  draftIndex.value = [...selectedIndex.value];
}

function updateShowValue(items: PickerColumnItem | PickerColumnItem[]) {
  if (
    (Array.isArray(items) && items.length === 0) ||
    !items ||
    (typeof items === "object" && Object.keys(items).length === 0)
  ) {
    showValue.value = "";
    return;
  }

  const formatter = props.displayFormat || defaultDisplayFormat;
  showValue.value = formatter(items, {
    valueKey: props.valueKey,
    labelKey: props.labelKey,
  });
}

function handleValueUpdate(value: PickerValue) {
  if (
    (Array.isArray(value) && value.length > 0) ||
    (value !== "" && value !== undefined && !Array.isArray(value))
  ) {
    updateSelectedIndex(value);
    updateShowValue(getSelectedItems(selectedIndex.value, formattedColumns.value));
    return;
  }

  selectedIndex.value = formattedColumns.value.map(() => 0);
  draftIndex.value = [...selectedIndex.value];
  showValue.value = "";
}

watch(
  () => props.modelValue,
  (newValue) => {
    handleValueUpdate(newValue);
  },
  { deep: true, immediate: true }
);

watch(
  () => props.columns,
  (newValue) => {
    formattedColumns.value = formatColumns(
      newValue,
      props.valueKey,
      props.labelKey
    );

    if (newValue.length === 0) {
      showValue.value = "";
      selectedIndex.value = [];
      draftIndex.value = [];
      return;
    }

    handleValueUpdate(props.modelValue);
  },
  { deep: true, immediate: true }
);

defineExpose({
  open: openPicker,
  close: closePicker,
});
</script>

<template>
  <div :class="rootClass" :style="props.customStyle">
    <button
      v-if="!$slots.default"
      type="button"
      :class="cellClass"
      :disabled="props.disabled"
      :aria-expanded="isOpen"
      @click="openPicker"
    >
      <span class="pu-picker__cell-content">
        <span v-if="props.label" class="pu-picker__label" :class="props.customLabelClass">
          <span
            v-if="props.required && props.markerSide === 'before'"
            class="pu-picker__required"
          >*</span>
          {{ props.label }}
          <span
            v-if="props.required && props.markerSide === 'after'"
            class="pu-picker__required"
          >*</span>
        </span>
        <span
          class="pu-picker__value"
          :class="[props.customValueClass, props.alignRight ? 'is-align-right' : '']"
        >
          {{ showValue || props.placeholder }}
        </span>
        <span v-if="showArrow" class="pu-picker__arrow" aria-hidden="true">
          <span class="i-mdi-chevron-right icon"></span>
        </span>
        <button
          v-else-if="showClear"
          type="button"
          class="pu-picker__clear"
          aria-label="Clear"
          @click.stop="handleClear"
        >
          <span class="i-mdi-close-circle icon" aria-hidden="true"></span>
        </button>
      </span>
    </button>

    <div
      v-else
      class="pu-picker__custom-trigger"
      role="button"
      tabindex="0"
      :aria-expanded="isOpen"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @keydown.space.prevent="openPicker"
    >
      <slot />
    </div>

    <PuDrawer
      v-model:visible="isOpen"
      :aria-label="props.label || 'Picker'"
      height="auto"
      max-width="32rem"
      :show-close="false"
      :content-padding="false"
      @close="onPickerCancel"
    >
      <template #header>
        <div class="pu-picker__toolbar">
          <button type="button" class="pu-picker__action" @click="onPickerCancel">
            取消
          </button>
          <button type="button" class="pu-picker__action is-primary" @click="confirmDraft">
            确定
          </button>
        </div>
      </template>

      <div class="pu-picker__columns">
        <div
          v-for="(column, columnIndex) in formattedColumns"
          :key="columnIndex"
          class="pu-picker__column"
          role="listbox"
        >
          <button
            v-for="(item, optionIndex) in column"
            :key="String(item[props.valueKey])"
            type="button"
            class="pu-picker__option"
            :class="{ 'is-selected': draftIndex[columnIndex] === optionIndex }"
            :disabled="item.disabled"
            role="option"
            :aria-selected="draftIndex[columnIndex] === optionIndex"
            @click="selectOption(columnIndex, optionIndex)"
          >
            {{ item[props.labelKey] }}
          </button>
        </div>
      </div>
    </PuDrawer>
  </div>
</template>

<style lang="scss" scoped src="./puPicker.scss"></style>

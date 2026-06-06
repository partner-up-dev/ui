<template>
  <PuFilesUpload
    :model-value="filesValue"
    :mode="props.mode"
    :layout="props.layout"
    :accept="props.accept"
    :max-files="1"
    :max-size="props.maxSize"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :title="props.title"
    :description="props.description"
    :helper-text="props.helperText"
    :drop-label="props.dropLabel"
    :drop-description="props.dropDescription"
    :choose-label="actionLabel"
    :placeholder="props.placeholder"
    :url-label="props.urlLabel"
    :url-placeholder="props.urlPlaceholder"
    :url-add-label="props.urlAddLabel"
    :empty-label="props.emptyLabel"
    :remove-label="props.removeLabel"
    :clear-label="props.removeLabel"
    :replace-on-add="true"
    :validate-url="props.validateUrl"
    @update:model-value="onUpdateFiles"
    @change="onChangeFiles"
    @add="onAddFiles"
    @remove="onRemove"
    @reject="onReject"
    @drop="onDrop"
    @select="onSelect"
    @add-url="onAddUrl"
    @toggle-url="onToggleUrl"
  >
    <template v-for="(_, slotName) in slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </PuFilesUpload>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuFileUpload",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import type { PuFileUploadItem, PuFileUploadRejection } from "../../types";
import PuFilesUpload from "../puFilesUpload/puFilesUpload.vue";
import { puFileUploadEmits, puFileUploadProps } from "./puFileUpload";

const props = defineProps(puFileUploadProps);
const emit = defineEmits(puFileUploadEmits);
const slots = useSlots();

const filesValue = computed(() => (props.modelValue ? [props.modelValue] : []));
const actionLabel = computed(() => (props.modelValue ? props.replaceLabel : props.chooseLabel));

function toSingleValue(items: PuFileUploadItem[]): PuFileUploadItem | null {
  return items[0] ?? null;
}

function onUpdateFiles(items: PuFileUploadItem[]): void {
  emit("update:modelValue", toSingleValue(items));
}

function onChangeFiles(items: PuFileUploadItem[]): void {
  emit("change", toSingleValue(items));
}

function onAddFiles(items: PuFileUploadItem[], event: Event): void {
  const item = toSingleValue(items);

  if (item) {
    emit("add", item, event);
  }
}

function onRemove(item: PuFileUploadItem, event: Event): void {
  emit("remove", item, event);
}

function onReject(rejections: PuFileUploadRejection[], event: Event): void {
  emit("reject", rejections, event);
}

function onDrop(files: File[], event: DragEvent): void {
  emit("drop", files, event);
}

function onSelect(files: File[], event: Event): void {
  emit("select", files, event);
}

function onAddUrl(url: string, event: Event): void {
  emit("addUrl", url, event);
}

function onToggleUrl(open: boolean): void {
  emit("toggleUrl", open);
}
</script>

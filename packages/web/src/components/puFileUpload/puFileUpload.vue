<template>
  <section
    class="pu-file-upload"
    :class="rootClasses"
    :aria-labelledby="hasTitle ? titleId : undefined"
    :aria-describedby="describedBy"
  >
    <header v-if="hasHeader" class="pu-file-upload__header">
      <slot name="header">
        <h2 v-if="hasTitle" :id="titleId" class="pu-file-upload__title">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h2>
        <p
          v-if="hasDescription"
          :id="descriptionId"
          class="pu-file-upload__description"
        >
          <slot name="description">
            {{ props.description }}
          </slot>
        </p>
      </slot>
    </header>

    <div
      v-if="allowsFile"
      class="pu-file-upload__dropzone"
      role="group"
      :aria-disabled="props.disabled ? 'true' : undefined"
      :aria-readonly="props.readonly ? 'true' : undefined"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
    >
      <slot
        name="dropzone"
        :drag-active="isDragging"
        :open-file-picker="openFilePicker"
      >
        <div class="pu-file-upload__dropzone-icon" aria-hidden="true">
          <slot name="dropzone-icon">
            <span class="i-mdi-tray-arrow-up" />
          </slot>
        </div>

        <div class="pu-file-upload__dropzone-copy">
          <span class="pu-file-upload__dropzone-label">
            {{ props.dropLabel }}
          </span>
          <span class="pu-file-upload__dropzone-description">
            {{ props.dropDescription }}
          </span>
        </div>

        <button
          class="pu-file-upload__choose"
          type="button"
          :disabled="isInteractionDisabled || !canAddMoreFiles"
          @click="openFilePicker"
        >
          {{ props.chooseLabel }}
        </button>
      </slot>

      <input
        ref="fileInputRef"
        class="pu-file-upload__native"
        type="file"
        :accept="props.accept || undefined"
        :multiple="props.multiple"
        :disabled="props.disabled || props.readonly || !canAddMoreFiles"
        aria-hidden="true"
        tabindex="-1"
        @change="onFileSelect"
      />
    </div>

    <form
      v-if="allowsUrl"
      class="pu-file-upload__url-entry"
      aria-label="Add file URL"
      @submit.prevent="onSubmitUrl"
    >
      <label class="pu-file-upload__url-label" :for="urlInputId">
        {{ props.urlLabel }}
      </label>
      <input
        :id="urlInputId"
        v-model="urlValue"
        class="pu-file-upload__url-input"
        type="url"
        :placeholder="props.urlPlaceholder"
        :disabled="isInteractionDisabled || !canAddMoreUrls"
      />
      <button
        class="pu-file-upload__url-add"
        type="submit"
        :disabled="isInteractionDisabled || !canAddMoreUrls"
      >
        {{ props.urlAddLabel }}
      </button>
    </form>

    <div
      v-if="lastError || props.helperText || $slots.helper || $slots.notice"
      class="pu-file-upload__notice"
    >
      <slot name="notice" :error="lastError">
        <p
          v-if="lastError"
          :id="noticeId"
          class="pu-file-upload__error"
          role="alert"
        >
          {{ lastError }}
        </p>
        <p v-else-if="props.helperText || $slots.helper" :id="helperId" class="pu-file-upload__helper">
          <slot name="helper">
            {{ props.helperText }}
          </slot>
        </p>
      </slot>
    </div>

    <ul v-if="items.length > 0" class="pu-file-upload__list" aria-label="Selected files">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="pu-file-upload__item"
        :class="[
          createPuModifierClass('pu-file-upload__item', 'source', item.source),
          createPuModifierClass('pu-file-upload__item', 'status', item.status || 'idle'),
        ]"
      >
        <slot
          name="item"
          :item="item"
          :index="index"
          :meta="getItemMeta(item)"
          :status="getItemStatus(item)"
          :remove="removeItem"
        >
          <span class="pu-file-upload__item-icon" aria-hidden="true">
            <span :class="getItemIcon(item)" />
          </span>

          <span class="pu-file-upload__item-main">
            <span class="pu-file-upload__item-name">
              {{ item.name }}
            </span>
            <span v-if="getItemMeta(item)" class="pu-file-upload__item-meta">
              {{ getItemMeta(item) }}
            </span>
          </span>

          <span
            v-if="getItemStatus(item)"
            class="pu-file-upload__item-status"
            :class="`pu-file-upload__item-status--${getItemStatusTone(item)}`"
          >
            {{ getItemStatus(item) }}
          </span>

          <span class="pu-file-upload__item-actions">
            <slot name="item-actions" :item="item" :index="index" :remove="removeItem">
              <button
                class="pu-file-upload__item-remove"
                type="button"
                :disabled="isInteractionDisabled"
                :aria-label="`${props.removeLabel}: ${item.name}`"
                @click="removeItem(item, $event)"
              >
                <span class="i-mdi-close" aria-hidden="true" />
              </button>
            </slot>
          </span>
        </slot>
      </li>
    </ul>

    <p v-else class="pu-file-upload__empty">
      {{ props.emptyLabel }}
    </p>

    <footer v-if="$slots.actions" class="pu-file-upload__actions">
      <slot name="actions" :items="items" />
    </footer>
  </section>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuFileUpload",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref, useSlots, watch } from "vue";
import { usePuId } from "../../composables";
import {
  puFileUploadModes,
  type PuFileUploadItem,
  type PuFileUploadMode,
  type PuFileUploadRejection,
  type PuFileUploadRejectionCode,
} from "../../types";
import { createPuModifierClass, createPuStateClass, normalizePuVariant } from "../../utils";
import { puFileUploadEmits, puFileUploadProps } from "./puFileUpload";

const props = defineProps(puFileUploadProps);
const emit = defineEmits(puFileUploadEmits);
const slots = useSlots();

const baseId = usePuId("pu-file-upload");
const titleId = computed(() => `${baseId.value}-title`);
const descriptionId = computed(() => `${baseId.value}-description`);
const helperId = computed(() => `${baseId.value}-helper`);
const noticeId = computed(() => `${baseId.value}-notice`);
const urlInputId = computed(() => `${baseId.value}-url`);

const fileInputRef = ref<HTMLInputElement>();
const isDragging = ref(false);
const urlValue = ref("");
const lastError = ref("");

const items = computed(() => props.modelValue ?? []);
const mode = computed<PuFileUploadMode>(() =>
  normalizePuVariant(puFileUploadModes, props.mode, "both"),
);
const allowsFile = computed(() => mode.value === "file" || mode.value === "both");
const allowsUrl = computed(() => mode.value === "url" || mode.value === "both");
const isInteractionDisabled = computed(() => props.disabled || props.readonly);
const maxItemCount = computed(() => {
  if (!props.multiple) {
    return 1;
  }

  return props.maxFiles && props.maxFiles > 0 ? props.maxFiles : Number.POSITIVE_INFINITY;
});
const canAddMoreFiles = computed(
  () => !props.multiple || items.value.length < maxItemCount.value,
);
const canAddMoreUrls = computed(
  () => !props.multiple || items.value.length < maxItemCount.value,
);
const hasTitle = computed(() => Boolean(slots.title) || Boolean(props.title));
const hasDescription = computed(
  () => Boolean(slots.description) || Boolean(props.description),
);
const hasHeader = computed(
  () => Boolean(slots.header) || hasTitle.value || hasDescription.value,
);
const describedBy = computed(() => {
  const ids = [];
  if (hasDescription.value) {
    ids.push(descriptionId.value);
  }
  if (lastError.value) {
    ids.push(noticeId.value);
  } else if (props.helperText || slots.helper) {
    ids.push(helperId.value);
  }
  return ids.length > 0 ? ids.join(" ") : undefined;
});

const rootClasses = computed(() => [
  createPuModifierClass("pu-file-upload", "mode", mode.value),
  createPuStateClass("drag-active", isDragging.value),
  createPuStateClass("disabled", props.disabled),
  createPuStateClass("readonly", props.readonly),
  createPuStateClass("invalid", Boolean(lastError.value)),
  createPuStateClass("has-items", items.value.length > 0),
]);

watch(
  () => props.modelValue,
  () => {
    lastError.value = "";
  },
);

function openFilePicker(): void {
  if (isInteractionDisabled.value || !allowsFile.value || !canAddMoreFiles.value) {
    return;
  }

  fileInputRef.value?.click();
}

function onFileSelect(event: Event): void {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);
  emit("select", files, event);
  addFiles(files, event);
  input.value = "";
}

function onDragEnter(event: DragEvent): void {
  if (!canAcceptDrag(event)) {
    return;
  }

  isDragging.value = true;
}

function onDragOver(event: DragEvent): void {
  if (!canAcceptDrag(event)) {
    return;
  }

  event.dataTransfer!.dropEffect = "copy";
  isDragging.value = true;
}

function onDragLeave(event: DragEvent): void {
  const current = event.currentTarget as Node | null;
  const related = event.relatedTarget as Node | null;

  if (!current || !related || !current.contains(related)) {
    isDragging.value = false;
  }
}

function onDrop(event: DragEvent): void {
  isDragging.value = false;

  if (!allowsFile.value) {
    reject([{ code: "disabled", message: "File upload is not available." }], event);
    return;
  }

  const files = Array.from(event.dataTransfer?.files ?? []);
  emit("drop", files, event);
  addFiles(files, event);
}

function canAcceptDrag(event: DragEvent): boolean {
  return (
    allowsFile.value &&
    !isInteractionDisabled.value &&
    canAddMoreFiles.value &&
    Boolean(event.dataTransfer?.types?.includes("Files"))
  );
}

function addFiles(files: File[], event: Event): void {
  if (files.length === 0) {
    return;
  }

  const rejections: PuFileUploadRejection[] = [];
  const accepted: PuFileUploadItem[] = [];

  for (const file of files) {
    const fileRejections = validateFile(file, accepted);
    if (fileRejections.length > 0) {
      rejections.push(...fileRejections);
      continue;
    }

    accepted.push({
      id: createItemId("file"),
      source: "file",
      name: file.name,
      file,
      size: file.size,
      type: file.type,
      status: "ready",
    });
  }

  const acceptedItems = props.multiple ? accepted : accepted.slice(0, 1);

  if (!props.multiple && accepted.length > 1) {
    rejections.push(
      ...accepted.slice(1).map((item) => ({
        code: "too-many-files" as const,
        message: "Only one file can be added.",
        file: item.file,
      })),
    );
  }

  if (acceptedItems.length > 0) {
    const nextItems = props.multiple ? [...items.value, ...acceptedItems] : acceptedItems;
    updateValue(nextItems);
    emit("add", acceptedItems, event);
  }

  if (rejections.length > 0) {
    reject(rejections, event);
  }
}

function validateFile(file: File, accepted: PuFileUploadItem[]): PuFileUploadRejection[] {
  if (props.disabled) {
    return [createFileRejection("disabled", "File upload is disabled.", file)];
  }

  if (props.readonly) {
    return [createFileRejection("readonly", "File upload is read only.", file)];
  }

  if (props.multiple && items.value.length + accepted.length >= maxItemCount.value) {
    return [createFileRejection("too-many-files", "Too many files selected.", file)];
  }

  if (props.maxSize && file.size > props.maxSize) {
    return [
      createFileRejection(
        "file-too-large",
        `File must be smaller than ${formatFileSize(props.maxSize)}.`,
        file,
      ),
    ];
  }

  if (!matchesAccept(file, props.accept)) {
    return [
      createFileRejection("file-type-not-accepted", "This file type is not accepted.", file),
    ];
  }

  if (hasDuplicateFile(file, accepted)) {
    return [createFileRejection("duplicate", "This file has already been added.", file)];
  }

  return [];
}

function onSubmitUrl(event: Event): void {
  if (isInteractionDisabled.value || !allowsUrl.value || !canAddMoreUrls.value) {
    return;
  }

  const url = urlValue.value.trim();
  const rejections = validateUrl(url);

  if (rejections.length > 0) {
    reject(rejections, event);
    return;
  }

  const item: PuFileUploadItem = {
    id: createItemId("url"),
    source: "url",
    name: getUrlName(url),
    url,
    status: "ready",
  };

  const nextItems = props.multiple ? [...items.value, item] : [item];
  updateValue(nextItems);
  urlValue.value = "";
  emit("addUrl", url, event);
  emit("add", [item], event);
}

function validateUrl(url: string): PuFileUploadRejection[] {
  if (!url) {
    return [createUrlRejection("invalid-url", "Enter a valid URL.", url)];
  }

  if (props.multiple && items.value.length >= maxItemCount.value) {
    return [createUrlRejection("too-many-files", "Too many files selected.", url)];
  }

  const customResult = props.validateUrl?.(url);

  if (typeof customResult === "string") {
    return [createUrlRejection("invalid-url", customResult, url)];
  }

  if (customResult === false) {
    return [createUrlRejection("invalid-url", "Enter a valid URL.", url)];
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return [createUrlRejection("invalid-url", "URL must start with http or https.", url)];
    }
  } catch {
    return [createUrlRejection("invalid-url", "Enter a valid URL.", url)];
  }

  if (items.value.some((item) => item.source === "url" && item.url === url)) {
    return [createUrlRejection("duplicate", "This URL has already been added.", url)];
  }

  return [];
}

function removeItem(item: PuFileUploadItem, event: Event): void {
  if (isInteractionDisabled.value) {
    return;
  }

  updateValue(items.value.filter((current) => current.id !== item.id));
  emit("remove", item, event);
}

function reject(rejections: PuFileUploadRejection[], event: Event): void {
  lastError.value = rejections[0]?.message ?? "";
  emit("reject", rejections, event);
}

function updateValue(nextItems: PuFileUploadItem[]): void {
  emit("update:modelValue", nextItems);
  emit("change", nextItems);
}

function createFileRejection(
  code: PuFileUploadRejectionCode,
  message: string,
  file: File,
): PuFileUploadRejection {
  return { code, message, file };
}

function createUrlRejection(
  code: PuFileUploadRejectionCode,
  message: string,
  url: string,
): PuFileUploadRejection {
  return { code, message, url };
}

function hasDuplicateFile(file: File, accepted: PuFileUploadItem[]): boolean {
  return [...items.value, ...accepted].some(
    (item) =>
      item.source === "file" &&
      item.name === file.name &&
      item.size === file.size &&
      item.type === file.type,
  );
}

function getItemIcon(item: PuFileUploadItem): string {
  return item.source === "url" ? "i-mdi-link-variant" : "i-mdi-file-outline";
}

function getItemMeta(item: PuFileUploadItem): string {
  if (item.source === "url") {
    return item.url ? formatUrlMeta(item.url) : "";
  }

  return [formatFileType(item.type), formatFileSize(item.size)].filter(Boolean).join(" · ");
}

function getItemStatus(item: PuFileUploadItem): string {
  if (item.message) {
    return item.message;
  }

  switch (item.status) {
    case "uploading":
      return "Uploading";
    case "success":
      return "Uploaded";
    case "error":
      return "Error";
    default:
      return "";
  }
}

function getItemStatusTone(item: PuFileUploadItem): "neutral" | "success" | "error" {
  if (item.status === "success") {
    return "success";
  }

  if (item.status === "error") {
    return "error";
  }

  return "neutral";
}

function createItemId(source: "file" | "url"): string {
  return `${source}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function matchesAccept(file: File, accept: string): boolean {
  const tokens = accept
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (tokens.length === 0) {
    return true;
  }

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return tokens.some((token) => {
    if (token.startsWith(".")) {
      return fileName.endsWith(token);
    }

    if (token.endsWith("/*")) {
      return fileType.startsWith(token.slice(0, -1));
    }

    return fileType === token;
  });
}

function formatFileSize(size: number | undefined): string {
  if (!size) {
    return "";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function formatFileType(type: string | undefined): string {
  if (!type) {
    return "";
  }

  const [, subtype] = type.split("/");
  return (subtype || type).toUpperCase();
}

function formatUrlMeta(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

function getUrlName(url: string): string {
  try {
    const parsed = new URL(url);
    const name = parsed.pathname.split("/").filter(Boolean).pop();
    return name || parsed.hostname;
  } catch {
    return url;
  }
}
</script>

<style lang="scss" scoped src="./puFileUpload.scss"></style>

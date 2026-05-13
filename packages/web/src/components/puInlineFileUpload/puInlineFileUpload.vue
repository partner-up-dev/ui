<template>
  <div
    class="pu-inline-file-upload"
    :class="rootClasses"
    @dragenter.prevent="onDragEnter"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <component
      :is="isUrlEditing ? 'form' : 'div'"
      class="pu-inline-file-upload__control"
      :aria-disabled="props.disabled ? 'true' : undefined"
      :aria-readonly="props.readonly ? 'true' : undefined"
      :aria-invalid="lastError ? 'true' : undefined"
      :aria-describedby="messageId"
      @submit.prevent="onSubmitUrl"
    >
      <span class="pu-inline-file-upload__icon" aria-hidden="true">
        <slot name="icon" :item="props.modelValue" :editing-url="isUrlEditing">
          <span :class="resolvedIcon" />
        </slot>
      </span>

      <div class="pu-inline-file-upload__content">
        <input
          v-if="isUrlEditing"
          ref="urlInputRef"
          v-model="urlValue"
          class="pu-inline-file-upload__url-input"
          type="url"
          :placeholder="props.urlPlaceholder"
          :disabled="props.disabled"
          :readonly="props.readonly"
          aria-label="File URL"
          @keydown.esc.prevent="closeUrlEditor"
        />

        <slot
          v-else-if="props.modelValue"
          name="item"
          :item="props.modelValue"
          :meta="displayMeta"
          :status="displayStatus"
        >
          <span class="pu-inline-file-upload__name">
            {{ displayName }}
          </span>
          <span v-if="displayMeta" class="pu-inline-file-upload__meta">
            {{ displayMeta }}
          </span>
          <span
            v-if="displayStatus"
            :id="messageId"
            class="pu-inline-file-upload__status"
            :class="`pu-inline-file-upload__status--${displayStatusTone}`"
          >
            {{ displayStatus }}
          </span>
        </slot>

        <slot v-else name="placeholder">
          <span class="pu-inline-file-upload__placeholder">
            {{ props.placeholder }}
          </span>
          <span
            v-if="lastError"
            :id="messageId"
            class="pu-inline-file-upload__status pu-inline-file-upload__status--error"
            role="alert"
          >
            {{ lastError }}
          </span>
        </slot>
      </div>

      <div class="pu-inline-file-upload__actions">
        <slot
          name="actions"
          :item="props.modelValue"
          :editing-url="isUrlEditing"
          :open-file-picker="openFilePicker"
          :open-url-editor="openUrlEditor"
          :remove="removeCurrent"
        >
          <button
            v-if="isUrlEditing"
            class="pu-inline-file-upload__action"
            type="submit"
            :disabled="isInteractionDisabled"
          >
            {{ props.urlAddLabel }}
          </button>

          <button
            v-if="isUrlEditing"
            class="pu-inline-file-upload__action pu-inline-file-upload__action--icon"
            type="button"
            :disabled="isInteractionDisabled"
            aria-label="Cancel URL entry"
            @click="closeUrlEditor"
          >
            <span class="i-mdi-close" aria-hidden="true" />
          </button>

          <button
            v-if="!isUrlEditing && allowsFile"
            class="pu-inline-file-upload__action"
            type="button"
            :disabled="isInteractionDisabled"
            @click="openFilePicker"
          >
            {{ props.modelValue ? props.replaceLabel : props.chooseLabel }}
          </button>

          <button
            v-if="!isUrlEditing && allowsUrl"
            class="pu-inline-file-upload__action"
            type="button"
            :disabled="isInteractionDisabled"
            @click="openUrlEditor"
          >
            {{ props.modelValue?.source === "url" ? "Edit" : props.urlLabel }}
          </button>

          <button
            v-if="!isUrlEditing && props.modelValue"
            class="pu-inline-file-upload__action pu-inline-file-upload__action--icon"
            type="button"
            :disabled="isInteractionDisabled"
            :aria-label="removeButtonLabel"
            @click="removeCurrent"
          >
            <span class="i-mdi-close" aria-hidden="true" />
          </button>
        </slot>
      </div>
    </component>

    <input
      ref="fileInputRef"
      class="pu-inline-file-upload__native"
      type="file"
      :accept="props.accept || undefined"
      :disabled="props.disabled || props.readonly || !allowsFile"
      aria-hidden="true"
      tabindex="-1"
      @change="onFileSelect"
    />
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuInlineFileUpload",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { usePuId } from "../../composables";
import {
  puFileUploadModes,
  type PuFileUploadItem,
  type PuFileUploadMode,
  type PuFileUploadRejection,
  type PuFileUploadRejectionCode,
} from "../../types";
import { createPuModifierClass, createPuStateClass, normalizePuVariant } from "../../utils";
import { puInlineFileUploadEmits, puInlineFileUploadProps } from "./puInlineFileUpload";

const props = defineProps(puInlineFileUploadProps);
const emit = defineEmits(puInlineFileUploadEmits);

const baseId = usePuId("pu-inline-file-upload");
const messageId = computed(() =>
  displayStatus.value || lastError.value ? `${baseId.value}-message` : undefined,
);

const fileInputRef = ref<HTMLInputElement>();
const urlInputRef = ref<HTMLInputElement>();
const isDragging = ref(false);
const isUrlEditing = ref(false);
const urlValue = ref("");
const lastError = ref("");

const mode = computed<PuFileUploadMode>(() =>
  normalizePuVariant(puFileUploadModes, props.mode, "both"),
);
const allowsFile = computed(() => mode.value === "file" || mode.value === "both");
const allowsUrl = computed(() => mode.value === "url" || mode.value === "both");
const isInteractionDisabled = computed(() => props.disabled || props.readonly);
const hasValue = computed(() => Boolean(props.modelValue));

const rootClasses = computed(() => [
  createPuModifierClass("pu-inline-file-upload", "mode", mode.value),
  createPuStateClass("drag-active", isDragging.value),
  createPuStateClass("disabled", props.disabled),
  createPuStateClass("readonly", props.readonly),
  createPuStateClass("url-editing", isUrlEditing.value),
  createPuStateClass("has-value", hasValue.value),
  createPuStateClass("invalid", Boolean(lastError.value)),
]);

const resolvedIcon = computed(() => {
  if (isUrlEditing.value || props.modelValue?.source === "url") {
    return "i-mdi-link-variant";
  }

  if (props.modelValue?.source === "file") {
    return "i-mdi-file-outline";
  }

  return "i-mdi-tray-arrow-up";
});

const displayName = computed(() => props.modelValue?.name ?? "");
const displayMeta = computed(() => {
  const item = props.modelValue;

  if (!item) {
    return "";
  }

  if (item.source === "url") {
    return item.url ? formatUrlMeta(item.url) : "";
  }

  const parts = [formatFileType(item.type), formatFileSize(item.size)].filter(Boolean);
  return parts.join(" · ");
});
const displayStatus = computed(() => {
  if (lastError.value) {
    return lastError.value;
  }

  const item = props.modelValue;

  if (!item) {
    return "";
  }

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
});
const displayStatusTone = computed(() =>
  lastError.value || props.modelValue?.status === "error" ? "error" : "neutral",
);
const removeButtonLabel = computed(() =>
  props.modelValue ? `${props.removeLabel}: ${props.modelValue.name}` : props.removeLabel,
);

watch(
  () => props.modelValue,
  () => {
    lastError.value = "";
    if (!props.modelValue || props.modelValue.source !== "url") {
      urlValue.value = "";
    }
  },
);

function openFilePicker(): void {
  if (isInteractionDisabled.value || !allowsFile.value) {
    return;
  }

  fileInputRef.value?.click();
}

function openUrlEditor(): void {
  if (isInteractionDisabled.value || !allowsUrl.value) {
    return;
  }

  lastError.value = "";
  urlValue.value = props.modelValue?.source === "url" ? props.modelValue.url ?? "" : "";
  isUrlEditing.value = true;
  emit("toggleUrl", true);
  nextTick(() => urlInputRef.value?.focus());
}

function closeUrlEditor(): void {
  isUrlEditing.value = false;
  urlValue.value = "";
  emit("toggleUrl", false);
}

function removeCurrent(event: Event): void {
  if (isInteractionDisabled.value || !props.modelValue) {
    return;
  }

  const item = props.modelValue;
  updateValue(null);
  emit("remove", item, event);
}

function onFileSelect(event: Event): void {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);
  emit("select", files, event);
  addFile(files[0], event);
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
    reject(
      [
        {
          code: "disabled",
          message: "File upload is not available.",
        },
      ],
      event,
    );
    return;
  }

  const files = Array.from(event.dataTransfer?.files ?? []);
  emit("drop", files, event);
  addFile(files[0], event);
}

function canAcceptDrag(event: DragEvent): boolean {
  return (
    allowsFile.value &&
    !isInteractionDisabled.value &&
    Boolean(event.dataTransfer?.types?.includes("Files"))
  );
}

function addFile(file: File | undefined, event: Event): void {
  if (!file) {
    return;
  }

  const rejections = validateFile(file);

  if (rejections.length > 0) {
    reject(rejections, event);
    return;
  }

  const item: PuFileUploadItem = {
    id: createItemId("file"),
    source: "file",
    name: file.name,
    file,
    size: file.size,
    type: file.type,
    status: "ready",
  };

  updateValue(item);
  emit("add", item, event);
}

function onSubmitUrl(event: Event): void {
  if (isInteractionDisabled.value || !allowsUrl.value) {
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

  updateValue(item);
  emit("addUrl", url, event);
  emit("add", item, event);
  closeUrlEditor();
}

function validateFile(file: File): PuFileUploadRejection[] {
  if (props.disabled) {
    return [createRejection("disabled", "File upload is disabled.", file)];
  }

  if (props.readonly) {
    return [createRejection("readonly", "File upload is read only.", file)];
  }

  if (props.maxSize && file.size > props.maxSize) {
    return [
      createRejection(
        "file-too-large",
        `File must be smaller than ${formatFileSize(props.maxSize)}.`,
        file,
      ),
    ];
  }

  if (!matchesAccept(file, props.accept)) {
    return [
      createRejection(
        "file-type-not-accepted",
        "This file type is not accepted.",
        file,
      ),
    ];
  }

  return [];
}

function validateUrl(url: string): PuFileUploadRejection[] {
  if (!url) {
    return [createUrlRejection("invalid-url", "Enter a valid URL.", url)];
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

  return [];
}

function reject(rejections: PuFileUploadRejection[], event: Event): void {
  lastError.value = rejections[0]?.message ?? "";
  emit("reject", rejections, event);
}

function updateValue(item: PuFileUploadItem | null): void {
  emit("update:modelValue", item);
  emit("change", item);
}

function createRejection(
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

<style lang="scss" scoped src="./puInlineFileUpload.scss"></style>

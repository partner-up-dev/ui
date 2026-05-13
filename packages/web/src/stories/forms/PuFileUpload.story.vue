<script setup lang="ts">
import { ref } from "vue";
import PuFileUpload from "../../components/puFileUpload/puFileUpload.vue";
import type { PuFileUploadItem } from "../../types";

const emptyValue = ref<PuFileUploadItem[]>([]);
const urlValue = ref<PuFileUploadItem[]>([]);
const selectedFiles = ref<PuFileUploadItem[]>([
  {
    id: "story-contract",
    source: "file",
    name: "contract.pdf",
    size: 2480000,
    type: "application/pdf",
    status: "ready",
  },
  {
    id: "story-brief",
    source: "url",
    name: "partner-brief.pdf",
    url: "https://example.com/docs/partner-brief.pdf",
    status: "ready",
  },
]);
const statusFiles = ref<PuFileUploadItem[]>([
  {
    id: "story-uploading",
    source: "file",
    name: "venue-map.png",
    size: 842000,
    type: "image/png",
    status: "uploading",
  },
  {
    id: "story-success",
    source: "file",
    name: "signed-agreement.pdf",
    size: 1240000,
    type: "application/pdf",
    status: "success",
  },
  {
    id: "story-error",
    source: "url",
    name: "missing-file.pdf",
    url: "https://example.com/missing-file.pdf",
    status: "error",
    message: "Unable to fetch",
  },
]);
const singleFile = ref<PuFileUploadItem[]>([
  {
    id: "story-single",
    source: "file",
    name: "business-license.pdf",
    size: 1680000,
    type: "application/pdf",
    status: "ready",
  },
]);
</script>

<template>
  <Story title="PuFileUpload" group="forms">
    <Variant title="Basic">
      <div class="pu-story pu-story--narrow">
        <PuFileUpload
          v-model="emptyValue"
          title="Attachments"
          description="Collect files from the device or a remote URL."
          helper-text="PDF, PNG, and JPG files up to 5 MB."
          accept=".pdf,image/*"
          :max-size="5242880"
        />
      </div>
    </Variant>

    <Variant title="Selected Files">
      <div class="pu-story pu-story--narrow">
        <PuFileUpload
          v-model="selectedFiles"
          title="Submitted files"
          helper-text="Files stay in the list until the consumer uploads or removes them."
        />
      </div>
    </Variant>

    <Variant title="URL Only">
      <div class="pu-story pu-story--narrow">
        <PuFileUpload
          v-model="urlValue"
          mode="url"
          title="External document"
          url-placeholder="https://example.com/attachment.pdf"
          empty-label="No links added"
        />
      </div>
    </Variant>

    <Variant title="Statuses">
      <div class="pu-story pu-story--narrow">
        <PuFileUpload
          v-model="statusFiles"
          title="Upload queue"
          helper-text="Status and message come from item.status and item.message."
        />
      </div>
    </Variant>

    <Variant title="Single And Disabled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFileUpload
            v-model="singleFile"
            title="Single file"
            :multiple="false"
            helper-text="Adding another item replaces the current item."
          />
          <PuFileUpload
            :model-value="[]"
            title="Disabled"
            disabled
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

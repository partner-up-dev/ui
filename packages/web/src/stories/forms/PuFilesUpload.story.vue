<script setup lang="ts">
import { ref } from "vue";
import PuFilesUpload from "../../components/puFilesUpload/puFilesUpload.vue";
import type { PuFileUploadItem } from "../../types";

const emptyValue = ref<PuFileUploadItem[]>([]);
const inlineValue = ref<PuFileUploadItem[]>([
  {
    id: "story-inline-contract",
    source: "file",
    name: "contract.pdf",
    size: 2480000,
    type: "application/pdf",
    status: "ready",
  },
  {
    id: "story-inline-brief",
    source: "url",
    name: "partner-brief.pdf",
    url: "https://example.com/docs/partner-brief.pdf",
    status: "ready",
  },
]);
const urlValue = ref<PuFileUploadItem[]>([]);
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
</script>

<template>
  <Story title="PuFilesUpload" group="forms">
    <Variant title="Panel">
      <div class="pu-story pu-story--narrow">
        <PuFilesUpload
          v-model="emptyValue"
          title="Attachments"
          description="Collect files from the device or a remote URL."
          helper-text="PDF, PNG, and JPG files up to 5 MB."
          accept=".pdf,image/*"
          :max-size="5242880"
        />
      </div>
    </Variant>

    <Variant title="Inline">
      <div class="pu-story pu-story--narrow">
        <PuFilesUpload
          v-model="inlineValue"
          layout="inline"
          accept=".pdf,image/*"
        />
      </div>
    </Variant>

    <Variant title="URL Only">
      <div class="pu-story pu-story--narrow">
        <PuFilesUpload
          v-model="urlValue"
          mode="url"
          title="External documents"
          url-placeholder="https://example.com/attachment.pdf"
          empty-label="No links added"
        />
      </div>
    </Variant>

    <Variant title="Statuses">
      <div class="pu-story pu-story--narrow">
        <PuFilesUpload
          v-model="statusFiles"
          title="Upload queue"
          helper-text="Status and message come from item.status and item.message."
        />
      </div>
    </Variant>

    <Variant title="Max Files And Disabled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFilesUpload
            v-model="inlineValue"
            layout="inline"
            :max-files="3"
            helper-text="Adding is disabled when the collection reaches maxFiles."
          />
          <PuFilesUpload
            :model-value="[]"
            title="Disabled"
            disabled
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

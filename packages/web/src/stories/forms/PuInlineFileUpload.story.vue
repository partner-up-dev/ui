<script setup lang="ts">
import { ref } from "vue";
import PuInlineFileUpload from "../../components/puInlineFileUpload/puInlineFileUpload.vue";
import type { PuFileUploadItem } from "../../types";

const emptyValue = ref<PuFileUploadItem | null>(null);
const urlValue = ref<PuFileUploadItem | null>(null);
const selectedFile = ref<PuFileUploadItem | null>({
  id: "story-file",
  source: "file",
  name: "contract.pdf",
  size: 2480000,
  type: "application/pdf",
  status: "ready",
});
const successFile = ref<PuFileUploadItem | null>({
  id: "story-success",
  source: "file",
  name: "venue-map.png",
  size: 842000,
  type: "image/png",
  status: "success",
});
const errorFile = ref<PuFileUploadItem | null>({
  id: "story-error",
  source: "url",
  name: "missing-file.pdf",
  url: "https://example.com/missing-file.pdf",
  status: "error",
  message: "Unable to fetch",
});
</script>

<template>
  <Story title="PuInlineFileUpload" group="forms">
    <Variant title="Basic">
      <div class="pu-story pu-story--narrow">
        <PuInlineFileUpload v-model="emptyValue" accept=".pdf,image/*" />
      </div>
    </Variant>

    <Variant title="Selected File">
      <div class="pu-story pu-story--narrow">
        <PuInlineFileUpload v-model="selectedFile" accept=".pdf,image/*" />
      </div>
    </Variant>

    <Variant title="URL Entry">
      <div class="pu-story pu-story--narrow">
        <PuInlineFileUpload
          v-model="urlValue"
          mode="url"
          placeholder="Attach from URL"
          url-placeholder="https://example.com/attachment.pdf"
        />
      </div>
    </Variant>

    <Variant title="Statuses">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuInlineFileUpload v-model="successFile" />
          <PuInlineFileUpload v-model="errorFile" />
        </div>
      </div>
    </Variant>

    <Variant title="Disabled And Readonly">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuInlineFileUpload
            :model-value="null"
            placeholder="Disabled upload"
            disabled
          />
          <PuInlineFileUpload
            :model-value="selectedFile"
            readonly
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PuFileUpload from "../../components/puFileUpload/puFileUpload.vue";
import type { PuFileUploadItem } from "../../types";

const inlineValue = ref<PuFileUploadItem | null>(null);
const panelValue = ref<PuFileUploadItem | null>({
  id: "story-contract",
  source: "file",
  name: "contract.pdf",
  size: 2480000,
  type: "application/pdf",
  status: "ready",
});
const urlValue = ref<PuFileUploadItem | null>(null);
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
  <Story title="PuFileUpload" group="forms">
    <Variant title="Inline">
      <div class="pu-story pu-story--narrow">
        <PuFileUpload v-model="inlineValue" accept=".pdf,image/*" />
      </div>
    </Variant>

    <Variant title="Panel">
      <div class="pu-story pu-story--narrow">
        <PuFileUpload
          v-model="panelValue"
          layout="panel"
          title="Contract"
          description="Collect one file from the device or a remote URL."
          helper-text="Adding a new file replaces the current value."
          accept=".pdf,image/*"
        />
      </div>
    </Variant>

    <Variant title="URL">
      <div class="pu-story pu-story--narrow">
        <PuFileUpload
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
          <PuFileUpload v-model="successFile" />
          <PuFileUpload v-model="errorFile" />
        </div>
      </div>
    </Variant>

    <Variant title="Disabled And Readonly">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFileUpload
            :model-value="null"
            placeholder="Disabled upload"
            disabled
          />
          <PuFileUpload
            :model-value="panelValue"
            readonly
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

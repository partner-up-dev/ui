<!-- @pu-story-covers PuSnackbarHost -->

<script setup lang="ts">
import { ref } from "vue";
import PuButton from "../../components/puButton/puButton.vue";
import PuSnackbar from "../../components/puSnackbar/puSnackbar.vue";
import PuSnackbarHost from "../../components/puSnackbar/puSnackbarHost.vue";
import type { PuSnackbarItem } from "../../components/puSnackbar/puSnackbarHost";

const controlledOpen = ref(true);
const snackbars = ref<PuSnackbarItem[]>([
  {
    id: 1,
    message: "Event draft saved",
    actionLabel: "Undo",
    dismissible: true,
    duration: 0,
  },
]);
let snackbarId = 2;

function addSnackbar(tone: PuSnackbarItem["tone"] = "neutral"): void {
  snackbars.value = [
    ...snackbars.value,
    {
      id: snackbarId,
      message:
        tone === "neutral"
          ? `Changes saved (${snackbarId})`
          : `${tone} notification queued`,
      tone,
      actionLabel: tone === "neutral" ? "Undo" : undefined,
      dismissible: true,
      duration: 5000,
    },
  ];
  snackbarId += 1;
}
</script>

<template>
  <Story title="PuSnackbar" group="overlay">
    <Variant title="Basic">
      <div class="pu-story pu-story__stack">
        <PuSnackbar
          message="Event draft saved"
          action-label="Undo"
          dismissible
          :duration="0"
        />
      </div>
    </Variant>

    <Variant title="Controlled">
      <div class="pu-story pu-story__stack">
        <PuButton @click="controlledOpen = true">Show snackbar</PuButton>
        <PuSnackbar
          :open="controlledOpen"
          message="Invite copied to clipboard"
          action-label="View"
          dismissible
          :duration="0"
          @update:open="controlledOpen = $event"
        />
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="pu-story pu-story__stack">
        <PuSnackbar tone="info" message="Sync will continue in the background." :duration="0" />
        <PuSnackbar tone="success" message="Payment method updated." :duration="0" />
        <PuSnackbar tone="warning" message="This seat is almost full." :duration="0" />
        <PuSnackbar tone="error" message="The upload failed." action-label="Retry" :duration="0" />
      </div>
    </Variant>

    <Variant title="Host Queue">
      <div class="pu-story pu-story__stack pu-snackbar-story__host-frame">
        <div class="pu-story__row">
          <PuButton @click="addSnackbar()">Add snackbar</PuButton>
          <PuButton
            tone="neutral"
            variant="outline"
            @click="addSnackbar('success')"
          >
            Add success
          </PuButton>
          <PuButton tone="danger" @click="addSnackbar('error')">
            Add error
          </PuButton>
        </div>
        <p class="pu-story__text">Queued snackbars: {{ snackbars.length }}</p>
        <PuSnackbarHost
          v-model:items="snackbars"
          position="bottom"
          :max-visible="3"
        />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-snackbar-story__host-frame {
  min-height: 22rem;
}
</style>

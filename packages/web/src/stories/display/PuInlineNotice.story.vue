<script setup lang="ts">
import { ref } from "vue";
import PuButton from "../../components/puButton/puButton.vue";
import PuInlineNotice from "../../components/puInlineNotice/puInlineNotice.vue";

const closedCount = ref(0);

const tones = [
  {
    tone: "info",
    title: "Informational update",
    message: "The event details were refreshed from the latest source.",
  },
  {
    tone: "success",
    title: "Ready to publish",
    message: "All required fields are complete.",
  },
  {
    tone: "warning",
    title: "Capacity is almost full",
    message: "Only two places remain available.",
  },
  {
    tone: "error",
    title: "Publishing failed",
    message: "Please resolve the highlighted fields before trying again.",
  },
] as const;
</script>

<template>
  <Story title="PuInlineNotice" group="display">
    <Variant title="Basic">
      <div class="pu-story">
        <PuInlineNotice
          title="Draft saved"
          message="Changes are stored locally and ready for review."
        />
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="pu-story pu-story__stack">
        <PuInlineNotice
          v-for="item in tones"
          :key="item.tone"
          :tone="item.tone"
          :title="item.title"
          :message="item.message"
        />
      </div>
    </Variant>

    <Variant title="Dismissible">
      <div class="pu-story pu-story__stack">
        <PuInlineNotice
          title="Review requested"
          message="A teammate has asked for changes before publishing."
          tone="warning"
          dismissible
          close-label="Dismiss notice"
          @close="closedCount += 1"
        />
        <p class="pu-story__text">Closed notices: {{ closedCount }}</p>
      </div>
    </Variant>

    <Variant title="Slots And Actions">
      <div class="pu-story">
        <PuInlineNotice tone="error">
          <template #icon>
            <span class="i-mdi-shield-alert-outline" />
          </template>
          <template #title>
            Payment review required
          </template>
          The billing account needs a manual review before this event can accept
          paid reservations.
          <template #actions>
            <PuButton text="Review" theme="SurfaceOutlined" size="xSmall" />
          </template>
        </PuInlineNotice>
      </div>
    </Variant>

    <Variant title="Narrow Container">
      <div class="pu-inline-notice-story__narrow-frame">
        <PuInlineNotice
          tone="warning"
          title="Review blocked"
          message="This notice is embedded in a narrow region while the viewport may still be wide."
          dismissible
          close-label="Dismiss notice"
        >
          <template #actions>
            <PuButton text="Review" theme="SurfaceOutlined" size="xSmall" />
            <PuButton text="Resolve" theme="PrimaryContainer" size="xSmall" />
          </template>
        </PuInlineNotice>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-inline-notice-story__narrow-frame {
  width: min(100%, 24rem);
  border: 1px solid var(--sys-color-outline-variant);
  background: var(--sys-color-surface);
}
</style>

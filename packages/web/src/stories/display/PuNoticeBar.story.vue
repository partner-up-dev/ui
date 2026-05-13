<script setup lang="ts">
import { ref } from "vue";
import PuNoticeBar from "../../components/puNoticeBar/puNoticeBar.vue";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";

const clickCount = ref(0);
const closeCount = ref(0);

const verticalMessages = [
  "Venue confirmed for tonight.",
  "Capacity update: 12 of 20 seats reserved.",
  "Host notes were refreshed.",
];
</script>

<template>
  <Story title="PuNoticeBar" group="display">
    <Variant title="Basic">
      <div class="pu-story">
        <PuNoticeBar
          text="Event details were refreshed from the latest organizer update."
          prefix="information-outline"
          background-color="var(--sys-color-surface-container)"
          color="var(--sys-color-on-surface)"
        />
      </div>
    </Variant>

    <Variant title="Scrollable">
      <div class="pu-story">
        <PuSurfaceCard tone="outline">
          <PuNoticeBar
            text="This longer notice uses horizontal movement when the available width is tight, keeping the bar compact inside dense layouts."
            prefix="bullhorn-outline"
            background-color="var(--sys-color-secondary-container)"
            color="var(--sys-color-on-secondary-container)"
            scrollable
          />
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Vertical">
      <div class="pu-story">
        <PuNoticeBar
          :text="verticalMessages"
          direction="vertical"
          prefix="calendar-clock-outline"
          background-color="var(--sys-color-surface-container-high)"
          color="var(--sys-color-on-surface)"
        />
      </div>
    </Variant>

    <Variant title="Closeable And Clickable">
      <div class="pu-story pu-story__stack">
        <PuNoticeBar
          text="Click the notice to inspect details, or close it after reading."
          prefix="alert-circle-outline"
          background-color="var(--sys-color-error-container)"
          color="var(--sys-color-on-error-container)"
          closeable
          wrapable
          @click="clickCount += 1"
          @close="closeCount += 1"
        />
        <p class="pu-story__text">
          Clicks: {{ clickCount }} · Closed: {{ closeCount }}
        </p>
      </div>
    </Variant>
  </Story>
</template>

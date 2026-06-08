<!-- @pu-story-covers PuSegmented PuSegmentedItem -->

<script setup lang="ts">
import { computed, ref } from "vue";
import { logEvent } from "histoire/client";
import PuSegmented from "../../components/puSegmented/puSegmented.vue";
import PuSegmentedItem from "../../components/puSegmentedItem/puSegmentedItem.vue";
import PuCard from "../../components/puCard/puCard.vue";

const status = ref("all");
const view = ref("overview");
const density = ref("comfortable");
const manualView = ref("table");
const smallRange = ref("day");
const layoutView = ref("list");

const viewPanels = {
  overview: "Overview metrics, recent changes, and priority events.",
  applications: "Applications queue grouped by review state.",
  settings: "Configuration and moderation controls.",
} as const;

const activePanelText = computed(
  () => viewPanels[view.value as keyof typeof viewPanels],
);

function handleChange(value: string | number): void {
  logEvent("change", { value });
}
</script>

<template>
  <Story title="PuSegmented" group="display">
    <Variant title="Radio Control">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuSegmented
            v-model="status"
            aria-label="Application status"
            @change="handleChange"
          >
            <PuSegmentedItem value="all" label="All" />
            <PuSegmentedItem value="review" label="Review" />
            <PuSegmentedItem value="approved" label="Approved" />
            <PuSegmentedItem value="archived" label="Archived" disabled />
          </PuSegmented>

          <p class="pu-story__label">Selected: {{ status }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Page View Tabs">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuSegmented
            v-model="view"
            semantics="tabs"
            tone="primary"
            variant="soft"
            aria-label="Admin view"
            equal-width
            full-width
            @change="handleChange"
          >
            <PuSegmentedItem
              value="overview"
              label="Overview"
              panel-id="segmented-overview-panel"
            />
            <PuSegmentedItem
              value="applications"
              label="Applications"
              panel-id="segmented-applications-panel"
            >
              Applications
              <template #trailing>
                <span class="pu-segmented-story__count">12</span>
              </template>
            </PuSegmentedItem>
            <PuSegmentedItem
              value="settings"
              label="Settings"
              panel-id="segmented-settings-panel"
            />
          </PuSegmented>

          <PuCard
            :id="`segmented-${view}-panel`"
            role="tabpanel"
            tone="neutral"
            variant="outline"
          >
            <p class="pu-story__label">{{ view }}</p>
            <p class="pu-story__text">{{ activePanelText }}</p>
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Icons And Counts">
      <div class="pu-story">
          <PuSegmented v-model="density" aria-label="Density" tone="secondary">
          <PuSegmentedItem value="compact">
            <template #leading>
              <span class="i-mdi-format-align-justify" />
            </template>
            Compact
          </PuSegmentedItem>
          <PuSegmentedItem value="comfortable">
            <template #leading>
              <span class="i-mdi-view-agenda-outline" />
            </template>
            Comfortable
          </PuSegmentedItem>
          <PuSegmentedItem value="spacious">
            Spacious
            <template #trailing>
              <span class="pu-segmented-story__count">New</span>
            </template>
          </PuSegmentedItem>
        </PuSegmented>
      </div>
    </Variant>

    <Variant title="Sizes And Density">
      <div class="pu-story">
        <div class="pu-segmented-story__grid">
          <PuCard tone="neutral" variant="outline">
            <p class="pu-story__label">Small compact</p>
            <PuSegmented
              v-model="smallRange"
              size="sm"
              density="compact"
              aria-label="Small compact range"
            >
              <PuSegmentedItem value="day" label="Day" />
              <PuSegmentedItem value="week" label="Week" />
              <PuSegmentedItem value="month" label="Month" />
            </PuSegmented>
          </PuCard>

          <PuCard tone="neutral" variant="outline">
            <p class="pu-story__label">Large comfortable</p>
            <PuSegmented
              v-model="layoutView"
              size="lg"
              density="comfortable"
              tone="tertiary"
              aria-label="Large comfortable layout"
            >
              <PuSegmentedItem value="list" label="List" />
              <PuSegmentedItem value="board" label="Board" />
              <PuSegmentedItem value="calendar" label="Calendar" />
            </PuSegmented>
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Manual Keyboard Activation">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuSegmented
            v-model="manualView"
            semantics="tabs"
            activation="manual"
            aria-label="Manual activation view"
            full-width
            equal-width
          >
            <PuSegmentedItem value="table" label="Table" panel-id="manual-table" />
            <PuSegmentedItem value="chart" label="Chart" panel-id="manual-chart" />
            <PuSegmentedItem value="timeline" label="Timeline" panel-id="manual-timeline" />
          </PuSegmented>

          <p class="pu-story__label">Selected: {{ manualView }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Vertical Disabled Group">
      <div class="pu-story pu-story--narrow">
        <PuSegmented
          model-value="email"
          orientation="vertical"
          aria-label="Notification channel"
          disabled
          full-width
        >
          <PuSegmentedItem value="email" label="Email" />
          <PuSegmentedItem value="sms" label="SMS" />
          <PuSegmentedItem value="push" label="Push" />
        </PuSegmented>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-segmented-story__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 16px;
}

.pu-segmented-story__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.4em;
  height: 1.4em;
  padding: 0 0.45em;
  border-radius: 999px;
  background: rgb(0 0 0 / 10%);
  color: currentColor;
  font-size: 0.78em;
  font-weight: 600;
  line-height: 1;
}
</style>

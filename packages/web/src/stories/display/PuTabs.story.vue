<!-- @pu-story-covers PuTab -->

<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";
import PuTab from "../../components/puTab/puTab.vue";
import PuTabs from "../../components/puTabs/puTabs.vue";

const currentTab = ref(0);
const compactTab = ref(1);

const overviewTabs = [
  { text: "Overview" },
  { text: "Guests", showDot: true },
  { text: "Messages", showDot: true },
  { text: "Settings" },
];

const compactTabs = [
  { text: "Draft" },
  { text: "Review", showDot: true },
  { text: "Published" },
];

const tabSizes = ["Large", "Medium", "Small"] as const;

function handleChange(index: number): void {
  logEvent("change", { index });
}
</script>

<template>
  <Story title="PuTabs" group="display">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuTabs
            v-model="currentTab"
            :tabs="overviewTabs"
            @change="handleChange"
          />

          <PuSurfaceCard tone="outline">
            <p class="pu-story__label">
              Active: {{ overviewTabs[currentTab]?.text }}
            </p>
            <p class="pu-story__text">
              Tab state is owned by the consumer through modelValue.
            </p>
          </PuSurfaceCard>
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story">
        <div class="pu-tabs-story__sizes">
          <PuSurfaceCard
            v-for="size in tabSizes"
            :key="size"
            tone="outline"
          >
            <p class="pu-story__label">{{ size }}</p>
            <PuTabs
              v-model="compactTab"
              :tabs="compactTabs"
              :size="size"
            />
          </PuSurfaceCard>
        </div>
      </div>
    </Variant>

    <Variant title="Scrollable">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="section">
          <PuTabs
            :model-value="2"
            :tabs="[
              { text: 'Profile' },
              { text: 'Tickets', showDot: true },
              { text: 'Messages' },
              { text: 'Billing' },
              { text: 'Permissions', showDot: true },
              { text: 'Audit log' },
            ]"
            size="Small"
          />
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Standalone Tab">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <div class="pu-tabs-story__standalone">
            <PuTab text="Default" />
            <PuTab text="Medium" size="Medium" />
            <PuTab text="No dot" size="Small" :show-dot="false" />
            <PuTab size="Small">
              <span class="pu-tabs-story__custom-tab">
                Custom
                <span class="pu-story__badge">Slot</span>
              </span>
            </PuTab>
          </div>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-tabs-story__sizes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
  gap: 16px;
}

.pu-tabs-story__standalone {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}

.pu-tabs-story__custom-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>

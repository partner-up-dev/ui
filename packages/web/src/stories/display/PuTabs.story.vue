<!-- @pu-story-covers PuTab -->

<script setup lang="ts">
import { computed, ref } from "vue";
import { logEvent } from "histoire/client";
import type { PuSize } from "../../types";
import PuButton from "../../components/puButton/puButton.vue";
import PuCard from "../../components/puCard/puCard.vue";
import PuTab from "../../components/puTab/puTab.vue";
import PuTabs from "../../components/puTabs/puTabs.vue";
import type {
  PuTabItem,
  PuTabsChangePayload,
  PuTabsVariant,
} from "../../components/puTabs/puTabs";

const currentTab = ref("overview");
const statusTab = ref("review");
const dateTab = ref("saturday");
const scrollTab = ref("permissions");
const keyboardTab = ref("details");

const overviewTabs: PuTabItem[] = [
  { value: "overview", label: "Overview" },
  { value: "guests", label: "Guests", showDot: true },
  { value: "messages", label: "Messages", showDot: true },
  { value: "settings", label: "Settings" },
];

const statusTabs: PuTabItem[] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review", showDot: true },
  { value: "published", label: "Published" },
];

const dateTabs: PuTabItem[] = [
  { value: "thursday", label: "Thu 12", state: "dashed" },
  { value: "friday", label: "Fri 13", state: "dashed" },
  { value: "saturday", label: "Sat 14" },
  { value: "sunday", label: "Sun 15" },
];

const scrollTabs: PuTabItem[] = [
  { value: "profile", label: "Profile" },
  { value: "tickets", label: "Tickets", showDot: true },
  { value: "messages", label: "Messages" },
  { value: "billing", label: "Billing" },
  { value: "permissions", label: "Permissions", showDot: true },
  { value: "audit", label: "Audit log" },
  { value: "integrations", label: "Integrations" },
];

const keyboardTabs: PuTabItem[] = [
  { value: "summary", label: "Summary" },
  { value: "details", label: "Details" },
  { value: "approvals", label: "Approvals", disabled: true },
  { value: "history", label: "History" },
];

const tabSizes: PuSize[] = ["sm", "md", "lg"];
const tabVariants: PuTabsVariant[] = ["line", "pill"];

const activeOverviewLabel = computed(
  () => overviewTabs.find((tab) => tab.value === currentTab.value)?.label,
);
const activeKeyboardLabel = computed(
  () => keyboardTabs.find((tab) => tab.value === keyboardTab.value)?.label,
);

function handleChange(payload: PuTabsChangePayload): void {
  logEvent("change", payload);
}
</script>

<template>
  <Story title="PuTabs" group="display">
    <Variant title="Controlled Value Tabs">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuTabs
            v-model="currentTab"
            :tabs="overviewTabs"
            @change="handleChange"
          />

          <PuCard tone="neutral" variant="outline">
            <p class="pu-story__label">
              Active: {{ activeOverviewLabel }}
            </p>
            <p class="pu-story__text">
              Tab state is owned by the consumer through value-based modelValue.
            </p>
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story">
        <div class="pu-tabs-story__sizes">
          <PuCard
            v-for="size in tabSizes"
            :key="size" tone="neutral" variant="outline"
          >
            <p class="pu-story__label">{{ size }}</p>
            <PuTabs
              v-model="statusTab"
              :tabs="statusTabs"
              :size="size"
            />
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Pill Tab Bar">
      <div class="pu-story pu-story--narrow">
        <PuTabs
          v-model="dateTab"
          :tabs="dateTabs"
          variant="pill"
        >
          <template #append>
            <PuButton size="sm" variant="ghost" tone="neutral">
              Add
            </PuButton>
          </template>
        </PuTabs>
      </div>
    </Variant>

    <Variant title="Scrollable Active Tab">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuTabs
            v-model="scrollTab"
            :tabs="scrollTabs"
            variant="pill"
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Disabled And Keyboard">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuTabs
            v-model="keyboardTab"
            :tabs="keyboardTabs"
            variant="pill"
            @change="handleChange"
          />

          <PuCard tone="neutral" variant="outline">
            <p class="pu-story__label">
              Active: {{ activeKeyboardLabel }}
            </p>
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Standalone Tab Variants">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <div class="pu-tabs-story__standalone">
            <template
              v-for="variant in tabVariants"
              :key="variant"
            >
              <PuTab
                label="Default"
                :variant="variant"
              />
              <PuTab
                label="Active"
                :variant="variant"
                active
              />
              <PuTab
                label="Dashed"
                :variant="variant"
                state="dashed"
              />
              <PuTab
                :variant="variant"
                active
              >
                <span class="pu-tabs-story__custom-tab">
                  Custom
                  <span class="pu-story__badge">Slot</span>
                </span>
              </PuTab>
            </template>
          </div>
        </PuCard>
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

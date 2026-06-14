<script setup lang="ts">
import { computed, ref } from "vue";
import { logEvent } from "histoire/client";
import PuMultiStopToggle from "../../components/puMultiStopToggle/puMultiStopToggle.vue";
import type { PuMultiStopToggleOption } from "../../components/puMultiStopToggle/puMultiStopToggle";

const mode = ref("normal");
const privacy = ref(1);
const compactValue = ref("normal");

const modeOptions: readonly PuMultiStopToggleOption[] = [
  { value: "normal", label: "Normal" },
  { value: "advanced", label: "Advanced" },
  { value: "fuzzy", label: "Fuzzy" },
];

const privacyOptions: readonly PuMultiStopToggleOption[] = [
  { value: 0, label: "Open" },
  { value: 1, label: "Limited" },
  { value: 2, label: "Private" },
  { value: 3, label: "Locked" },
];

const activeModeLabel = computed(
  () => modeOptions.find((option) => option.value === mode.value)?.label ?? "",
);

const activePrivacyLabel = computed(
  () =>
    privacyOptions.find((option) => option.value === privacy.value)?.label ?? "",
);

function handleChange(
  value: string | number,
  option: PuMultiStopToggleOption,
  index: number,
): void {
  logEvent("change", { value, label: option.label, index });
}
</script>

<template>
  <Story title="PuMultiStopToggle" group="forms">
    <Variant title="Three Stops">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <div class="pu-multi-stop-toggle-story__row">
            <span class="pu-story__label">Mode: {{ activeModeLabel }}</span>
            <PuMultiStopToggle
              v-model="mode"
              :options="modeOptions"
              aria-label="Mode"
              @change="handleChange"
            />
          </div>
          <p class="pu-story__text">Value: {{ mode }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Four Stops">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <div class="pu-multi-stop-toggle-story__row">
            <span class="pu-story__label">Privacy: {{ activePrivacyLabel }}</span>
            <PuMultiStopToggle
              v-model="privacy"
              :options="privacyOptions"
              aria-label="Privacy"
              @change="handleChange"
            />
          </div>
          <p class="pu-story__text">Value: {{ privacy }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <div class="pu-multi-stop-toggle-story__row">
            <span class="pu-story__label">Small</span>
            <PuMultiStopToggle
              v-model="compactValue"
              :options="modeOptions"
              aria-label="Small mode"
              size="sm"
              @change="handleChange"
            />
          </div>
          <div class="pu-multi-stop-toggle-story__row">
            <span class="pu-story__label">Medium</span>
            <PuMultiStopToggle
              v-model="compactValue"
              :options="modeOptions"
              aria-label="Medium mode"
              size="md"
              @change="handleChange"
            />
          </div>
          <div class="pu-multi-stop-toggle-story__row">
            <span class="pu-story__label">Large</span>
            <PuMultiStopToggle
              v-model="compactValue"
              :options="modeOptions"
              aria-label="Large mode"
              size="lg"
              @change="handleChange"
            />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-multi-stop-toggle-story__row">
          <span class="pu-story__label">Mode: {{ activeModeLabel }}</span>
          <PuMultiStopToggle
            :model-value="mode"
            :options="modeOptions"
            aria-label="Disabled mode"
            disabled
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-multi-stop-toggle-story__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sys-spacing-small);
}
</style>


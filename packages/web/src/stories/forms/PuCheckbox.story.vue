<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import type { PuSize, PuTone } from "../../types";
import PuCheckbox from "../../components/puCheckbox/puCheckbox.vue";

const accepted = ref(false);
const reminders = ref(true);

const sizes: PuSize[] = ["sm", "md", "lg"];
const tones: PuTone[] = ["neutral", "primary", "secondary", "tertiary", "danger"];

function handleChange(value: boolean): void {
  logEvent("change", value);
}
</script>

<template>
  <Story title="PuCheckbox" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuCheckbox v-model="accepted" @change="handleChange">
            Accept service updates
          </PuCheckbox>
          <p class="pu-story__text">Value: {{ accepted }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuCheckbox
            v-for="size in sizes"
            :key="size"
            :model-value="size === 'md'"
            :size="size"
          >
            {{ size }} checkbox
          </PuCheckbox>
        </div>
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="pu-story">
        <div class="pu-checkbox-story__grid">
          <PuCheckbox
            v-for="tone in tones"
            :key="tone"
            :model-value="true"
            :tone="tone"
          >
            {{ tone }}
          </PuCheckbox>
        </div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuCheckbox :model-value="false" disabled>
            Disabled off (minus)
          </PuCheckbox>
          <PuCheckbox :model-value="true" disabled>
            Disabled on
          </PuCheckbox>
        </div>
      </div>
    </Variant>

    <Variant title="Standalone Icon">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuCheckbox
            v-model="reminders"
            aria-label="Receive reminders"
            tone="secondary"
            @change="handleChange"
          />
          <p class="pu-story__text">Value: {{ reminders }}</p>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-checkbox-story__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr));
  gap: var(--sys-spacing-medium);
}
</style>

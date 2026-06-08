<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCheckbox from "../../components/puCheckbox/puCheckbox.vue";
import PuCard from "../../components/puCard/puCard.vue";

const accepted = ref(false);
const square = ref(true);
const button = ref("yes");

function handleChange(payload: unknown): void {
  logEvent("change", payload);
}
</script>

<template>
  <Story title="PuCheckbox" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuCheckbox v-model="accepted" @change="handleChange">
            Accept reservation terms
          </PuCheckbox>
          <p class="pu-story__text">Value: {{ accepted }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Shapes">
      <div class="pu-story">
        <PuCard tone="neutral" variant="outline">
          <div class="pu-checkbox-story__row">
            <PuCheckbox v-model="accepted" shape="circle">Circle</PuCheckbox>
            <PuCheckbox v-model="square" shape="square">Square</PuCheckbox>
            <PuCheckbox
              v-model="button"
              shape="button"
              true-value="yes"
              false-value="no"
            >
              Button
            </PuCheckbox>
          </div>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Bar">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" gap="none">
          <PuCheckbox
            :model-value="true"
            type="Bar"
            true-value="checked"
            false-value="unchecked"
          >
            Host will verify attendee list
          </PuCheckbox>
          <PuCheckbox
            :model-value="false"
            type="Bar"
            true-value="checked"
            false-value="unchecked"
          >
            Send reminder before start
          </PuCheckbox>
        </PuCard>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <div class="pu-checkbox-story__row">
            <PuCheckbox :model-value="true" disabled>Disabled checked</PuCheckbox>
            <PuCheckbox :model-value="false" disabled>Disabled off</PuCheckbox>
            <PuCheckbox :model-value="true" size="large">Large</PuCheckbox>
          </div>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-checkbox-story__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>

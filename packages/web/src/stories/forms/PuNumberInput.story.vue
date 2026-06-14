<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCard from "../../components/puCard/puCard.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";
import PuNumberInput from "../../components/puNumberInput/puNumberInput.vue";

const participants = ref<number | null>(12);
const price = ref<number | null>(19.5);
const emptyValue = ref<number | null>(null);

function logNumber(event: string, payload: unknown): void {
  logEvent(event, payload);
}
</script>

<template>
  <Story title="PuNumberInput" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFormItem
            label="Participants"
            for-id="pu-number-input-story-participants"
            hint="The model is number | null."
          >
            <PuNumberInput
              id="pu-number-input-story-participants"
              v-model="participants"
              :min="0"
              :max="200"
              :step="1"
              clearable
              @change="logNumber('change', $event)"
              @clear="logNumber('clear', null)"
            />
          </PuFormItem>
          <p class="pu-story__text">Value: {{ participants ?? "null" }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Empty And Decimal">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuFormItem label="Optional offset">
            <PuNumberInput
              v-model="emptyValue"
              placeholder="No value"
              :step="0.5"
              clearable
            />
          </PuFormItem>
          <PuFormItem label="Price">
            <PuNumberInput
              v-model="price"
              :min="0"
              :step="0.01"
              align="end"
            />
          </PuFormItem>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Sizes And Variants">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuNumberInput size="sm" :model-value="4" />
          <PuNumberInput size="md" :model-value="8" variant="line" />
          <PuNumberInput size="lg" :model-value="16" variant="borderless" />
        </PuCard>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <PuFormItem
            label="Required quantity"
            error="Quantity must be greater than zero."
          >
            <PuNumberInput
              :model-value="0"
              invalid
            />
          </PuFormItem>
          <PuNumberInput :model-value="24" readonly />
          <PuNumberInput :model-value="36" disabled />
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>


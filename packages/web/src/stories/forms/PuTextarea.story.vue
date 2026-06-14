<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCard from "../../components/puCard/puCard.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";
import PuTextarea from "../../components/puTextarea/puTextarea.vue";

const description = ref(
  "A relaxed evening walk around West Lake with light conversation.",
);
const autoText = ref("Bring a light jacket.\nMeet near the north entrance.");
const rowsText = ref("Meet at the north gate.\nBring ticket QR codes.");

function logTextareaChange(value: string, event: Event): void {
  logEvent("change", {
    value,
    eventType: event.type,
  });
}
</script>

<template>
  <Story title="PuTextarea" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFormItem label="Description" for-id="pu-textarea-story-description">
            <PuTextarea
              id="pu-textarea-story-description"
              v-model="description"
              placeholder="Describe the event"
              :maxlength="120"
              show-count
            />
          </PuFormItem>
          <p class="pu-story__text">Length: {{ description.length }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuTextarea size="sm" model-value="Caption scale textarea." />
          <PuTextarea size="md" model-value="Control scale textarea." />
          <PuTextarea size="lg" model-value="Body scale textarea." />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Field Variants">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuTextarea variant="outline" model-value="Outline shell" />
          <PuTextarea variant="line" model-value="Line shell" />
          <PuTextarea variant="borderless" model-value="Borderless shell" />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuTextarea
            tone="primary"
            variant="outline"
            model-value="Primary focus border"
          />
          <PuTextarea
            tone="secondary"
            variant="outline"
            model-value="Secondary focus border"
          />
          <PuTextarea
            tone="tertiary"
            variant="outline"
            model-value="Tertiary focus border"
          />
          <PuTextarea
            tone="danger"
            variant="outline"
            model-value="Danger focus border"
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Auto Height">
      <div class="pu-story pu-story--narrow">
        <PuTextarea
          v-model="autoText"
          auto-height
          :maxlength="180"
          show-count
        />
      </div>
    </Variant>

    <Variant title="Rows And Change">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuFormItem label="Brief" for-id="pu-textarea-story-brief">
            <PuTextarea
              id="pu-textarea-story-brief"
              v-model="rowsText"
              rows="3"
              placeholder="Short operational brief"
              @change="logTextareaChange"
            />
          </PuFormItem>
        </PuCard>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <PuFormItem
            label="Operational notes"
            error="Notes need at least 12 characters."
          >
            <PuTextarea
              model-value=""
              placeholder="Required notes"
              invalid
            />
          </PuFormItem>
          <PuTextarea model-value="Readonly notes remain selectable." readonly />
          <PuTextarea model-value="Disabled notes are unavailable." disabled />
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

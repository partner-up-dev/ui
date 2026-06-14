<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCard from "../../components/puCard/puCard.vue";
import PuChipInput from "../../components/puChipInput/puChipInput.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";

const topics = ref(["Community", "Weekend"]);
const draft = ref("");
const skills = ref(["Vue", "Design system"]);
const limited = ref(["Founder", "Mentor"]);
const states = ref(["Published"]);

function logChipInput(event: string, payload: unknown): void {
  logEvent(event, payload);
}
</script>

<template>
  <Story title="PuChipInput" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFormItem
            label="Topics"
            for-id="pu-chip-input-story-topics"
            hint="Press Enter or comma to add a chip."
          >
            <PuChipInput
              id="pu-chip-input-story-topics"
              v-model="topics"
              v-model:draft-value="draft"
              name="topics"
              placeholder="Add topic"
              clearable
              @add="logChipInput('add', $event)"
              @remove="logChipInput('remove', $event)"
              @clear="logChipInput('clear', null)"
            />
          </PuFormItem>
          <p class="pu-story__text">Value: {{ topics.join(", ") || "empty" }}</p>
          <p class="pu-story__text">Draft: {{ draft || "empty" }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Separators And Blur">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuFormItem label="Skills">
            <PuChipInput
              v-model="skills"
              placeholder="Type Vue;Design"
              :separators="[',', ';']"
              add-on-blur
              shape="pill"
            />
          </PuFormItem>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Limit And Variants">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuChipInput
            v-model="limited"
            :max="3"
            placeholder="Only one more"
            size="sm"
          />
          <PuChipInput
            :model-value="['Operations', 'Host']"
            variant="line"
            tone="secondary"
            shape="pill"
          />
          <PuChipInput
            :model-value="['Borderless']"
            variant="borderless"
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <PuFormItem
            label="Required labels"
            error="Add at least two labels."
            required
          >
            <PuChipInput
              :model-value="['Draft']"
              placeholder="Add label"
              invalid
            />
          </PuFormItem>
          <PuChipInput v-model="states" readonly />
          <PuChipInput :model-value="['Locked']" disabled />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Slots">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuChipInput
            :model-value="['Hangzhou', 'Offline']"
            placeholder="Add attribute"
          >
            <template #prefix>
              <span class="i-mdi-tag-outline pu-chip-input-story__icon" />
            </template>
            <template #suffix>
              <span class="pu-story__badge">2 tags</span>
            </template>
          </PuChipInput>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-chip-input-story__icon {
  color: var(--sys-color-on-surface-variant);
  font-size: 1.25em;
  line-height: 1;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCard from "../../components/puCard/puCard.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";
import PuSelect from "../../components/puSelect/puSelect.vue";
import type { PuSelectOption, PuSelectValue } from "../../components/puSelect/puSelect";

const status = ref<PuSelectValue>(null);
const visibility = ref<PuSelectValue>("public");
const priority = ref<PuSelectValue>(2);

const statusOptions: PuSelectOption[] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived", disabled: true },
];

const visibilityOptions: PuSelectOption[] = [
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
  { value: "unlisted", label: "Unlisted" },
];

const priorityOptions: PuSelectOption[] = [
  { value: 1, label: "Low" },
  { value: 2, label: "Normal" },
  { value: 3, label: "High" },
];

function logSelect(event: string, payload: unknown): void {
  logEvent(event, payload);
}
</script>

<template>
  <Story title="PuSelect" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFormItem
            label="Status"
            for-id="pu-select-story-status"
            hint="Placeholder maps to null when clearable."
          >
            <PuSelect
              id="pu-select-story-status"
              v-model="status"
              :options="statusOptions"
              placeholder="Select status"
              clearable
              @change="logSelect('change', $event)"
            />
          </PuFormItem>
          <p class="pu-story__text">Value: {{ status ?? "null" }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Values">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuFormItem label="Visibility">
            <PuSelect
              v-model="visibility"
              :options="visibilityOptions"
            />
          </PuFormItem>
          <PuFormItem label="Priority">
            <PuSelect
              v-model="priority"
              :options="priorityOptions"
            />
          </PuFormItem>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Sizes And Variants">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuSelect
            size="sm"
            :model-value="'draft'"
            :options="statusOptions"
          />
          <PuSelect
            size="md"
            variant="line"
            :model-value="'review'"
            :options="statusOptions"
          />
          <PuSelect
            size="lg"
            variant="borderless"
            :model-value="'published'"
            :options="statusOptions"
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <PuFormItem
            label="Required status"
            error="Status is required."
          >
            <PuSelect
              :model-value="null"
              :options="statusOptions"
              placeholder="Select status"
              invalid
            />
          </PuFormItem>
          <PuSelect
            :model-value="'public'"
            :options="visibilityOptions"
            readonly
          />
          <PuSelect
            :model-value="'private'"
            :options="visibilityOptions"
            disabled
          />
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>


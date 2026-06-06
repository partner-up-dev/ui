<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import PuPicker from "../../components/puPicker/puPicker.vue";
import PuCard from "../../components/puCard/puCard.vue";
import type {
  PickerColumnItem,
  PickerColumns,
  PickerValue,
} from "../../components/puPicker/puPicker";

const city = ref<PickerValue>("hangzhou");
const dateParts = ref<PickerValue>(["may", 12, "19:00"]);
const clearableCity = ref<PickerValue>("shanghai");

const cities: PickerColumnItem[] = [
  { label: "Hangzhou", value: "hangzhou" },
  { label: "Shanghai", value: "shanghai" },
  { label: "Beijing", value: "beijing" },
  { label: "Shenzhen", value: "shenzhen", disabled: true },
];

const dateColumns: PickerColumns = [
  [
    { label: "May", value: "may" },
    { label: "June", value: "june" },
  ],
  [
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "14", value: 14 },
  ],
  [
    { label: "19:00", value: "19:00" },
    { label: "20:00", value: "20:00" },
  ],
];

function handleConfirm(payload: unknown): void {
  logEvent("confirm", payload);
}

function handleChange(payload: unknown): void {
  logEvent("change", payload);
}

function formatDateParts(items: PickerColumnItem | PickerColumnItem[]): string {
  if (Array.isArray(items)) {
    return items.map((item) => item.label).join(" ");
  }
  return items.label;
}
</script>

<template>
  <Story title="PuPicker" group="forms">
    <Variant title="Single Column">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuPicker
            v-model="city"
            :columns="cities"
            label="City"
            placeholder="Select city"
            required
            @confirm="handleConfirm"
            @change="handleChange"
          />
          <p class="pu-story__text">Value: {{ city }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Multiple Columns">
      <div class="pu-story pu-story--narrow">
        <PuPicker
          v-model="dateParts"
          :columns="dateColumns"
          label="Time"
          align-right
          :display-format="formatDateParts"
          @confirm="handleConfirm"
        />
      </div>
    </Variant>

    <Variant title="Clearable And States">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="outline">
          <PuPicker
            v-model="clearableCity"
            :columns="cities"
            label="Clearable"
            clearable
            @clear="logEvent('clear', null)"
          />
          <PuPicker
            model-value=""
            :columns="cities"
            label="Error"
            placeholder="Required"
            error
          />
          <PuPicker
            model-value="hangzhou"
            :columns="cities"
            label="Disabled"
            disabled
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Custom Trigger">
      <div class="pu-story pu-story--narrow">
        <PuPicker
          v-model="city"
          :columns="cities"
          @confirm="handleConfirm"
        >
          <PuButton text="Open city picker" theme="SurfaceOutlined" />
        </PuPicker>
      </div>
    </Variant>
  </Story>
</template>

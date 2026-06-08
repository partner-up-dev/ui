<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuWheelPicker from "../../components/puWheelPicker/puWheelPicker.vue";
import type {
  PuWheelPickerOption,
  PuWheelPickerValue,
  PuWheelPickerTone,
} from "../../components/puWheelPicker/puWheelPicker";

const city = ref<PuWheelPickerValue>("hangzhou");
const compactCity = ref<PuWheelPickerValue>("shanghai");
const toneCity = ref<PuWheelPickerValue>("beijing");

const options: PuWheelPickerOption[] = [
  { label: "Hangzhou", value: "hangzhou" },
  { label: "Shanghai", value: "shanghai" },
  { label: "Beijing", value: "beijing" },
  { label: "Shenzhen", value: "shenzhen", disabled: true },
  { label: "Chengdu", value: "chengdu" },
];

const tones: PuWheelPickerTone[] = [
  "neutral",
  "primary",
  "secondary",
  "tertiary",
];

const variants = ["soft", "outline", "solid", "plain"] as const;

function handleChange(
  value: PuWheelPickerValue,
  option: PuWheelPickerOption,
  index: number,
): void {
  logEvent("change", { value, option, index });
}
</script>

<template>
  <Story title="PuWheelPicker" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuWheelPicker
            v-model="city"
            :options="options"
            aria-label="City"
            @change="handleChange"
          />
          <p class="pu-story__text">Value: {{ city }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Compact">
      <div class="pu-story pu-story--narrow">
        <PuWheelPicker
          v-model="compactCity"
          :options="options"
          aria-label="Compact city"
          :item-height="36"
          :visible-count="3"
          @change="handleChange"
        />
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="pu-story">
        <div class="pu-story__grid">
          <div
            v-for="tone in tones"
            :key="tone"
            class="pu-story__surface"
          >
            <p class="pu-story__label">{{ tone }}</p>
            <PuWheelPicker
              v-model="toneCity"
              :options="options"
              :tone="tone"
              :aria-label="`${tone} city`"
              :visible-count="3"
              @change="handleChange"
            />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Variants">
      <div class="pu-story">
        <div class="pu-story__grid">
          <div
            v-for="variant in variants"
            :key="variant"
            class="pu-story__surface"
          >
            <p class="pu-story__label">{{ variant }}</p>
            <PuWheelPicker
              v-model="toneCity"
              :options="options"
              tone="primary"
              :variant="variant"
              :aria-label="`${variant} city`"
              :visible-count="3"
              @change="handleChange"
            />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Empty">
      <div class="pu-story pu-story--narrow">
        <PuWheelPicker
          :model-value="null"
          :options="[]"
          aria-label="Empty list"
          empty-label="No options"
        />
      </div>
    </Variant>
  </Story>
</template>

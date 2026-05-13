<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCheckbox from "../../components/puCheckbox/puCheckbox.vue";
import PuCheckboxGroup from "../../components/puCheckboxGroup/puCheckboxGroup.vue";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";

const interests = ref<Array<string | number | boolean>>(["walk"]);
const days = ref<Array<string | number | boolean>>(["sat"]);
const buttons = ref<Array<string | number | boolean>>(["public"]);

function handleChange(payload: unknown): void {
  logEvent("change", payload);
}
</script>

<template>
  <Story title="PuCheckboxGroup" group="forms">
    <Variant title="Basic">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuCheckboxGroup v-model="interests" @change="handleChange">
            <PuCheckbox model-value="walk">Walking</PuCheckbox>
            <PuCheckbox model-value="food">Food</PuCheckbox>
            <PuCheckbox model-value="music">Music</PuCheckbox>
          </PuCheckboxGroup>
          <p class="pu-story__text">Value: {{ interests.join(", ") }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Square Limited">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <PuCheckboxGroup
            v-model="days"
            shape="square"
            :min="1"
            :max="2"
            @change="handleChange"
          >
            <PuCheckbox model-value="fri">Friday</PuCheckbox>
            <PuCheckbox model-value="sat">Saturday</PuCheckbox>
            <PuCheckbox model-value="sun">Sunday</PuCheckbox>
          </PuCheckboxGroup>
          <p class="pu-story__text">Choose one or two available days.</p>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Button Inline">
      <div class="pu-story pu-story--narrow">
        <PuCheckboxGroup
          v-model="buttons"
          shape="button"
          inline
          @change="handleChange"
        >
          <PuCheckbox model-value="public">Public</PuCheckbox>
          <PuCheckbox model-value="members">Members</PuCheckbox>
          <PuCheckbox model-value="private">Private</PuCheckbox>
        </PuCheckboxGroup>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="inset-high">
          <PuCheckboxGroup :model-value="['email']" disabled>
            <PuCheckbox model-value="email">Email reminders</PuCheckbox>
            <PuCheckbox model-value="sms">SMS reminders</PuCheckbox>
          </PuCheckboxGroup>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

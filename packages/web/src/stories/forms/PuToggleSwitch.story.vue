<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuToggleSwitch from "../../components/puToggleSwitch/puToggleSwitch.vue";

const enabled = ref(false);
const checked = ref(true);

function handleChange(value: boolean): void {
  logEvent("change", value);
}
</script>

<template>
  <Story title="PuToggleSwitch" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuToggleSwitch
            v-model="enabled"
            label="Receive reminders"
            @change="handleChange"
          />
          <p class="pu-story__text">Value: {{ enabled }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="On State">
      <div class="pu-story pu-story--narrow">
        <PuToggleSwitch
          v-model="checked"
          label="Enabled setting"
          @change="handleChange"
        />
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuToggleSwitch
            :model-value="false"
            label="Caption setting"
            size="sm"
          />
          <PuToggleSwitch
            :model-value="true"
            label="Control setting"
            size="md"
          />
          <PuToggleSwitch
            :model-value="false"
            label="Body setting"
            size="lg"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuToggleSwitch
            :model-value="false"
            label="Disabled off"
            disabled
          />
          <PuToggleSwitch
            :model-value="true"
            label="Disabled on"
            disabled
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCard from "../../components/puCard/puCard.vue";
import PuChipGroup from "../../components/puChipGroup/puChipGroup.vue";
import PuChipInput from "../../components/puChipInput/puChipInput.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";

const location = ref("Hangzhou");
const role = ref("Host");
const stage = ref("Draft");
const invalid = ref("Needs review");

function logChipInput(event: string, payload: unknown): void {
  logEvent(event, payload);
}
</script>

<template>
  <Story title="PuChipInput" group="forms">
    <Variant title="Editable Chip">
      <div class="pu-story">
        <PuFormItem
          label="Editable attribute"
          for-id="pu-chip-input-story-location"
          hint="Enter commits the chip value; Escape restores the value from focus start."
        >
          <PuChipInput
            id="pu-chip-input-story-location"
            v-model="location"
            name="location"
            placeholder="Attribute"
            select-on-focus
            @commit="logChipInput('commit', $event)"
            @cancel="logChipInput('cancel', $event)"
            @remove="logChipInput('remove', $event)"
          />
        </PuFormItem>
        <p class="pu-story__text">Value: {{ location || "empty" }}</p>
      </div>
    </Variant>

    <Variant title="Group Editing">
      <div class="pu-story">
        <PuChipGroup gap="xs">
          <PuChipInput v-model="location" prefix-icon="i-mdi-map-marker" />
          <PuChipInput v-model="role" tone="secondary" variant="outline" />
          <PuChipInput v-model="stage" tone="warning" shape="pill" />
        </PuChipGroup>
      </div>
    </Variant>

    <Variant title="Commit On Blur">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuChipInput
            v-model="role"
            commit-on-blur
            placeholder="Role"
            suffix-icon="i-mdi-pencil"
            @commit="logChipInput('commit-on-blur', $event)"
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story">
        <PuChipGroup gap="sm">
          <PuChipInput v-model="invalid" invalid />
          <PuChipInput model-value="Readonly" readonly />
          <PuChipInput model-value="Locked" disabled />
          <PuChipInput model-value="Fixed" :removable="false" />
        </PuChipGroup>
      </div>
    </Variant>

    <Variant title="Slots">
      <div class="pu-story">
        <PuChipInput v-model="stage" shape="pill" variant="outline">
          <template #prefix>
            <span class="i-mdi-circle-medium" />
          </template>
          <template #suffix>
            <span class="pu-chip-input-story__suffix">editable</span>
          </template>
          <template #remove-icon>
            <span class="i-mdi-close-circle-outline" />
          </template>
        </PuChipInput>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-chip-input-story__suffix {
  font-size: 0.85em;
  opacity: 0.72;
}
</style>

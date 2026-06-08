<!-- @pu-story-covers PuChip PuChipGroup -->

<script setup lang="ts">
import { ref } from "vue";
import PuChip from "../../components/puChip/puChip.vue";
import PuChipGroup from "../../components/puChipGroup/puChipGroup.vue";

const removed = ref(false);

const tones = [
  "neutral",
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "info",
  "success",
  "warning",
  "error",
] as const;

const variants = ["soft", "outline", "solid", "ghost", "dashed"] as const;
</script>

<template>
  <Story title="PuChip" group="display">
    <Variant title="Basic">
      <div class="pu-story">
        <PuChipGroup>
          <PuChip label="Open" />
          <PuChip label="Matched" tone="primary" selected />
          <PuChip label="Disabled" disabled />
          <PuChip label="With icon" prefix-icon="i-mdi-map-marker" />
        </PuChipGroup>
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="pu-story">
        <PuChipGroup gap="sm">
          <PuChip
            v-for="tone in tones"
            :key="tone"
            :tone="tone"
            :label="tone"
          />
        </PuChipGroup>
      </div>
    </Variant>

    <Variant title="Variants">
      <div class="pu-story">
        <PuChipGroup gap="sm">
          <PuChip
            v-for="variant in variants"
            :key="variant"
            tone="primary"
            :variant="variant"
            :label="variant"
          />
        </PuChipGroup>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story">
        <PuChipGroup align="start">
          <PuChip size="sm" label="Small" />
          <PuChip size="md" label="Medium" />
          <PuChip size="lg" label="Large" />
        </PuChipGroup>
      </div>
    </Variant>

    <Variant title="Group Layout">
      <div class="pu-story pu-story--narrow">
        <PuChipGroup align="center" gap="xs">
          <PuChip tone="secondary" label="Community" />
          <PuChip tone="neutral" label="Hangzhou" />
          <PuChip tone="neutral" variant="outline" label="Weekend" />
          <PuChip tone="success" label="Available" />
          <PuChip tone="warning" label="Limited seats" />
          <PuChip tone="info" label="Verified host" />
        </PuChipGroup>
      </div>
    </Variant>

    <Variant title="Fit To Width">
      <div class="pu-story pu-story--narrow">
        <div class="pu-chip-story__fit-frame">
          <PuChipGroup fit gap="xs">
            <PuChip tone="secondary" label="Community" />
            <PuChip tone="neutral" label="Hangzhou West Lake" />
            <PuChip tone="neutral" variant="outline" label="Weekend evening" />
            <PuChip tone="success" label="Available" />
            <PuChip tone="warning" label="Limited seats" />
            <PuChip tone="info" label="Verified host" />
          </PuChipGroup>
        </div>
      </div>
    </Variant>

    <Variant title="Slots And Actions">
      <div class="pu-story">
        <PuChipGroup>
          <PuChip
            as="button"
            tone="neutral"
            variant="outline"
            selected
            @click="removed = false"
          >
            <template #prefix>
              <span class="i-mdi-check-circle" />
            </template>
            Selected
          </PuChip>

          <PuChip
            v-if="!removed"
            tone="secondary"
            label="Removable"
            removable
            remove-label="Remove chip"
            @remove="removed = true"
          />

          <PuChip v-else tone="neutral" label="Removed" disabled />

          <PuChip tone="primary">
            <template #default>
              Slot label
            </template>
            <template #suffix>
              <span class="i-mdi-star" />
            </template>
          </PuChip>
        </PuChipGroup>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-chip-story__fit-frame {
  width: min(100%, 320px);
  padding: 12px;
  border: 1px dashed var(--sys-color-outline-variant);
  border-radius: var(--sys-radius-medium);
}
</style>

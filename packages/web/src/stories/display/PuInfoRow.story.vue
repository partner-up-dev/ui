<script setup lang="ts">
import PuInfoRow from "../../components/puInfoRow/puInfoRow.vue";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";
import PuTag from "../../components/puTag/puTag.vue";

const facts = [
  ["Time", "May 12, 19:00"],
  ["Location", "West Lake Cultural Plaza"],
  ["Capacity", "12 / 20"],
] as const;
</script>

<template>
  <Story title="PuInfoRow" group="display">
    <Variant title="Basic">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <PuInfoRow
            v-for="[label, value] in facts"
            :key="label"
            :label="label"
            :value="value"
          />
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Stack">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="section" gap="md">
          <PuInfoRow
            layout="stack"
            label="Host notes"
            value="Bring a light jacket and meet near the north entrance ten minutes before the walk starts."
          />
          <PuInfoRow layout="stack" label="Visibility">
            <PuTag text="Members only" theme="SurfaceOutlined" size="Small" rounded />
          </PuInfoRow>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Alignment">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="inset-high">
          <PuInfoRow label="End aligned" value="Default inline value" />
          <PuInfoRow
            align="start"
            label="Start aligned"
            value="Useful when values should read like regular text."
          />
          <PuInfoRow
            :collapse-on-mobile="false"
            label="Fixed inline"
            value="Keeps the row relationship at narrow widths."
          />
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Slots">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <PuInfoRow>
            <template #label>
              <span class="pu-info-row-story__label">Custom label</span>
            </template>
            <span class="pu-info-row-story__value">Slot supplied value</span>
          </PuInfoRow>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-info-row-story__label {
  color: var(--sys-color-primary);
  font-weight: 700;
}

.pu-info-row-story__value {
  color: var(--sys-color-on-surface);
  font-weight: 600;
}
</style>

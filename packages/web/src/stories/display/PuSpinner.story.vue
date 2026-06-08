<script setup lang="ts">
import PuButton from "../../components/puButton/puButton.vue";
import PuSpinner from "../../components/puSpinner/puSpinner.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <Story title="PuSpinner" group="display">
    <Variant title="Sizes">
      <div class="pu-story">
        <div class="pu-spinner-story__sizes">
          <div
            v-for="size in sizes"
            :key="size"
            class="pu-spinner-story__size-item"
          >
            <PuSpinner :size="size" />
            <span class="pu-story__label">{{ size }}</span>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Current Color">
      <div class="pu-story">
        <div class="pu-spinner-story__color-row">
          <span class="pu-spinner-story__color-sample is-default">
            <PuSpinner />
          </span>
          <span class="pu-spinner-story__color-sample is-primary">
            <PuSpinner />
          </span>
          <span class="pu-spinner-story__color-sample is-secondary">
            <PuSpinner />
          </span>
          <span class="pu-spinner-story__color-sample is-muted">
            <PuSpinner />
          </span>
        </div>
      </div>
    </Variant>

    <Variant title="Inline Composition">
      <div class="pu-story">
        <div class="pu-spinner-story__inline-row">
          <PuSpinner size="sm" />
          <span>Refreshing availability</span>
        </div>
      </div>
    </Variant>

    <Variant title="Button Slot">
      <div class="pu-story">
        <PuButton disabled aria-busy="true">
          <template #leading>
            <PuSpinner size="sm" />
          </template>
          Publishing
        </PuButton>
      </div>
    </Variant>

    <Variant title="Accessible Status">
      <div class="pu-story">
        <PuSpinner label="Loading reservations" size="lg" />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-spinner-story__sizes,
.pu-spinner-story__color-row,
.pu-spinner-story__inline-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.pu-spinner-story__size-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.pu-spinner-story__color-sample {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--sys-color-outline-variant);
  border-radius: 8px;
}

.pu-spinner-story__color-sample.is-default {
  color: var(--sys-color-on-surface);
}

.pu-spinner-story__color-sample.is-primary {
  color: var(--sys-color-primary);
}

.pu-spinner-story__color-sample.is-secondary {
  color: var(--sys-color-secondary);
}

.pu-spinner-story__color-sample.is-muted {
  color: var(--sys-color-on-surface-variant);
}

.pu-spinner-story__inline-row {
  color: var(--sys-color-on-surface-variant);
}
</style>

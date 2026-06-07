<script setup lang="ts">
import PuButton from "../../components/puButton/puButton.vue";
import PuChip from "../../components/puChip/puChip.vue";
import PuChipGroup from "../../components/puChipGroup/puChipGroup.vue";
import PuEmptyState from "../../components/puEmptyState/puEmptyState.vue";
</script>

<template>
  <Story title="PuEmptyState" group="display">
    <Variant title="Basic">
      <div class="pu-story">
        <PuEmptyState
          icon="i-mdi-calendar-blank-outline"
          title="No events yet"
          description="Create your first event to start collecting reservations and host notes."
        >
          <template #actions>
            <PuButton text="Create event" theme="PrimaryContainer" />
          </template>
        </PuEmptyState>
      </div>
    </Variant>

    <Variant title="Search Results">
      <div class="pu-story">
        <PuEmptyState
          tone="outline"
          align="start"
          icon="i-mdi-magnify"
          title="No matching members"
          description="Try adjusting the city, interest, or availability filters."
        >
          <template #actions>
            <PuButton text="Clear filters" theme="SurfaceOutlined" />
          </template>
        </PuEmptyState>
      </div>
    </Variant>

    <Variant title="First Run">
      <div class="pu-story">
        <PuEmptyState
          title="Build your organizer profile"
          description="Add details that help members understand what kind of gatherings you host."
          tone="surface"
        >
          <template #icon>
            <span class="i-mdi-account-star-outline" />
          </template>
          <PuChipGroup align="center">
            <PuChip tone="secondary" label="Profile" />
            <PuChip tone="success" label="Trust" />
            <PuChip tone="outline" label="Public page" />
          </PuChipGroup>
          <template #actions>
            <PuButton text="Start setup" theme="PrimaryContainer" />
            <PuButton text="Skip" theme="Plain" />
          </template>
        </PuEmptyState>
      </div>
    </Variant>

    <Variant title="Compact">
      <div class="pu-story pu-story--narrow">
        <PuEmptyState
          compact
          tone="plain"
          icon="i-mdi-inbox-outline"
          title="Nothing to review"
          description="New review requests will appear here."
        />
      </div>
    </Variant>

    <Variant title="Narrow Container">
      <div class="pu-empty-state-story__narrow-frame">
        <PuEmptyState
          tone="outline"
          icon="i-mdi-filter-remove-outline"
          title="No matching results"
          description="This empty state is embedded in a constrained panel while the viewport may still be wide."
        >
          <template #actions>
            <PuButton text="Clear filters" theme="SurfaceOutlined" />
            <PuButton text="Create saved view" theme="PrimaryContainer" />
          </template>
        </PuEmptyState>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-empty-state-story__narrow-frame {
  width: min(100%, 24rem);
  border: 1px solid var(--sys-color-outline-variant);
  background: var(--sys-color-surface);
}
</style>

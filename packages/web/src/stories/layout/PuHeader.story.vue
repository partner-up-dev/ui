<script setup lang="ts">
import PuButton from "../../components/puButton/puButton.vue";
import PuCard from "../../components/puCard/puCard.vue";
import PuChip from "../../components/puChip/puChip.vue";
import PuChipGroup from "../../components/puChipGroup/puChipGroup.vue";
import PuHeader from "../../components/puHeader/puHeader.vue";
</script>

<template>
  <Story title="PuHeader" group="layout">
    <Variant title="Basic">
      <div class="pu-header-story">
        <PuHeader
          title="Review queue"
          subtitle="Use the shared header primitive for neutral title, subtitle, and action structure below the page level."
        >
          <template #actions>
            <PuButton tone="neutral" variant="outline">Preview</PuButton>
            <PuButton>Publish</PuButton>
          </template>
        </PuHeader>
      </div>
    </Variant>

    <Variant title="Leading And Meta">
      <div class="pu-header-story pu-header-story--line">
        <PuHeader
          title="Guest details"
          subtitle="Leading media, inline actions, and a secondary meta row stay within one shared contract."
          title-as="h3"
          variant="line"
        >
          <template #leading>
            <div class="pu-header-story__avatar" aria-hidden="true">LC</div>
          </template>

          <template #actions>
            <PuButton size="sm" tone="neutral" variant="outline">Message</PuButton>
            <PuButton size="sm">Approve</PuButton>
          </template>

          <template #meta>
            <PuChipGroup>
              <PuChip tone="success" label="Verified" />
              <PuChip tone="secondary" label="Organizer" />
              <PuChip tone="neutral" variant="outline" label="Hangzhou" />
            </PuChipGroup>
          </template>
        </PuHeader>
      </div>
    </Variant>

    <Variant title="Card Composition">
      <div class="pu-header-story">
        <PuCard tone="neutral" variant="outline">
          <template #header>
            <PuHeader
              title="Panel summary"
              subtitle="The host surface owns inset while the header primitive only owns internal structure."
              title-as="h3"
              size="sm"
            >
              <template #actions>
                <PuButton size="sm" tone="neutral" variant="ghost">Edit</PuButton>
              </template>
            </PuHeader>
          </template>

          <p class="pu-story__text">
            This keeps card chrome and card padding owned by PuCard while the
            header primitive only owns internal title, action, and meta
            structure.
          </p>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-header-story {
  box-sizing: border-box;
  width: min(100%, 56rem);
  padding: var(--sys-spacing-medium);
  background: var(--sys-color-surface);
}

.pu-header-story--line {
  border: 1px solid var(--sys-color-outline-variant);
}

.pu-header-story__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--sys-radius-small);
  background: var(--sys-color-surface-container-high);
  color: var(--sys-color-on-surface);
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1;
}
</style>

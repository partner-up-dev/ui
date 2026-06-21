<script setup lang="ts">
import { ref } from "vue";
import PuButton from "../../components/puButton/puButton.vue";
import PuChip from "../../components/puChip/puChip.vue";
import PuChipGroup from "../../components/puChipGroup/puChipGroup.vue";
import PuPageHeader from "../../components/puPageHeader/puPageHeader.vue";

const backCount = ref(0);
</script>

<template>
  <Story title="PuPageHeader" group="layout">
    <Variant title="Basic">
      <div class="pu-page-header-story">
        <PuPageHeader
          title="Events"
          subtitle="Manage upcoming gatherings, review capacity, and coordinate hosts."
        />
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-page-header-story pu-page-header-story--stack">
        <PuPageHeader
          size="sm"
          title="Compact event review"
          subtitle="Small headers fit dense surfaces without changing heading level."
          title-as="h2"
        >
          <template #actions>
            <PuButton size="sm" tone="neutral" variant="outline">Preview</PuButton>
            <PuButton size="sm">Publish</PuButton>
          </template>
        </PuPageHeader>

        <PuPageHeader
          title="Member onboarding"
          subtitle="Medium is the default page-level rhythm."
          title-as="h2"
          variant="line"
        >
          <template #actions>
            <PuButton tone="neutral" variant="outline">Save</PuButton>
            <PuButton>Invite</PuButton>
          </template>
        </PuPageHeader>

        <PuPageHeader
          size="lg"
          title="Launch operations"
          subtitle="Large headers give important views more air while keeping the same structure."
          title-as="h2"
        >
          <template #actions>
            <PuButton size="lg">Continue</PuButton>
          </template>
        </PuPageHeader>
      </div>
    </Variant>

    <Variant title="Back And Actions">
      <div class="pu-page-header-story pu-page-header-story--narrow">
        <PuPageHeader
          title="Event review"
          subtitle="Use an explicit back action when the page has a known return target."
          show-back
          back-label="Back to events"
          @back="backCount += 1"
        >
          <template #actions>
            <PuButton size="sm" tone="neutral" variant="outline">Edit</PuButton>
            <PuButton size="sm">Publish</PuButton>
          </template>

          <template #meta>
            Back clicks: {{ backCount }}
          </template>
        </PuPageHeader>
      </div>
    </Variant>

    <Variant title="No Subtitle">
      <div class="pu-page-header-story pu-page-header-story--medium">
        <PuPageHeader
          title="Event review"
          show-back
          back-label="Back to events"
          @back="backCount += 1"
        >
          <template #actions>
            <PuButton size="sm" tone="neutral" variant="outline">Edit</PuButton>
            <PuButton size="sm">Publish</PuButton>
          </template>
        </PuPageHeader>
      </div>
    </Variant>

    <Variant title="Custom Slots">
      <div class="pu-page-header-story pu-page-header-story--medium">
        <PuPageHeader
          title-as="h2"
          show-back
          back-label="Back to queue"
          @back="backCount += 1"
        >
          <template #back-icon>
            <span class="i-mdi-chevron-left" aria-hidden="true" />
          </template>

          <template #title>
            <span class="pu-page-header-story__title-line">
              Host review
              <PuChip size="sm" tone="warning" label="Pending" />
            </span>
          </template>

          <template #subtitle>
            <span>
              Custom copy slots support rich title and subtitle composition
              without changing the two-row header structure.
            </span>
          </template>

          <template #actions>
            <PuButton size="sm" tone="neutral" variant="outline">Reassign</PuButton>
            <PuButton size="sm">Approve</PuButton>
          </template>
        </PuPageHeader>
      </div>
    </Variant>

    <Variant title="Meta Row">
      <div class="pu-page-header-story">
        <PuPageHeader title="Member profile" subtitle="Identity and trust signals.">
          <template #meta>
            <PuChipGroup>
              <PuChip tone="success" label="Verified" />
              <PuChip tone="secondary" label="Organizer" />
              <PuChip tone="neutral" variant="outline" label="Hangzhou" />
            </PuChipGroup>
          </template>
        </PuPageHeader>
      </div>
    </Variant>

    <Variant title="Variants">
      <div class="pu-page-header-story pu-page-header-story--grid">
        <PuPageHeader
          title="Plain"
          subtitle="Default page header without container chrome."
          title-as="h2"
        />

        <PuPageHeader
          variant="line"
          title="Line"
          subtitle="Bottom separator for page sections that need a visible boundary."
          title-as="h2"
        />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-page-header-story {
  box-sizing: border-box;
  width: min(100%, 56rem);
  padding: 24px;
  background: var(--sys-color-surface);
}

.pu-page-header-story--stack {
  display: grid;
  gap: 24px;
}

.pu-page-header-story--narrow {
  width: min(100%, 23rem);
  border: 1px solid var(--sys-color-outline-variant);
}

.pu-page-header-story--medium {
  width: min(100%, 38rem);
  border: 1px solid var(--sys-color-outline-variant);
}

.pu-page-header-story--grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.pu-page-header-story__title-line {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

@media (max-width: 640px) {
  .pu-page-header-story {
    padding: 16px;
  }

  .pu-page-header-story--grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import PuButton from "../../components/puButton/puButton.vue";
import PuChip from "../../components/puChip/puChip.vue";
import PuChipGroup from "../../components/puChipGroup/puChipGroup.vue";
import PuInlineNotice from "../../components/puInlineNotice/puInlineNotice.vue";
import PuPageHeader from "../../components/puPageHeader/puPageHeader.vue";

const backCount = ref(0);
</script>

<template>
  <Story title="PuPageHeader" group="display">
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
          bordered
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

    <Variant title="Action Priority">
      <div class="pu-page-header-story pu-page-header-story--narrow">
        <PuPageHeader
          title="West Lake evening walk with an intentionally long operations title"
          subtitle="Capacity, host assignment, risk checks, and publishing readiness."
          show-back
          back-label="Back to events"
          @back="backCount += 1"
        >
          <template #actions>
            <PuButton size="sm" tone="neutral" variant="outline">Edit</PuButton>
            <PuButton size="sm">Publish</PuButton>
          </template>

          <template #meta>
            Back events: {{ backCount }}
          </template>
        </PuPageHeader>
      </div>
    </Variant>

    <Variant title="Stack Layout">
      <div class="pu-page-header-story pu-page-header-story--narrow">
        <PuPageHeader
          title="Publishing queue"
          subtitle="Use stacked layout when actions should have their own row."
          layout="stack"
          show-back
          back-label="Back to review"
          @back="backCount += 1"
        >
          <template #actions>
            <PuButton tone="neutral" variant="outline">Preview</PuButton>
            <PuButton tone="neutral" variant="ghost">Save draft</PuButton>
            <PuButton>Publish</PuButton>
          </template>
        </PuPageHeader>
      </div>
    </Variant>

    <Variant title="Meta And Body">
      <div class="pu-page-header-story">
        <PuPageHeader title="Member profile" subtitle="Identity and trust signals.">
          <template #meta>
            <PuChipGroup>
              <PuChip tone="success" label="Verified" />
              <PuChip tone="secondary" label="Organizer" />
              <PuChip tone="neutral" variant="outline" label="Hangzhou" />
            </PuChipGroup>
          </template>

          <PuInlineNotice
            tone="info"
            title="Review window"
            message="Profile changes are visible to hosts after approval."
          />
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
          variant="soft"
          title="Soft"
          subtitle="Subtle container treatment for embedded sections."
          title-as="h2"
        />

        <PuPageHeader
          variant="outline"
          title="Outline"
          subtitle="Framed header for bounded content regions."
          title-as="h2"
        />

        <PuPageHeader
          variant="solid"
          title="Solid"
          subtitle="Strongest neutral surface treatment."
          title-as="h2"
          bordered
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

.pu-page-header-story--grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
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

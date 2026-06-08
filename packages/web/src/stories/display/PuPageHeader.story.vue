<script setup lang="ts">
import { ref } from "vue";
import PuButton from "../../components/puButton/puButton.vue";
import PuChip from "../../components/puChip/puChip.vue";
import PuChipGroup from "../../components/puChipGroup/puChipGroup.vue";
import PuPageHeader from "../../components/puPageHeader/puPageHeader.vue";

const backCount = ref(0);
</script>

<template>
  <Story title="PuPageHeader" group="display">
    <Variant title="Basic">
      <div class="pu-story">
        <PuPageHeader
          title="Events"
          subtitle="Manage upcoming gatherings, review capacity, and coordinate hosts."
        />
      </div>
    </Variant>

    <Variant title="Back And Actions">
      <div class="pu-story">
        <PuPageHeader
          title="West Lake evening walk"
          subtitle="Public event detail and operations summary."
          show-back
          back-label="Back to events"
          @back="backCount += 1"
        >
          <template #actions>
            <PuButton tone="neutral" variant="outline">Edit</PuButton>
            <PuButton>Publish</PuButton>
          </template>

          <template #meta>
            Back events: {{ backCount }}
          </template>
        </PuPageHeader>
      </div>
    </Variant>

    <Variant title="Meta">
      <div class="pu-story">
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

    <Variant title="Surface Compact">
      <div class="pu-story">
        <PuPageHeader
          title="Review before publishing"
          subtitle="Compact density inside a surfaced section."
          surface-level="section"
          variant="soft"
          density="compact"
          title-as="h2"
        >
          <template #actions>
            <PuButton tone="neutral" variant="outline" size="sm">Preview</PuButton>
          </template>
        </PuPageHeader>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import PuExpandableCard from "../../components/puExpandableCard/puExpandableCard.vue";
import PuInfoRow from "../../components/puInfoRow/puInfoRow.vue";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";
</script>

<template>
  <Story title="PuExpandableCard" group="display">
    <Variant title="Basic">
      <div class="pu-story pu-story--narrow">
        <PuExpandableCard
          title="Reservation details"
          subtitle="Click to inspect the event facts."
        >
          <div class="pu-expandable-card-story__content">
            <PuInfoRow label="Time" value="May 12, 19:00" />
            <PuInfoRow label="Location" value="West Lake Cultural Plaza" />
          </div>
        </PuExpandableCard>
      </div>
    </Variant>

    <Variant title="Default Expanded">
      <div class="pu-story pu-story--narrow">
        <PuExpandableCard
          title="Host checklist"
          subtitle="Expanded by default for review screens."
          default-expanded
        >
          <div class="pu-expandable-card-story__content">
            <PuInfoRow layout="stack" label="Greeting">
              Welcome attendees and confirm the walking route.
            </PuInfoRow>
            <PuInfoRow layout="stack" label="Capacity">
              Keep two spare seats available for late confirmations.
            </PuInfoRow>
          </div>
        </PuExpandableCard>
      </div>
    </Variant>

    <Variant title="Card Stack">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="section">
          <PuExpandableCard title="Public details" default-expanded>
            <p class="pu-story__text">
              These details are visible on the member-facing event page.
            </p>
          </PuExpandableCard>
          <PuExpandableCard title="Internal notes">
            <p class="pu-story__text">
              Internal notes stay inside the operations workspace.
            </p>
          </PuExpandableCard>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-expandable-card-story__content {
  display: grid;
  gap: 12px;
}
</style>

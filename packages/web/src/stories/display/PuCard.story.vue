<script setup lang="ts">
import { ref } from "vue";
import PuButton from "../../components/puButton/puButton.vue";
import PuCard from "../../components/puCard/puCard.vue";
import PuTag from "../../components/puTag/puTag.vue";

const expanded = ref(true);

const tones = [
  {
    tone: "surface",
    title: "Surface",
    description: "Default card for grouped content.",
  },
  {
    tone: "outline",
    title: "Outline",
    description: "Low-emphasis card on the page background.",
  },
  {
    tone: "primary",
    title: "Primary",
    description: "High-emphasis card for key recommendations.",
  },
  {
    tone: "secondary",
    title: "Secondary",
    description: "Supporting card for secondary context.",
  },
  {
    tone: "tertiary",
    title: "Tertiary",
    description: "Accent card for special categories.",
  },
] as const;
</script>

<template>
  <Story title="PuCard" group="display">
    <Variant title="Regions">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="surface">
          <template #hero>
            <div class="pu-card-story__hero" aria-hidden="true"></div>
          </template>

          <template #header>
            <div class="pu-card-story__header">
              <div>
                <p class="pu-story__label">Weekend plan</p>
                <h3 class="pu-card-story__title">West Lake evening walk</h3>
              </div>
              <PuTag text="Open" theme="SurfaceOutlined" />
            </div>
          </template>

          <p class="pu-story__text">
            A card can combine media, heading content, body copy, and actions
            without prescribing the exact markup inside each region.
          </p>

          <template #footer>
            <PuButton tone="outline" size="sm">Save</PuButton>
            <PuButton size="sm">Review</PuButton>
          </template>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Themes">
      <div class="pu-story">
        <div class="pu-card-story__grid">
          <PuCard
            v-for="item in tones"
            :key="item.tone"
            :tone="item.tone"
          >
            <template #header>
              <h3 class="pu-card-story__title">{{ item.title }}</h3>
            </template>
            <p class="pu-story__text">{{ item.description }}</p>
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Collapsible">
      <div class="pu-story pu-story--narrow">
        <PuCard
          tone="outline"
          collapsible
          title="Public details"
          subtitle="Visible header with collapsible content."
          :default-expanded="false"
        >
          <p class="pu-story__text">
            The card owns its expansion state when expanded is not provided.
          </p>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Controlled Expansion">
      <div class="pu-story pu-story--narrow">
        <PuCard
          v-model:expanded="expanded"
          tone="secondary"
          collapsible
          title="Organizer profile"
          subtitle="Expansion can be controlled by the parent."
        >
          <p class="pu-story__text">
            Parent state can synchronize the card with external controls or
            route state.
          </p>

          <template #footer>
            <PuButton
              tone="outline"
              size="sm"
              @click="expanded = !expanded"
            >
              {{ expanded ? "Collapse" : "Expand" }}
            </PuButton>
          </template>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-card-story__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 16px;
}

.pu-card-story__hero {
  aspect-ratio: 16 / 9;
  background:
    linear-gradient(135deg, rgba(150, 217, 69, 0.88), rgba(76, 158, 153, 0.86)),
    radial-gradient(circle at 24% 24%, rgba(255, 255, 255, 0.75), transparent 28%);
}

.pu-card-story__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.pu-card-story__title {
  margin: 0;
  color: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
}
</style>

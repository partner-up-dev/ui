<script setup lang="ts">
import PuButton from "../../components/puButton/puButton.vue";
import PuCell from "../../components/puCell/puCell.vue";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";

const tones = [
  {
    tone: "section",
    title: "Section",
    description: "Default container for grouped content.",
  },
  {
    tone: "inset-high",
    title: "Inset High",
    description: "Tighter surface for nested or compact areas.",
  },
  {
    tone: "outline",
    title: "Outline",
    description: "Bordered surface on top of the page background.",
  },
] as const;

const gaps = ["none", "xs", "sm", "md", "lg"] as const;
</script>

<template>
  <Story title="PuSurfaceCard" group="display">
    <Variant title="Basic">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard>
          <p class="pu-story__label">Event summary</p>
          <h3 class="pu-surface-card-story__title">West Lake evening walk</h3>
          <p class="pu-story__text">
            A surfaced section keeps related text and actions grouped without
            adding extra layout assumptions.
          </p>
          <div class="pu-story__row">
            <span class="pu-story__badge">12 seats</span>
            <PuButton text="Review" theme="SurfaceOutlined" size="xSmall" />
          </div>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="pu-story">
        <div class="pu-surface-card-story__grid">
          <PuSurfaceCard
            v-for="item in tones"
            :key="item.tone"
            :tone="item.tone"
          >
            <p class="pu-story__label">{{ item.title }}</p>
            <p class="pu-story__text">{{ item.description }}</p>
          </PuSurfaceCard>
        </div>
      </div>
    </Variant>

    <Variant title="Gap Scale">
      <div class="pu-story">
        <div class="pu-surface-card-story__grid">
          <PuSurfaceCard
            v-for="gap in gaps"
            :key="gap"
            tone="outline"
            :gap="gap"
          >
            <p class="pu-story__label">gap: {{ gap }}</p>
            <span class="pu-surface-card-story__block">First item</span>
            <span class="pu-surface-card-story__block">Second item</span>
            <span class="pu-surface-card-story__block">Third item</span>
          </PuSurfaceCard>
        </div>
      </div>
    </Variant>

    <Variant title="Semantic Article">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard as="article" tone="section" gap="md">
          <header class="pu-surface-card-story__header">
            <div>
              <p class="pu-story__label">Organizer profile</p>
              <h3 class="pu-surface-card-story__title">Lina Chen</h3>
            </div>
            <span class="pu-story__badge">Verified</span>
          </header>

          <div class="pu-surface-card-story__cells">
            <PuCell title="City" value="Hangzhou" border />
            <PuCell title="Role" value="Community host" border />
            <PuCell title="Response" value="Usually within a day" />
          </div>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-surface-card-story__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: 16px;
}

.pu-surface-card-story__title {
  margin: 0;
  color: var(--sys-color-on-surface);
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
}

.pu-surface-card-story__block {
  display: block;
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--sys-color-surface);
  color: var(--sys-color-on-surface);
  font-size: 13px;
  line-height: 18px;
}

.pu-surface-card-story__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.pu-surface-card-story__cells {
  overflow: hidden;
  border: 1px solid var(--sys-color-outline-variant);
  border-radius: 8px;
}
</style>

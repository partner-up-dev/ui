<script setup lang="ts">
import PuSkeleton from "../../components/puSkeleton/puSkeleton.vue";

const rows = Array.from({ length: 4 }, (_unused, index) => index);
</script>

<template>
  <Story title="PuSkeleton" group="display">
    <Variant title="Basic Shapes">
      <div class="pu-story">
        <div class="pu-skeleton-story__shapes">
          <PuSkeleton width="72%" />
          <PuSkeleton variant="rect" width="160px" height="48px" />
          <PuSkeleton variant="rounded" width="160px" height="48px" />
          <PuSkeleton variant="circle" width="48px" />
        </div>
      </div>
    </Variant>

    <Variant title="Text Rows">
      <div class="pu-story pu-story--narrow">
        <PuSkeleton
          block
          :rows="4"
          :row-width="['100%', '94%', '78%', '52%']"
        />
      </div>
    </Variant>

    <Variant title="Animations">
      <div class="pu-story">
        <div class="pu-story__grid">
          <div class="pu-story__surface">
            <p class="pu-story__label">Pulse</p>
            <PuSkeleton variant="rounded" height="72px" animation="pulse" />
          </div>

          <div class="pu-story__surface">
            <p class="pu-story__label">Wave</p>
            <PuSkeleton variant="rounded" height="72px" animation="wave" />
          </div>

          <div class="pu-story__surface">
            <p class="pu-story__label">None</p>
            <PuSkeleton variant="rounded" height="72px" animation="none" />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Composed Card">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__surface">
          <PuSkeleton
            variant="rounded"
            height="168px"
            animation="wave"
          />
          <PuSkeleton :rows="3" :row-width="['78%', '100%', '62%']" />
          <div class="pu-skeleton-story__actions">
            <PuSkeleton variant="rounded" width="112px" height="36px" />
            <PuSkeleton variant="rounded" width="84px" height="36px" />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Repeated List">
      <div class="pu-story pu-story--narrow">
        <div class="pu-skeleton-story__list" aria-busy="true">
          <div
            v-for="row in rows"
            :key="row"
            class="pu-skeleton-story__list-row"
          >
            <PuSkeleton variant="circle" width="44px" animation="pulse" />
            <PuSkeleton
              block
              :rows="2"
              :row-width="['82%', '56%']"
              animation="pulse"
            />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Loading Wrapper">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <p class="pu-story__label">Loading</p>
          <PuSkeleton loading :rows="3" block>
            <div class="pu-story__surface">
              <p class="pu-story__label">Organizer profile</p>
              <p class="pu-story__text">
                Host details, trust badges, and availability are ready.
              </p>
            </div>
          </PuSkeleton>

          <p class="pu-story__label">Loaded</p>
          <PuSkeleton :loading="false" :rows="3" block>
            <div class="pu-story__surface">
              <p class="pu-story__label">Organizer profile</p>
              <p class="pu-story__text">
                Host details, trust badges, and availability are ready.
              </p>
            </div>
          </PuSkeleton>
        </div>
      </div>
    </Variant>

    <Variant title="Accessibility">
      <div class="pu-story pu-story--narrow">
        <PuSkeleton
          announce
          loading-text="Loading organizer data"
          :rows="3"
          block
        />
      </div>
    </Variant>

    <Variant title="Reduced Motion Note">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__surface">
          <PuSkeleton variant="rounded" height="96px" animation="wave" />
          <PuSkeleton :rows="2" :row-width="['88%', '66%']" />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-skeleton-story__shapes {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) repeat(3, auto);
  align-items: center;
  gap: 16px;
}

.pu-skeleton-story__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pu-skeleton-story__list {
  display: grid;
  gap: 12px;
}

.pu-skeleton-story__list-row {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--sys-color-outline-variant);
  border-radius: 8px;
}

@media (max-width: 639px) {
  .pu-skeleton-story__shapes {
    grid-template-columns: 1fr;
    justify-items: start;
  }
}
</style>

<script setup lang="ts">
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";
import PuTag from "../../components/puTag/puTag.vue";

const sizes = ["xSmall", "Small", "Medium"] as const;
</script>

<template>
  <Story title="PuTag" group="display">
    <Variant title="Themes">
      <div class="pu-story">
        <PuSurfaceCard tone="section">
          <div class="pu-tag-story__row">
            <PuTag text="Surface" theme="Surface" />
            <PuTag text="Surface outlined" theme="SurfaceOutlined" />
            <PuTag text="Rounded" theme="SurfaceOutlined" rounded />
          </div>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story">
        <PuSurfaceCard tone="outline">
          <div class="pu-tag-story__row">
            <PuTag
              v-for="size in sizes"
              :key="size"
              :text="size"
              :size="size"
              theme="SurfaceOutlined"
              rounded
            />
          </div>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Overflow">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="inset-high">
          <div class="pu-tag-story__constrained">
            <PuTag
              text="Long reservation review label"
              theme="SurfaceOutlined"
              rounded
            />
          </div>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-tag-story__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pu-tag-story__constrained {
  max-width: 180px;
}
</style>

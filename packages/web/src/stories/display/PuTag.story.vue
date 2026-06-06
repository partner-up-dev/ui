<script setup lang="ts">
import PuCard from "../../components/puCard/puCard.vue";
import PuTag from "../../components/puTag/puTag.vue";

const sizes = ["xSmall", "Small", "Medium"] as const;
</script>

<template>
  <Story title="PuTag" group="display">
    <Variant title="Themes">
      <div class="pu-story">
        <PuCard tone="surface">
          <div class="pu-tag-story__row">
            <PuTag text="Surface" theme="Surface" />
            <PuTag text="Surface outlined" theme="SurfaceOutlined" />
            <PuTag text="Rounded" theme="SurfaceOutlined" rounded />
          </div>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story">
        <PuCard tone="outline">
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
        </PuCard>
      </div>
    </Variant>

    <Variant title="Overflow">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="surface" padding="sm">
          <div class="pu-tag-story__constrained">
            <PuTag
              text="Long reservation review label"
              theme="SurfaceOutlined"
              rounded
            />
          </div>
        </PuCard>
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

<script setup lang="ts">
import PuCard from "../../components/puCard/puCard.vue";
import PuTag from "../../components/puTag/puTag.vue";

const sizes = ["xs", "sm", "md"] as const;
</script>

<template>
  <Story title="PuTag" group="display">
    <Variant title="Themes">
      <div class="pu-story">
        <PuCard tone="neutral" variant="soft">
          <div class="pu-tag-story__row">
            <PuTag text="Surface" variant="soft" />
            <PuTag text="Surface outlined" variant="outline" />
            <PuTag text="Rounded" variant="outline" shape="pill" />
          </div>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story">
        <PuCard tone="neutral" variant="outline">
          <div class="pu-tag-story__row">
            <PuTag
              v-for="size in sizes"
              :key="size"
              :text="size"
              :size="size"
              variant="outline"
              shape="pill"
            />
          </div>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Overflow">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <div class="pu-tag-story__constrained">
            <PuTag
              text="Long reservation review label"
              variant="outline"
              shape="pill"
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

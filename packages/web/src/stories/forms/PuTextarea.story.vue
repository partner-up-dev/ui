<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";
import PuTextarea from "../../components/puTextarea/puTextarea.vue";

const description = ref(
  "A relaxed evening walk around West Lake with light conversation.",
);
const autoText = ref("Bring a light jacket.\nMeet near the north entrance.");

function handleLineChange(payload: unknown): void {
  logEvent("linechange", payload);
}
</script>

<template>
  <Story title="PuTextarea" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuTextarea
            v-model="description"
            placeholder="Describe the event"
            :maxlength="120"
            show-count
          />
          <p class="pu-story__text">Length: {{ description.length }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Auto Height">
      <div class="pu-story pu-story--narrow">
        <PuTextarea
          v-model="autoText"
          auto-height
          :height="64"
          :maxlength="180"
          show-count
          @linechange="handleLineChange"
        />
      </div>
    </Variant>

    <Variant title="Themes">
      <div class="pu-story">
        <div class="pu-story__grid">
          <PuSurfaceCard tone="outline">
            <p class="pu-story__label">surface-container</p>
            <PuTextarea
              model-value="Container tone gives the field a filled surface."
              theme="surface-container"
            />
          </PuSurfaceCard>
          <PuSurfaceCard tone="outline">
            <p class="pu-story__label">surface</p>
            <PuTextarea
              model-value="Surface tone reads like an inline field."
              theme="surface"
            />
          </PuSurfaceCard>
        </div>
      </div>
    </Variant>

    <Variant title="Readonly Disabled">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="inset-high">
          <PuTextarea model-value="Readonly notes remain selectable." readonly />
          <PuTextarea model-value="Disabled notes are unavailable." disabled />
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { logEvent } from "histoire/client";
import PuImg from "../../components/puImg/puImg.vue";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";

const venueImage = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#d7eef6" />
        <stop offset="1" stop-color="#f7e6b6" />
      </linearGradient>
      <linearGradient id="lake" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#6096a8" />
        <stop offset="1" stop-color="#8dc3bc" />
      </linearGradient>
    </defs>
    <rect width="640" height="420" fill="url(#sky)" />
    <circle cx="500" cy="96" r="48" fill="#f4b860" />
    <path d="M0 250 C140 210 250 245 360 220 C480 195 555 225 640 198 L640 420 L0 420 Z" fill="url(#lake)" />
    <path d="M48 294 C150 274 230 308 330 285 C438 260 520 288 602 270" fill="none" stroke="#f9f1d6" stroke-width="18" stroke-linecap="round" opacity="0.55" />
    <path d="M88 228 L156 156 L226 228 Z" fill="#375c55" />
    <path d="M178 232 L292 128 L412 232 Z" fill="#416a60" />
    <path d="M364 232 L455 168 L548 232 Z" fill="#53756c" />
    <rect x="92" y="238" width="456" height="30" rx="15" fill="#f8f3df" opacity="0.86" />
  </svg>
`);

const portraitImage = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
    <rect width="320" height="320" fill="#c8ded7" />
    <circle cx="160" cy="122" r="58" fill="#6f7d52" />
    <circle cx="160" cy="126" r="44" fill="#f1c8a9" />
    <path d="M84 300 C96 224 122 190 160 190 C198 190 224 224 236 300 Z" fill="#314f58" />
    <path d="M112 78 C126 44 194 44 208 78 C218 102 194 118 160 118 C126 118 102 102 112 78 Z" fill="#2f3f37" />
  </svg>
`);

const sizes = ["xSmall", "small", "medium", "large", "xLarge"] as const;
const radii = ["none", "xSmall", "small", "medium", "large", "full"] as const;
const modes = ["aspectFill", "aspectFit", "scaleToFill", "center"] as const;

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
</script>

<template>
  <Story title="PuImg" group="display">
    <Variant title="Basic">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <PuImg
            :src="venueImage"
            width="100%"
            height="220px"
            radius="medium"
            :lazy-load="false"
            @load="logEvent('load', 'venue')"
            @error="logEvent('error', 'venue')"
          />
          <p class="pu-story__text">
            Explicit width and height keep the media frame stable.
          </p>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Preset Sizes">
      <div class="pu-story">
        <div class="pu-img-story__sizes">
          <div
            v-for="size in sizes"
            :key="size"
            class="pu-img-story__size-item"
          >
            <PuImg
              :src="portraitImage"
              :size="size"
              radius="full"
              :lazy-load="false"
            />
            <span class="pu-story__label">{{ size }}</span>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Radius">
      <div class="pu-story">
        <div class="pu-story__grid">
          <PuSurfaceCard
            v-for="radius in radii"
            :key="radius"
            tone="outline"
          >
            <PuImg
              :src="venueImage"
              width="100%"
              height="120px"
              :radius="radius"
              :lazy-load="false"
            />
            <p class="pu-story__label">{{ radius }}</p>
          </PuSurfaceCard>
        </div>
      </div>
    </Variant>

    <Variant title="Fit Modes">
      <div class="pu-story">
        <div class="pu-story__grid">
          <PuSurfaceCard
            v-for="mode in modes"
            :key="mode"
            tone="section"
          >
            <PuImg
              :src="venueImage"
              width="100%"
              height="112px"
              :mode="mode"
              radius="small"
              :lazy-load="false"
            />
            <p class="pu-story__label">{{ mode }}</p>
          </PuSurfaceCard>
        </div>
      </div>
    </Variant>

    <Variant title="Error Slot">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <PuImg
            src="/missing-story-image.jpg"
            width="100%"
            height="180px"
            radius="medium"
            :lazy-load="false"
            @error="logEvent('error', 'custom')"
          >
            <template #error>
              <div class="pu-img-story__error">
                <span class="i-mdi-image-off-outline" aria-hidden="true" />
                <span>Image unavailable</span>
              </div>
            </template>
          </PuImg>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-img-story__sizes {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 18px;
}

.pu-img-story__size-item {
  display: grid;
  justify-items: center;
  gap: 8px;
}

.pu-img-story__error {
  display: grid;
  justify-items: center;
  gap: 8px;
  color: var(--sys-color-on-surface-variant);
  font-size: 14px;
  line-height: 20px;
}

.pu-img-story__error .i-mdi-image-off-outline {
  font-size: 28px;
}
</style>

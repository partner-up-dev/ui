<script setup lang="ts">
import { logEvent } from "histoire/client";
import PuScrollView from "../../components/puScrollView/puScrollView.vue";
import type { EdgeFadePosition } from "../../components/puScrollView/puScrollView";

const updates = Array.from({ length: 12 }, (_unused, index) => ({
  id: index + 1,
  title: `Timeline update ${index + 1}`,
  detail:
    index % 3 === 0
      ? "Capacity, host notes, and location details were refreshed."
      : "Review the current plan before publishing.",
}));

const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Next Mon",
  "Next Tue",
  "Next Wed",
];

const fadePositions: EdgeFadePosition[] = ["start", "end", "both", "auto"];

function handleScroll(event: Event): void {
  const target = event.target as HTMLElement;

  logEvent("scroll", {
    scrollLeft: Math.round(target.scrollLeft),
    scrollTop: Math.round(target.scrollTop),
  });
}
</script>

<template>
  <Story title="PuScrollView" group="layout">
    <Variant title="Vertical">
      <div class="pu-story pu-story--narrow">
        <PuScrollView
          custom-style="height: 220px; --background: var(--sys-color-surface);"
          edge-fade="end"
        >
          <div class="pu-scroll-view-story__list">
            <article
              v-for="item in updates"
              :key="item.id"
              class="pu-scroll-view-story__item"
            >
              <span class="pu-story__badge">#{{ item.id }}</span>
              <div>
                <h3 class="pu-scroll-view-story__title">{{ item.title }}</h3>
                <p class="pu-story__text">{{ item.detail }}</p>
              </div>
            </article>
          </div>
        </PuScrollView>
      </div>
    </Variant>

    <Variant title="Horizontal">
      <div class="pu-story">
        <PuScrollView
          direction="x"
          custom-style="max-width: 520px; --background: var(--sys-color-surface);"
          edge-fade="both"
        >
          <div class="pu-scroll-view-story__rail">
            <button
              v-for="day in days"
              :key="day"
              class="pu-scroll-view-story__day"
              type="button"
            >
              <span class="pu-story__label">{{ day }}</span>
              <strong>{{ day.length + 6 }}</strong>
              <span>open spots</span>
            </button>
          </div>
        </PuScrollView>
      </div>
    </Variant>

    <Variant title="Edge Fade">
      <div class="pu-story">
        <div class="pu-story__grid">
          <div
            v-for="position in fadePositions"
            :key="position"
            class="pu-story__surface"
          >
            <p class="pu-story__label">{{ position }}</p>
            <PuScrollView
              custom-style="height: 144px; --background: var(--sys-color-surface);"
              :edge-fade="position"
            >
              <div class="pu-scroll-view-story__compact-list">
                <span
                  v-for="item in updates.slice(0, 8)"
                  :key="`${position}-${item.id}`"
                >
                  {{ item.title }}
                </span>
              </div>
            </PuScrollView>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Scroll Event">
      <div class="pu-story pu-story--narrow">
        <PuScrollView
          custom-style="height: 180px; --background: var(--sys-color-surface);"
          edge-fade="auto"
          @scroll="handleScroll"
        >
          <div class="pu-scroll-view-story__list">
            <article
              v-for="item in updates"
              :key="`event-${item.id}`"
              class="pu-scroll-view-story__item"
            >
              <span class="pu-story__badge">Log</span>
              <div>
                <h3 class="pu-scroll-view-story__title">{{ item.title }}</h3>
                <p class="pu-story__text">
                  Scroll this region to emit the native scroll event.
                </p>
              </div>
            </article>
          </div>
        </PuScrollView>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-scroll-view-story__list,
.pu-scroll-view-story__compact-list {
  display: grid;
  gap: 10px;
}

.pu-scroll-view-story__item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--sys-color-outline-variant);
  border-radius: 8px;
  background: var(--sys-color-surface);
}

.pu-scroll-view-story__title {
  margin: 0 0 4px;
  color: var(--sys-color-on-surface);
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
}

.pu-scroll-view-story__rail {
  display: flex;
  width: max-content;
  gap: 12px;
  padding: 2px;
}

.pu-scroll-view-story__day {
  display: grid;
  min-width: 132px;
  gap: 6px;
  padding: 14px;
  border: 1px solid var(--sys-color-outline-variant);
  border-radius: 8px;
  background: var(--sys-color-surface-container);
  color: var(--sys-color-on-surface);
  text-align: left;
}

.pu-scroll-view-story__day strong {
  font-size: 24px;
  line-height: 28px;
}

.pu-scroll-view-story__day span:last-child {
  color: var(--sys-color-on-surface-variant);
  font-size: 13px;
  line-height: 18px;
}

.pu-scroll-view-story__compact-list span {
  padding: 10px 12px;
  border: 1px solid var(--sys-color-outline-variant);
  border-radius: 8px;
  background: var(--sys-color-surface-container-low);
  color: var(--sys-color-on-surface);
  font-size: 14px;
  line-height: 20px;
}
</style>

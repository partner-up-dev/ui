<script setup lang="ts">
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import type {
  PuButtonFeedback,
  PuButtonSize,
  PuButtonTone,
  PuButtonVariant,
} from "../../components/puButton/puButton";

const tones: PuButtonTone[] = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "danger",
];

const variants: PuButtonVariant[] = ["solid", "soft", "outline", "ghost", "dashed"];
const sizes: PuButtonSize[] = ["xs", "sm", "md", "lg"];
const feedbackStates: PuButtonFeedback[] = ["idle", "pending", "success", "error"];

function handleClick(event: MouseEvent): void {
  logEvent("click", event);
}
</script>

<template>
  <Story title="PuButton" group="actions">
    <Variant title="Tones">
      <div class="pu-story">
        <div class="pu-story__grid">
          <div
            v-for="tone in tones"
            :key="tone"
            class="pu-story__surface"
          >
            <p class="pu-story__label">{{ tone }}</p>
            <PuButton
              :tone="tone"
              @click="handleClick"
            >
              {{ tone }}
            </PuButton>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Variants">
      <div class="pu-story">
        <div class="pu-story__grid">
          <div
            v-for="variant in variants"
            :key="variant"
            class="pu-story__surface"
          >
            <p class="pu-story__label">{{ variant }}</p>
            <PuButton
              tone="primary"
              :variant="variant"
              @click="handleClick"
            >
              {{ variant }}
            </PuButton>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Shapes And Sizes">
      <div class="pu-story pu-story__stack">
        <div class="pu-story__surface pu-button-story__size-group">
          <p class="pu-story__label">Rect</p>
          <div class="pu-button-story__sample-grid">
            <div
              v-for="size in sizes"
              :key="`rect-${size}`"
              class="pu-button-story__sample"
            >
              <p class="pu-button-story__size-note">{{ size }}</p>
              <PuButton
                :size="size"
                @click="handleClick"
              >
                Action
              </PuButton>
            </div>
          </div>
        </div>

        <div class="pu-story__surface pu-button-story__size-group">
          <p class="pu-story__label">Pill</p>
          <div class="pu-button-story__sample-grid">
            <div
              v-for="size in sizes"
              :key="`pill-${size}`"
              class="pu-button-story__sample"
            >
              <p class="pu-button-story__size-note">{{ size }}</p>
              <PuButton
                shape="pill"
                variant="outline"
                :size="size"
                @click="handleClick"
              >
                Action
              </PuButton>
            </div>
          </div>
        </div>

        <div class="pu-story__surface pu-button-story__size-group">
          <p class="pu-story__label">Circle</p>
          <div class="pu-button-story__sample-grid">
            <div
              v-for="size in sizes"
              :key="`circle-${size}`"
              class="pu-button-story__sample pu-button-story__sample--center"
            >
              <p class="pu-button-story__size-note">{{ size }}</p>
              <PuButton
                :size="size"
                shape="circle"
                variant="ghost"
                :aria-label="`Circle icon ${size}`"
                @click="handleClick"
              >
                <template #leading>
                  <span class="i-mdi-star-outline"></span>
                </template>
              </PuButton>
            </div>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Action Targets">
      <div class="pu-story">
        <div class="pu-story__row">
          <PuButton @click="handleClick">
            Native button
          </PuButton>

          <PuButton
            :action="{ native: 'submit' }"
            tone="secondary"
            variant="outline"
            @click="handleClick"
          >
            Native submit
          </PuButton>

          <PuButton
            :action="{ href: 'https://partner-up.dev', external: true }"
            tone="neutral"
            variant="outline"
            @click="handleClick"
          >
            External link
          </PuButton>

          <PuButton
            :action="{ href: 'https://partner-up.dev' }"
            disabled
            tone="neutral"
            variant="soft"
            @click="handleClick"
          >
            Disabled link
          </PuButton>
        </div>
      </div>
    </Variant>

    <Variant title="Slots And Block">
      <div class="pu-story">
        <div class="pu-story__row">
          <PuButton
            shape="pill"
            @click="handleClick"
          >
            <template #leading>
              <span class="i-mdi-plus"></span>
            </template>
            Add item
          </PuButton>

          <PuButton
            tone="neutral"
            variant="soft"
            @click="handleClick"
          >
            Continue
            <template #trailing>
              <span class="i-mdi-chevron-right"></span>
            </template>
          </PuButton>

          <PuButton
            aria-label="Search"
            shape="circle"
            tone="neutral"
            variant="ghost"
            @click="handleClick"
          >
            <template #leading>
              <span class="i-mdi-magnify"></span>
            </template>
          </PuButton>
        </div>

        <PuButton
          block
          tone="primary"
          @click="handleClick"
        >
          Full width action
        </PuButton>
      </div>
    </Variant>

    <Variant title="Feedback">
      <div class="pu-story">
        <div class="pu-story__row">
          <PuButton
            v-for="state in feedbackStates"
            :key="state"
            :feedback="state"
            :variant="state === 'idle' ? 'outline' : 'solid'"
            @click="handleClick"
          >
            {{ state }}
          </PuButton>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-button-story__size-group {
  align-items: start;
}

.pu-button-story__sample-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
  gap: 12px;
  align-items: end;
}

.pu-button-story__sample {
  display: grid;
  justify-items: start;
  gap: 8px;
}

.pu-button-story__sample--center {
  justify-items: center;
}

.pu-button-story__size-note {
  margin: 0;
  color: var(--sys-color-on-surface-variant);
  font-size: 12px;
  line-height: 16px;
  text-transform: lowercase;
}
</style>

<script setup lang="ts">
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import type {
  PuButtonFeedback,
  PuButtonSize,
  PuButtonTone,
} from "../../components/puButton/puButton";

const tones: PuButtonTone[] = [
  "primary",
  "primary-outline",
  "secondary",
  "outline",
  "surface",
  "tertiary",
  "dashed",
  "danger",
  "ghost",
];

const sizes: PuButtonSize[] = ["sm", "md", "lg"];
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

    <Variant title="Shapes And Sizes">
      <div class="pu-story">
        <div class="pu-story__row">
          <PuButton
            v-for="size in sizes"
            :key="`rect-${size}`"
            :size="size"
            @click="handleClick"
          >
            Rect {{ size }}
          </PuButton>
        </div>

        <div class="pu-story__row">
          <PuButton
            v-for="size in sizes"
            :key="`pill-${size}`"
            shape="pill"
            tone="outline"
            :size="size"
            @click="handleClick"
          >
            Pill {{ size }}
          </PuButton>
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
            @click="handleClick"
          >
            Native submit
          </PuButton>

          <PuButton
            :action="{ href: 'https://partner-up.dev', external: true }"
            tone="outline"
            @click="handleClick"
          >
            External link
          </PuButton>

          <PuButton
            :action="{ href: 'https://partner-up.dev' }"
            disabled
            tone="surface"
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
            tone="surface"
            @click="handleClick"
          >
            Continue
            <template #trailing>
              <span class="i-mdi-chevron-right"></span>
            </template>
          </PuButton>

          <PuButton
            aria-label="Search"
            shape="pill"
            tone="ghost"
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
            :tone="state === 'idle' ? 'outline' : 'primary'"
            @click="handleClick"
          >
            {{ state }}
          </PuButton>
        </div>
      </div>
    </Variant>
  </Story>
</template>

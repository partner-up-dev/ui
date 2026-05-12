<script setup lang="ts">
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import type {
  ButtonSize,
  ButtonTheme,
} from "../../components/puButton/puButton";

const themes: ButtonTheme[] = [
  "Primary",
  "PrimaryContainer",
  "Tertiary",
  "Surface",
  "SurfaceOutlined",
  "Plain",
];

const sizes: ButtonSize[] = ["xSmall", "Small", "Medium", "Large"];

function handleClick(event: unknown): void {
  logEvent("click", event);
}
</script>

<template>
  <Story title="PuButton" group="actions">
    <Variant title="Themes">
      <div class="pu-story">
        <div class="pu-story__grid">
          <div
            v-for="theme in themes"
            :key="theme"
            class="pu-story__surface"
          >
            <p class="pu-story__label">{{ theme }}</p>
            <PuButton
              :text="theme"
              :theme="theme"
              @click="handleClick"
            />
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story">
        <div class="pu-story__row">
          <PuButton
            v-for="size in sizes"
            :key="size"
            text="Button"
            :size="size"
            @click="handleClick"
          />
        </div>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story">
        <div class="pu-story__row">
          <PuButton text="Default" @click="handleClick" />
          <PuButton text="Disabled" disabled @click="handleClick" />
          <PuButton text="Loading" loading @click="handleClick" />
          <PuButton text="Active" active @click="handleClick" />
          <PuButton text="Rounded" rounded @click="handleClick" />
        </div>
      </div>
    </Variant>

    <Variant title="Icons">
      <div class="pu-story">
        <div class="pu-story__row">
          <PuButton
            text="Add"
            prefix-icon="i-mdi-plus"
            @click="handleClick"
          />
          <PuButton
            text="Next"
            suffix-icon="i-mdi-chevron-right"
            theme="Surface"
            @click="handleClick"
          />
          <PuButton
            type="OnlyIcon"
            prefix-icon="i-mdi-bell-outline"
            rounded
            aria-label="Notifications"
            @click="handleClick"
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import type { PuSize, PuTone } from "../../types";
import PuRadio from "../../components/puRadio/puRadio.vue";

const contactMethod = ref<"email" | "sms">("email");
const notificationChannel = ref<"push" | "digest">("push");

const sizes: PuSize[] = ["sm", "md", "lg"];
const tones: PuTone[] = ["neutral", "primary", "secondary", "tertiary", "danger"];

function handleChange(value: string | number | boolean): void {
  logEvent("change", value);
}
</script>

<template>
  <Story title="PuRadio" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuRadio
            v-model="contactMethod"
            name="contact-method"
            value="email"
            @change="handleChange"
          >
            Email
          </PuRadio>
          <PuRadio
            v-model="contactMethod"
            name="contact-method"
            value="sms"
            @change="handleChange"
          >
            SMS
          </PuRadio>
          <p class="pu-story__text">Value: {{ contactMethod }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuRadio
            v-for="size in sizes"
            :key="size"
            :model-value="size"
            :name="`size-${size}`"
            :size="size"
            :value="size"
          >
            {{ size }} radio
          </PuRadio>
        </div>
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="pu-story">
        <div class="pu-radio-story__grid">
          <PuRadio
            v-for="tone in tones"
            :key="tone"
            :model-value="tone"
            :name="`tone-${tone}`"
            :tone="tone"
            :value="tone"
          >
            {{ tone }}
          </PuRadio>
        </div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuRadio
            :model-value="'none'"
            disabled
            name="disabled-radio"
            value="email"
          >
            Disabled off
          </PuRadio>
          <PuRadio
            :model-value="'sms'"
            disabled
            name="disabled-radio"
            value="sms"
          >
            Disabled on
          </PuRadio>
        </div>
      </div>
    </Variant>

    <Variant title="Standalone">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuRadio
            v-model="notificationChannel"
            aria-label="Push notifications"
            name="notification-channel"
            tone="secondary"
            value="push"
            @change="handleChange"
          />
          <PuRadio
            v-model="notificationChannel"
            aria-label="Digest email"
            name="notification-channel"
            tone="secondary"
            value="digest"
            @change="handleChange"
          />
          <p class="pu-story__text">Value: {{ notificationChannel }}</p>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-radio-story__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr));
  gap: var(--sys-spacing-medium);
}
</style>

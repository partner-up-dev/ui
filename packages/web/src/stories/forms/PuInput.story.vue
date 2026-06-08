<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuInput from "../../components/puInput/puInput.vue";
import PuCard from "../../components/puCard/puCard.vue";

const name = ref("Lina Chen");
const search = ref("");
const password = ref("partnerup");
const notesCode = ref("WLK-2026");

function logInput(event: string, payload: unknown): void {
  logEvent(event, payload);
}
</script>

<template>
  <Story title="PuInput" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuInput
            v-model="name"
            label="Name"
            placeholder="Organizer name"
            clearable
            clear-trigger="always"
            @input="logInput('input', $event)"
            @clear="logInput('clear', null)"
          />
          <p class="pu-story__text">Value: {{ name }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Icons And Alignment">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuInput
            v-model="search"
            placeholder="Search members"
            prefix-icon="i-mdi-magnify"
            suffix-icon="i-mdi-tune"
            clearable
            clear-trigger="always"
            @click-prefix-icon="logInput('clickPrefixIcon', null)"
            @click-suffix-icon="logInput('clickSuffixIcon', null)"
          />
          <PuInput
            v-model="notesCode"
            label="Code"
            label-width="5rem"
            align-right
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Password And Count">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuInput
            v-model="password"
            label="Password"
            show-password
            :maxlength="16"
            show-word-limit
          />
          <PuInput
            model-value="Published"
            label="Status"
            readonly
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Validation States">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <PuInput
            model-value=""
            label="Event title"
            placeholder="Required"
            required
            error
            error-message="Event title is required."
          />
          <PuInput
            model-value="Locked field"
            label="Disabled"
            disabled
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Slots">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuInput model-value="Hangzhou" placeholder="City">
            <template #label>
              <span class="pu-input-story__label">Custom city</span>
            </template>
            <template #prefix>
              <span class="i-mdi-map-marker-outline pu-input-story__icon" />
            </template>
            <template #suffix>
              <span class="pu-story__badge">Default</span>
            </template>
          </PuInput>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-input-story__label {
  color: var(--sys-color-primary);
  font-weight: 700;
}

.pu-input-story__icon {
  color: var(--sys-color-on-surface-variant);
  font-size: 20px;
  line-height: 1;
}
</style>

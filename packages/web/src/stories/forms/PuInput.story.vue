<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCard from "../../components/puCard/puCard.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";
import PuInput from "../../components/puInput/puInput.vue";

const name = ref("Lina Chen");
const search = ref("");
const password = ref("partnerup");
const invitationCode = ref("WLK-2026");
const startsAt = ref("2026-06-14T09:30");
const eventDate = ref("2026-06-14");
const suggestedCity = ref("");

function logInput(event: string, payload: unknown): void {
  logEvent(event, payload);
}
</script>

<template>
  <Story title="PuInput" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFormItem label="Name" for-id="pu-input-story-name">
            <PuInput
              id="pu-input-story-name"
              v-model="name"
              placeholder="Organizer name"
              clearable
              clear-trigger="always"
              @clear="logInput('clear', null)"
            />
          </PuFormItem>
          <p class="pu-story__text">Value: {{ name }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuInput size="sm" model-value="Caption scale" />
          <PuInput size="md" model-value="Control scale" />
          <PuInput size="lg" model-value="Body scale" />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Field Variants">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuInput variant="outline" model-value="Outline shell" />
          <PuInput variant="line" model-value="Line shell" />
          <PuInput variant="borderless" model-value="Borderless shell" />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Icons And Alignment">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuInput
            v-model="search"
            native-type="search"
            placeholder="Search members"
            prefix-icon="i-mdi-magnify"
            suffix-icon="i-mdi-tune"
            clearable
            clear-trigger="always"
            @click-prefix-icon="logInput('clickPrefixIcon', $event.type)"
            @click-suffix-icon="logInput('clickSuffixIcon', $event.type)"
          />
          <PuInput
            v-model="invitationCode"
            align="end"
          >
            <template #prefix>
              <span class="pu-input-story__affix">Code</span>
            </template>
          </PuInput>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Native Types">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuFormItem label="Start time" for-id="pu-input-story-starts-at">
            <PuInput
              id="pu-input-story-starts-at"
              v-model="startsAt"
              native-type="datetime-local"
            />
          </PuFormItem>
          <PuFormItem label="Event date" for-id="pu-input-story-event-date">
            <PuInput
              id="pu-input-story-event-date"
              v-model="eventDate"
              native-type="date"
            />
          </PuFormItem>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Datalist">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuFormItem label="City" for-id="pu-input-story-city">
            <PuInput
              id="pu-input-story-city"
              v-model="suggestedCity"
              list="pu-input-story-city-options"
              placeholder="Type or choose a city"
              @change="logInput('change', suggestedCity)"
            />
            <datalist id="pu-input-story-city-options">
              <option value="Hangzhou" />
              <option value="Shanghai" />
              <option value="Shenzhen" />
              <option value="Chengdu" />
            </datalist>
          </PuFormItem>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Password And Count">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuInput
            v-model="password"
            native-type="password"
            show-password
            :maxlength="16"
            show-count
          />
          <PuInput
            model-value="Published"
            readonly
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <PuFormItem
            label="Event title"
            error="Event title is required."
            required
          >
            <PuInput
              model-value=""
              placeholder="Required"
              invalid
            />
          </PuFormItem>
          <PuFormItem label="Disabled">
            <PuInput
              model-value="Locked field"
              disabled
            />
          </PuFormItem>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Slots">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuInput model-value="Hangzhou" placeholder="City">
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
.pu-input-story__affix {
  color: var(--sys-color-on-surface-variant);
}

.pu-input-story__icon {
  color: var(--sys-color-on-surface-variant);
  font-size: 1.25em;
  line-height: 1;
}
</style>

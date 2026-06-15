<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuCard from "../../components/puCard/puCard.vue";
import PuChipsEditor from "../../components/puChipsEditor/puChipsEditor.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";

const topics = ref(["Community", "Weekend"]);
const draft = ref("");
const skills = ref(["Vue", "Design system"]);
const limited = ref(["Founder", "Mentor"]);
const states = ref(["Published"]);

function logChipsEditor(event: string, payload: unknown): void {
  logEvent(event, payload);
}
</script>

<template>
  <Story title="PuChipsEditor" group="forms">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__stack">
          <PuFormItem
            label="Topics"
            for-id="pu-chips-editor-story-topics"
            hint="Press Enter or comma to add a chip."
          >
            <PuChipsEditor
              id="pu-chips-editor-story-topics"
              v-model="topics"
              v-model:draft-value="draft"
              name="topics"
              placeholder="Add topic"
              clearable
              @add="logChipsEditor('add', $event)"
              @remove="logChipsEditor('remove', $event)"
              @clear="logChipsEditor('clear', null)"
            />
          </PuFormItem>
          <p class="pu-story__text">Value: {{ topics.join(", ") || "empty" }}</p>
          <p class="pu-story__text">Draft: {{ draft || "empty" }}</p>
        </div>
      </div>
    </Variant>

    <Variant title="Separators And Blur">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuFormItem label="Skills">
            <PuChipsEditor
              v-model="skills"
              placeholder="Type Vue;Design"
              :separators="[',', ';']"
              add-on-blur
              shape="pill"
            />
          </PuFormItem>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Limit And Variants">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuChipsEditor
            v-model="limited"
            :max="3"
            placeholder="Only one more"
            size="sm"
          />
          <PuChipsEditor
            :model-value="['Operations', 'Host']"
            variant="line"
            tone="secondary"
            shape="pill"
          />
          <PuChipsEditor
            :model-value="['Borderless']"
            variant="borderless"
          />
        </PuCard>
      </div>
    </Variant>

    <Variant title="States">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft" padding="sm">
          <PuFormItem
            label="Required labels"
            error="Add at least two labels."
            required
          >
            <PuChipsEditor
              :model-value="['Draft']"
              placeholder="Add label"
              invalid
            />
          </PuFormItem>
          <PuChipsEditor v-model="states" readonly />
          <PuChipsEditor :model-value="['Locked']" disabled />
        </PuCard>
      </div>
    </Variant>

    <Variant title="Slots">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuChipsEditor
            :model-value="['Hangzhou', 'Offline']"
            placeholder="Add attribute"
          >
            <template #prefix>
              <span class="i-mdi-tag-outline pu-chips-editor-story__icon" />
            </template>
            <template #suffix>
              <span class="pu-story__badge">2 tags</span>
            </template>
          </PuChipsEditor>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-chips-editor-story__icon {
  color: var(--sys-color-on-surface-variant);
  font-size: 1.25em;
  line-height: 1;
}
</style>

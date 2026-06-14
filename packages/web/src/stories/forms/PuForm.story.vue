<!-- @pu-story-covers PuFormItem -->

<script setup lang="ts">
import { reactive, ref } from "vue";
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import PuForm from "../../components/puForm/puForm.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";
import PuInput from "../../components/puInput/puInput.vue";
import PuCard from "../../components/puCard/puCard.vue";
import PuTextarea from "../../components/puTextarea/puTextarea.vue";

type FormExpose = {
  validate: () => Promise<unknown>;
};

const formRef = ref<FormExpose | null>(null);
const subErrorFormRef = ref<FormExpose | null>(null);
const formModel = reactive({
  title: "",
  host: "Lina Chen",
  notes: "",
  plainField: "",
});
const nativeFormModel = reactive({
  title: "West Lake walk",
  owner: "Lina Chen",
});

const schema = {
  async validate() {
    const errors: Record<string, string[]> = {};
    if (!formModel.title.trim()) {
      errors.title = ["Event title is required."];
    }
    if (formModel.notes.trim().length < 12) {
      errors.notes = ["Notes need at least 12 characters."];
    }
    return {
      success: Object.keys(errors).length === 0,
      errors,
    };
  },
};

const subErrorSchema = {
  async validate() {
    return {
      success: false,
      errors: {
        location: ["Location is incomplete."],
        "location.city": ["City is required."],
        "location.address": ["Address is required."],
      },
    };
  },
};

async function submitForm(event: SubmitEvent): Promise<void> {
  const result = await formRef.value?.validate();
  logEvent("submit", {
    eventType: event.type,
    result,
  });
}

async function validateSubErrors(): Promise<void> {
  const result = await subErrorFormRef.value?.validate();
  logEvent("validateSubErrors", result);
}

function submitNativeForm(event: SubmitEvent): void {
  const form = event.currentTarget as HTMLFormElement | null;
  const submitter = event.submitter as HTMLElement | null;

  logEvent("nativeSubmit", {
    eventType: event.type,
    formId: form?.id,
    action: form?.getAttribute("action"),
    method: form?.getAttribute("method"),
    submitterText: submitter?.textContent?.trim(),
  });
}
</script>

<template>
  <Story title="PuForm" group="forms">
    <Variant title="Validation">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <PuForm ref="formRef" :schema="schema" @submit="submitForm">
            <PuFormItem prop="title" label="Title" required>
              <PuInput
                v-model="formModel.title"
                placeholder="Required"
              />
            </PuFormItem>

            <PuFormItem prop="host" label="Host">
              <PuInput
                v-model="formModel.host"
                placeholder="Organizer"
              />
            </PuFormItem>

            <PuFormItem prop="notes">
              <PuTextarea
                v-model="formModel.notes"
                placeholder="Add operational notes"
              />
            </PuFormItem>

            <div class="pu-story__row">
              <p class="pu-story__text">Submit emits before page-level validation runs.</p>
              <PuButton :action="{ native: 'submit' }">Submit</PuButton>
            </div>
          </PuForm>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Sub Errors">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuForm ref="subErrorFormRef" :schema="subErrorSchema">
            <PuFormItem prop="location" label="Location" include-sub>
              <PuInput
                model-value=""
                placeholder="City and address"
              />
            </PuFormItem>
          </PuForm>
          <div class="pu-story__row">
            <p class="pu-story__text">Sub-field errors collapse into one item.</p>
            <PuButton
              tone="neutral"
              variant="outline"
              @click="validateSubErrors"
            >
              Validate
            </PuButton>
          </div>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Native Contract">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <PuForm
            id="pu-form-story-native"
            name="event-editor"
            action="/events"
            method="post"
            autocomplete="on"
            novalidate
            @submit="submitNativeForm"
          >
            <PuFormItem label="Title" for-id="pu-form-story-native-title">
              <PuInput
                id="pu-form-story-native-title"
                v-model="nativeFormModel.title"
                name="title"
                autocomplete="off"
              />
            </PuFormItem>
            <PuFormItem label="Owner" for-id="pu-form-story-native-owner">
              <PuInput
                id="pu-form-story-native-owner"
                v-model="nativeFormModel.owner"
                name="owner"
                autocomplete="name"
              />
            </PuFormItem>
          </PuForm>
          <div class="pu-story__row">
            <PuButton
              :action="{ native: 'submit' }"
              form="pu-form-story-native"
            >
              External submit
            </PuButton>
          </div>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Field Shell">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="soft">
          <div class="pu-story__stack">
            <PuFormItem
              label="Plain control"
              for-id="plain-control"
              hint="Use PuFormItem for labels, hints, and any custom control."
              required
            >
              <input
                id="plain-control"
                v-model="formModel.plainField"
                class="pu-form-story__native-control"
                type="text"
                placeholder="Native input"
              />
            </PuFormItem>

            <PuFormItem
              label="With trailing action"
              hint="The trailing slot stays outside the control region."
            >
              <template #labelTrailing>
                <PuButton
                  size="sm"
                  tone="neutral"
                  variant="ghost"
                >
                  Clear
                </PuButton>
              </template>
              <PuTextarea
                model-value="A custom field shell can wrap package inputs too."
              />
            </PuFormItem>

            <PuFormItem
              label="Manual error"
              error="This error can come from page-local validation."
            >
              <PuInput model-value="" placeholder="Manual error state" invalid />
            </PuFormItem>
          </div>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-form-story__native-control {
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--sys-color-outline-variant);
  border-radius: 8px;
  background: var(--sys-color-surface);
  color: var(--sys-color-on-surface);
  font: inherit;
}

.pu-form-story__native-control:focus-visible {
  border-color: var(--sys-color-primary);
  outline: 2px solid var(--sys-color-primary);
  outline-offset: 2px;
}

</style>

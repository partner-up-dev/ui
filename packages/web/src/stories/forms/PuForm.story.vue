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

async function validateForm(): Promise<void> {
  const result = await formRef.value?.validate();
  logEvent("validate", result);
}

async function validateSubErrors(): Promise<void> {
  const result = await subErrorFormRef.value?.validate();
  logEvent("validateSubErrors", result);
}
</script>

<template>
  <Story title="PuForm" group="forms">
    <Variant title="Validation">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="surface">
          <PuForm ref="formRef" :schema="schema">
            <PuFormItem prop="title">
              <PuInput
                v-model="formModel.title"
                label="Title"
                placeholder="Required"
                required
              />
            </PuFormItem>

            <PuFormItem prop="host">
              <PuInput
                v-model="formModel.host"
                label="Host"
                placeholder="Organizer"
              />
            </PuFormItem>

            <PuFormItem prop="notes">
              <PuTextarea
                v-model="formModel.notes"
                placeholder="Add operational notes"
                :height="72"
              />
            </PuFormItem>
          </PuForm>

          <div class="pu-story__row">
            <p class="pu-story__text">Validation errors appear below fields.</p>
            <PuButton @click="validateForm">Validate</PuButton>
          </div>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Sub Errors">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="outline">
          <PuForm ref="subErrorFormRef" :schema="subErrorSchema">
            <PuFormItem prop="location" include-sub>
              <PuInput
                model-value=""
                label="Location"
                placeholder="City and address"
              />
            </PuFormItem>
          </PuForm>
          <div class="pu-story__row">
            <p class="pu-story__text">Sub-field errors collapse into one item.</p>
            <PuButton
              tone="outline"
              @click="validateSubErrors"
            >
              Validate
            </PuButton>
          </div>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

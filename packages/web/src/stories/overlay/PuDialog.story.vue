<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import PuDialog from "../../components/puDialog/puDialog.vue";
import PuForm from "../../components/puForm/puForm.vue";
import PuFormItem from "../../components/puFormItem/puFormItem.vue";
import PuInput from "../../components/puInput/puInput.vue";
import PuInlineNotice from "../../components/puInlineNotice/puInlineNotice.vue";

const confirmOpen = ref(false);
const customOpen = ref(false);
const formOpen = ref(false);
const loading = ref(false);

function closeConfirm(reason: string): void {
  confirmOpen.value = false;
  logEvent("close", reason);
}

function confirmDanger(): void {
  logEvent("confirm", "delete project");
  confirmOpen.value = false;
}

function closeCustom(reason: string): void {
  customOpen.value = false;
  logEvent("close", reason);
}

function submitForm(): void {
  loading.value = true;
  logEvent("confirm", "invite guest");
  window.setTimeout(() => {
    loading.value = false;
    formOpen.value = false;
  }, 600);
}
</script>

<template>
  <Story title="PuDialog" group="overlay">
    <Variant title="Confirmation">
      <div class="pu-story pu-story--narrow">
        <PuButton @click="confirmOpen = true">
          Open dialog
        </PuButton>
        <PuDialog
          :open="confirmOpen"
          tone="error"
          title="Delete project"
          description="This removes the project and its local draft data. This action cannot be undone."
          confirm-text="Delete"
          cancel-text="Keep project"
          @close="closeConfirm"
          @confirm="confirmDanger"
        >
          <template #icon>
            <span class="i-mdi-alert-circle"></span>
          </template>
        </PuDialog>
      </div>
    </Variant>

    <Variant title="Form Workflow">
      <div class="pu-story pu-story--narrow">
        <PuButton
          tone="surface"
          @click="formOpen = true"
        >
          Invite guest
        </PuButton>
        <PuDialog
          :open="formOpen"
          title="Invite guest"
          description="Send a short invitation with the access details."
          confirm-text="Send invite"
          :confirm-loading="loading"
          @close="formOpen = false"
          @confirm="submitForm"
        >
          <PuForm>
            <PuFormItem label="Guest name">
              <PuInput model-value="Lina Chen" />
            </PuFormItem>
            <PuFormItem label="Email">
              <PuInput model-value="lina@example.com" />
            </PuFormItem>
          </PuForm>
        </PuDialog>
      </div>
    </Variant>

    <Variant title="Custom Slots">
      <div class="pu-story pu-story--narrow">
        <PuButton
          tone="outline"
          @click="customOpen = true"
        >
          Open custom dialog
        </PuButton>
        <PuDialog
          :open="customOpen"
          aria-label="Publish review"
          max-width="600px"
          @close="closeCustom"
        >
          <template #title>
            Publish review
          </template>
          <template #description>
            Review the visibility change before making this guide public.
          </template>
          <PuInlineNotice
            tone="warning"
            title="Audience change"
            message="The guide becomes visible to all workspace members."
          />
          <template #actions>
            <PuButton
              tone="ghost"
              @click="customOpen = false"
            >
              Save draft
            </PuButton>
            <PuButton
              tone="surface"
              @click="customOpen = false"
            >
              Cancel
            </PuButton>
            <PuButton @click="customOpen = false">
              Publish
            </PuButton>
          </template>
        </PuDialog>
      </div>
    </Variant>

    <Variant title="Open State">
      <div class="pu-story pu-story--narrow">
        <PuDialog
          :open="true"
          title="Pinned dialog"
          description="This variant stays open for visual review."
          :close-on-overlay="false"
          :close-on-escape="false"
          :lock-scroll="false"
        >
          <p class="pu-story__text">
            The dialog shell keeps header, content, and footer spacing stable
            while exposing slots for targeted customization.
          </p>
        </PuDialog>
      </div>
    </Variant>
  </Story>
</template>

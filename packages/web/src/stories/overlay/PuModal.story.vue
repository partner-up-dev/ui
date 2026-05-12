<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import PuModal from "../../components/puModal/puModal.vue";

const controlledOpen = ref(false);
const customOpen = ref(false);

function closeControlled(): void {
  controlledOpen.value = false;
  logEvent("close", "controlled");
}

function closeCustom(): void {
  customOpen.value = false;
  logEvent("close", "custom");
}
</script>

<template>
  <Story title="PuModal" group="overlay">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <PuButton text="Open modal" @click="controlledOpen = true" />
        <PuModal
          :open="controlledOpen"
          title="Confirm action"
          @close="closeControlled"
        >
          <p class="pu-story__text">
            This dialog verifies overlay close, escape close, focus trap, and
            body scroll lock behavior.
          </p>
          <div class="pu-story__modal-actions">
            <PuButton
              text="Cancel"
              theme="Surface"
              @click="closeControlled"
            />
            <PuButton text="Confirm" @click="closeControlled" />
          </div>
        </PuModal>
      </div>
    </Variant>

    <Variant title="Open State">
      <div class="pu-story pu-story--narrow">
        <PuModal
          :open="true"
          title="Open modal"
          :close-on-overlay="false"
          :close-on-escape="false"
        >
          <p class="pu-story__text">
            This variant keeps the modal open for visual review.
          </p>
        </PuModal>
      </div>
    </Variant>

    <Variant title="Custom Header">
      <div class="pu-story pu-story--narrow">
        <PuButton
          text="Open custom modal"
          theme="Surface"
          @click="customOpen = true"
        />
        <PuModal
          :open="customOpen"
          aria-label="Custom modal"
          max-width="560px"
          @close="closeCustom"
        >
          <template #header>
            <div class="pu-story__stack">
              <p class="pu-story__label">Custom header</p>
              <h3 style="margin: 0">Structured content</h3>
            </div>
          </template>
          <p class="pu-story__text">
            Header slot content should still provide an accessible label through
            aria-label.
          </p>
        </PuModal>
      </div>
    </Variant>
  </Story>
</template>

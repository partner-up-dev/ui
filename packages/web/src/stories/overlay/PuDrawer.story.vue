<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import PuCell from "../../components/puCell/puCell.vue";
import PuDrawer from "../../components/puDrawer/puDrawer.vue";
import PuCard from "../../components/puCard/puCard.vue";

const controlledVisible = ref(false);
const compactVisible = ref(true);
const customSlotsVisible = ref(false);

function handleClose(name: string): void {
  logEvent("close", name);
}
</script>

<template>
  <Story title="PuDrawer" group="overlay">
    <Variant title="Controlled">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <p class="pu-story__label">Bottom drawer</p>
          <p class="pu-story__text">
            The trigger controls visible state through v-model:visible.
          </p>
          <PuButton @click="controlledVisible = true">
            Open drawer
          </PuButton>
        </PuCard>

        <PuDrawer
          v-model:visible="controlledVisible"
          title="Guest details"
          height="58vh"
          @close="handleClose('controlled')"
        >
          <div class="pu-drawer-story__content">
            <PuCell title="Name" value="Lina Chen" border />
            <PuCell title="Ticket" value="VIP evening walk" border />
            <PuCell title="Arrival" value="19:00" />
            <div class="pu-drawer-story__actions">
              <PuButton
                tone="neutral"
                variant="soft"
                @click="controlledVisible = false"
              >
                Cancel
              </PuButton>
              <PuButton @click="controlledVisible = false">
                Confirm
              </PuButton>
            </div>
          </div>
        </PuDrawer>
      </div>
    </Variant>

    <Variant title="Open State">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <p class="pu-story__label">Pinned for visual review</p>
          <p class="pu-story__text">
            This variant keeps the drawer open while preserving surface
            background behind the overlay.
          </p>
        </PuCard>

        <PuDrawer
          v-model:visible="compactVisible"
          title="Filters"
          height="44vh"
          :lock-scroll="false"
          :close-on-escape="false"
          @close="handleClose('open-state')"
        >
          <div class="pu-drawer-story__content">
            <PuCell title="City" value="Hangzhou" border />
            <PuCell title="Date" value="This week" border />
            <PuCell title="Status" value="Available" />
          </div>
        </PuDrawer>
      </div>
    </Variant>

    <Variant title="Custom Slots">
      <div class="pu-story pu-story--narrow">
        <PuCard tone="neutral" variant="outline">
          <p class="pu-story__label">Composed drawer shell</p>
          <p class="pu-story__text">
            Named slots customize the header and footer while Drawer keeps the
            overlay behavior.
          </p>
          <PuButton
            tone="neutral"
            variant="outline"
            @click="customSlotsVisible = true"
          >
            Open composed drawer
          </PuButton>
        </PuCard>

        <PuDrawer
          v-model:visible="customSlotsVisible"
          aria-label="Event drawer"
          height="52vh"
          max-width="34rem"
          @close="handleClose('custom-slots')"
        >
          <template #header>
            <div class="pu-drawer-story__custom-header">
              <div>
                <p class="pu-story__label">Event summary</p>
                <h3 class="pu-drawer-story__title">
                  West Lake evening walk
                </h3>
              </div>
              <button
                type="button"
                class="pu-drawer-story__icon-button"
                aria-label="Close custom drawer"
                @click="customSlotsVisible = false"
              >
                <span class="i-mdi-close" aria-hidden="true" />
              </button>
            </div>
          </template>

          <p class="pu-story__text">
            Meet guests at the north entrance and keep the first stop clear for
            check-in.
          </p>
          <PuCell title="Host" value="Lina Chen" border />
          <PuCell title="Arrival" value="18:45" />

          <template #footer>
            <div class="pu-drawer-story__footer">
              <PuButton
                tone="neutral"
                variant="soft"
                @click="customSlotsVisible = false"
              >
                Later
              </PuButton>
              <PuButton @click="customSlotsVisible = false">
                Done
              </PuButton>
            </div>
          </template>
        </PuDrawer>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-drawer-story__content {
  display: grid;
  gap: 0;
  padding-bottom: 16px;
}

.pu-drawer-story__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 0;
}

.pu-drawer-story__custom-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid var(--sys-color-outline-variant);
}

.pu-drawer-story__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.pu-drawer-story__title {
  margin: 0;
  color: var(--sys-color-on-surface);
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
}

.pu-drawer-story__icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--sys-color-surface-container-high);
  color: var(--sys-color-on-surface-variant);
  cursor: pointer;
}
</style>

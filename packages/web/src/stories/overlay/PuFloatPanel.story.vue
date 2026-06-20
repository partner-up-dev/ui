<script setup lang="ts">
import { computed, ref } from "vue";
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import PuCell from "../../components/puCell/puCell.vue";
import PuFloatPanel from "../../components/puFloatPanel/puFloatPanel.vue";
import type {
  PuFloatPanelStop,
  PuFloatPanelValue,
} from "../../components/puFloatPanel/puFloatPanel";

const panelValue = ref<PuFloatPanelValue>("middle");
const scrollValue = ref<PuFloatPanelValue>("peek");
const disabledValue = ref<PuFloatPanelValue>("middle");

const panelStops: readonly PuFloatPanelStop[] = [
  { value: "peek", label: "Peek", height: 128 },
  { value: "middle", label: "Middle", height: 260 },
  { value: "full", label: "Full", height: 420 },
];

const compactStops: readonly PuFloatPanelStop[] = [
  { value: "peek", label: "Peek", height: 112 },
  { value: "middle", label: "Middle", height: 240 },
  { value: "full", label: "Full", height: 392 },
];

const activePanelLabel = computed(() => getStopLabel(panelStops, panelValue.value));
const activeScrollLabel = computed(() => getStopLabel(compactStops, scrollValue.value));

function getStopLabel(
  stops: readonly PuFloatPanelStop[],
  value: PuFloatPanelValue,
): string {
  return stops.find((stop) => Object.is(stop.value, value))?.label ?? "";
}

function handleChange(
  value: PuFloatPanelValue,
  stop: PuFloatPanelStop,
  index: number,
): void {
  logEvent("change", { value, label: stop.label, height: stop.height, index });
}
</script>

<template>
  <Story title="PuFloatPanel" group="overlay">
    <Variant title="Height Stops">
      <div class="pu-story pu-story--wide">
        <div class="pu-float-panel-story__frame">
          <div class="pu-float-panel-story__page">
            <p class="pu-story__label">Panel: {{ activePanelLabel }}</p>
            <p class="pu-story__text">
              Drag the handle or use keyboard arrows while the handle is focused.
            </p>
            <div class="pu-story__row">
              <PuButton
                v-for="stop in panelStops"
                :key="stop.value"
                size="sm"
                :variant="Object.is(panelValue, stop.value) ? 'solid' : 'outline'"
                @click="panelValue = stop.value"
              >
                {{ stop.label }}
              </PuButton>
            </div>
          </div>

          <PuFloatPanel
            v-model="panelValue"
            :stops="panelStops"
            aria-label="Demo panel height"
            @change="handleChange"
          >
            <div class="pu-float-panel-story__panel-stack">
              <p class="pu-story__label">Route preview</p>
              <p class="pu-story__text">
                The panel stays attached to the bottom while its height changes.
              </p>
              <PuCell title="Meet point" value="North gate" border />
              <PuCell title="Guests" value="12 confirmed" border />
              <PuCell title="Next step" value="Send reminder" />
            </div>
          </PuFloatPanel>
        </div>
      </div>
    </Variant>

    <Variant title="Scrollable Content">
      <div class="pu-story pu-story--wide">
        <div class="pu-float-panel-story__frame">
          <div class="pu-float-panel-story__page">
            <p class="pu-story__label">Panel: {{ activeScrollLabel }}</p>
            <p class="pu-story__text">
              The body scrolls independently when the selected stop is short.
            </p>
          </div>

          <PuFloatPanel
            v-model="scrollValue"
            :stops="compactStops"
            aria-label="Scrollable panel height"
            @change="handleChange"
          >
            <div class="pu-float-panel-story__panel-stack">
              <PuCell
                v-for="item in 10"
                :key="item"
                :title="`Stop ${item}`"
                :value="item % 2 === 0 ? 'Confirmed' : 'Pending'"
                border
              />
            </div>
          </PuFloatPanel>
        </div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="pu-story pu-story--wide">
        <div class="pu-float-panel-story__frame">
          <div class="pu-float-panel-story__page">
            <p class="pu-story__label">Disabled panel</p>
            <p class="pu-story__text">
              Disabled panels keep their selected height and ignore pointer or
              keyboard movement.
            </p>
          </div>

          <PuFloatPanel
            v-model="disabledValue"
            :stops="panelStops"
            aria-label="Disabled panel height"
            disabled
          >
            <div class="pu-float-panel-story__panel-stack">
              <PuCell title="Status" value="Locked" border />
              <PuCell title="Height" value="Middle stop" />
            </div>
          </PuFloatPanel>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-float-panel-story__frame {
  position: relative;
  min-height: 32rem;
  overflow: hidden;
  border: 1px solid var(--sys-color-outline-variant);
  background: var(--sys-color-surface-container-low);
}

.pu-float-panel-story__page {
  display: grid;
  gap: var(--sys-spacing-small);
  padding: var(--sys-spacing-large);
}

.pu-float-panel-story__panel-stack {
  display: grid;
  gap: var(--sys-spacing-small);
}
</style>

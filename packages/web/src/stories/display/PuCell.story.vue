<script setup lang="ts">
import PuCell from "../../components/puCell/puCell.vue";
</script>

<template>
  <Story title="PuCell" group="display">
    <Variant title="Basic">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__surface">
          <PuCell title="Account" value="PartnerUp" />
          <PuCell title="Status" value="Active" border />
          <PuCell
            title="Details"
            value="Open"
            suffix-icon="i-mdi-chevron-right"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Slots">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__surface">
          <PuCell border>
            <template #title>
              <strong>Custom title</strong>
            </template>
            <span>Slot value</span>
            <template #suffix>
              <span class="i-mdi-open-in-new"></span>
            </template>
          </PuCell>
        </div>
      </div>
    </Variant>

    <Variant title="Long Content">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__surface">
          <PuCell
            title="Long description"
            value="A compact information row with a longer value that should stay readable without breaking the cell layout."
            border
          />
        </div>
      </div>
    </Variant>

    <Variant title="Button Root">
      <div class="pu-story pu-story--narrow">
        <div class="pu-story__surface">
          <PuCell
            as="button"
            title="Open details"
            value="Tap target"
            suffix-icon="i-mdi-chevron-right"
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

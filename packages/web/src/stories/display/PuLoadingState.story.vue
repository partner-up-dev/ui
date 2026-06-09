<script setup lang="ts">
import PuLoadingState from "../../components/puLoadingState/puLoadingState.vue";
import PuSpinner from "../../components/puSpinner/puSpinner.vue";
</script>

<template>
  <Story title="PuLoadingState" group="display">
    <Variant title="Default">
      <div class="pu-story pu-story--narrow">
        <PuLoadingState message="Loading partner requests" />
      </div>
    </Variant>

    <Variant title="Title And Message">
      <div class="pu-story pu-story--narrow">
        <PuLoadingState
          title="Preparing dashboard"
          message="Fetching the latest metrics and availability."
        />
      </div>
    </Variant>

    <Variant title="Surface">
      <div class="pu-story pu-story--narrow">
        <PuLoadingState
          title="Refreshing"
          message="This section will update in a moment."
          surface-level="section"
          variant="soft"
        />
      </div>
    </Variant>

    <Variant title="Compact Start Aligned">
      <div class="pu-story pu-story--narrow">
        <PuLoadingState
          align="start"
          compact
          size="md"
          message="Checking payment status"
        />
      </div>
    </Variant>

    <Variant title="Custom Spinner Slot">
      <div class="pu-story pu-story--narrow">
        <PuLoadingState
          title="Syncing"
          message="Custom loader content can replace the default spinner."
        >
          <template #spinner>
            <PuSpinner size="xl" />
          </template>
        </PuLoadingState>
      </div>
    </Variant>
  </Story>
</template>

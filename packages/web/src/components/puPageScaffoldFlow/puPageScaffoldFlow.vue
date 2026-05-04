<template>
  <PuPageScaffold class="pu-page-scaffold-flow">
    <slot name="header" />

    <main class="pu-page-scaffold-flow__main">
      <slot />
    </main>

    <slot name="actions" />
    <slot name="footer" />
  </PuPageScaffold>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuPageScaffoldFlow",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import PuPageScaffold from "../puPageScaffold/puPageScaffold.vue";
import { puPageScaffoldFlowProps } from "./puPageScaffoldFlow";

defineProps(puPageScaffoldFlowProps);
</script>

<style lang="scss" scoped src="./puPageScaffoldFlow.scss"></style>


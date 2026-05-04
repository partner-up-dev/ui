<template>
  <PuPageScaffold class="pu-page-scaffold-centered">
    <slot name="header" />

    <main class="pu-page-scaffold-centered__main">
      <slot />
    </main>

    <slot name="actions" />
    <slot name="footer" />
  </PuPageScaffold>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuPageScaffoldCentered",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import PuPageScaffold from "../puPageScaffold/puPageScaffold.vue";
import { puPageScaffoldCenteredProps } from "./puPageScaffoldCentered";

defineProps(puPageScaffoldCenteredProps);
</script>

<style lang="scss" scoped src="./puPageScaffoldCentered.scss"></style>


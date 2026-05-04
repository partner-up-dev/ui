<template>
  <PuPageScaffold class="pu-full-screen-page-scaffold">
    <header
      v-if="$slots.header"
      class="pu-full-screen-page-scaffold__header"
    >
      <slot name="header" />
    </header>

    <main class="pu-full-screen-page-scaffold__content">
      <slot />
    </main>

    <footer
      v-if="$slots.footer"
      class="pu-full-screen-page-scaffold__footer"
    >
      <slot name="footer" />
    </footer>
  </PuPageScaffold>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuFullScreenPageScaffold",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import PuPageScaffold from "../puPageScaffold/puPageScaffold.vue";
import { puFullScreenPageScaffoldProps } from "./puFullScreenPageScaffold";

defineProps(puFullScreenPageScaffoldProps);
</script>

<style lang="scss" scoped src="./puFullScreenPageScaffold.scss"></style>


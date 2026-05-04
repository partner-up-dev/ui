<template>
  <PuPageScaffold
    class="pu-footer-reveal-page-scaffold"
    :class="`pu-footer-reveal-page-scaffold--content-${props.contentPlacement}`"
  >
    <div class="pu-footer-reveal-page-scaffold__viewport">
      <header
        v-if="$slots.header"
        class="pu-footer-reveal-page-scaffold__header"
      >
        <slot name="header" />
      </header>

      <main class="pu-footer-reveal-page-scaffold__content">
        <slot />
      </main>
    </div>

    <footer
      v-if="$slots.footer"
      class="pu-footer-reveal-page-scaffold__footer"
    >
      <slot name="footer" />
    </footer>
  </PuPageScaffold>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuFooterRevealPageScaffold",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import PuPageScaffold from "../puPageScaffold/puPageScaffold.vue";
import { puFooterRevealPageScaffoldProps } from "./puFooterRevealPageScaffold";

const props = defineProps(puFooterRevealPageScaffoldProps);
</script>

<style lang="scss" scoped src="./puFooterRevealPageScaffold.scss"></style>


<template>
  <PuPageScaffold class="pu-desktop-page-scaffold">
    <div class="pu-desktop-page-scaffold__layout">
      <header v-if="$slots.header" class="pu-desktop-page-scaffold__header">
        <slot name="header" />
      </header>

      <div class="pu-desktop-page-scaffold__shell">
        <aside v-if="$slots.aside" class="pu-desktop-page-scaffold__aside">
          <slot name="aside" />
        </aside>

        <main class="pu-desktop-page-scaffold__main">
          <slot />
        </main>
      </div>
    </div>
  </PuPageScaffold>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuDesktopPageScaffold",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import PuPageScaffold from "../puPageScaffold/puPageScaffold.vue";
import { puDesktopPageScaffoldProps } from "./puDesktopPageScaffold";

defineProps(puDesktopPageScaffoldProps);
</script>

<style lang="scss" scoped src="./puDesktopPageScaffold.scss"></style>


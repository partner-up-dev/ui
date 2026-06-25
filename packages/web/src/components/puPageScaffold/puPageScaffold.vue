<template>
  <div class="pu-page-scaffold" :class="rootClass">
    <template v-if="isFooterReveal">
      <div class="pu-page-scaffold__viewport">
        <header v-if="hasPageHeader" class="pu-page-scaffold__page-header">
          <div class="pu-page-scaffold__page-header-inner">
            <slot name="pageHeader" />
          </div>
        </header>

        <header v-else-if="hasCustomHeader" class="pu-page-scaffold__header">
          <slot name="header" />
        </header>

        <div class="pu-page-scaffold__body">
          <div class="pu-page-scaffold__shell">
            <aside v-if="hasAsideLayout" class="pu-page-scaffold__aside">
              <slot name="aside" />
            </aside>

            <main class="pu-page-scaffold__main">
              <slot />
            </main>
          </div>
        </div>
      </div>

      <footer v-if="$slots.footer" class="pu-page-scaffold__footer">
        <slot name="footer" />
      </footer>
    </template>

    <template v-else>
      <header v-if="hasPageHeader" class="pu-page-scaffold__page-header">
        <div class="pu-page-scaffold__page-header-inner">
          <slot name="pageHeader" />
        </div>
      </header>

      <header v-else-if="hasCustomHeader" class="pu-page-scaffold__header">
        <slot name="header" />
      </header>

      <div class="pu-page-scaffold__body">
        <div class="pu-page-scaffold__shell">
          <aside v-if="hasAsideLayout" class="pu-page-scaffold__aside">
            <slot name="aside" />
          </aside>

          <main class="pu-page-scaffold__main">
            <slot />
          </main>
        </div>

        <footer v-if="$slots.footer" class="pu-page-scaffold__footer">
          <slot name="footer" />
        </footer>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuPageScaffold",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { puPageScaffoldProps } from "./puPageScaffold";

const props = defineProps(puPageScaffoldProps);
const slots = useSlots();

const isFooterReveal = computed(() => props.footerPlacement === "reveal");
const effectiveViewport = computed(() =>
  isFooterReveal.value ? "screen" : props.viewport
);
const hasCustomHeader = computed(() => Boolean(slots.header));
const hasPageHeader = computed(() =>
  !hasCustomHeader.value && Boolean(slots.pageHeader),
);
const hasAnyHeader = computed(() => hasCustomHeader.value || hasPageHeader.value);
const hasAsideLayout = computed(() => props.layout === "aside" && Boolean(slots.aside));
const resolvedFooterPlacement = computed(() => {
  if (props.footerPlacement !== "auto") {
    return props.footerPlacement;
  }

  return effectiveViewport.value === "screen" ? "inside" : "after";
});

const rootClass = computed(() => [
  `pu-page-scaffold--viewport-${effectiveViewport.value}`,
  `pu-page-scaffold--layout-${hasAsideLayout.value ? "aside" : "single"}`,
  `pu-page-scaffold--width-${props.width}`,
  `pu-page-scaffold--content-${props.contentPlacement}`,
  `pu-page-scaffold--footer-${resolvedFooterPlacement.value}`,
  `pu-page-scaffold--padding-${props.padding}`,
  {
    "pu-page-scaffold--with-header": hasAnyHeader.value,
    "pu-page-scaffold--with-custom-header": hasCustomHeader.value,
    "pu-page-scaffold--with-page-header": hasPageHeader.value,
    "pu-page-scaffold--sticky-aside": props.stickyAside && hasAsideLayout.value,
  },
]);
</script>

<style lang="scss" scoped src="./puPageScaffold.scss"></style>

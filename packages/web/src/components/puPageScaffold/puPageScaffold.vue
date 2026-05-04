<template>
  <div class="pu-page-scaffold">
    <slot />
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
import { puPageScaffoldProps } from "./puPageScaffold";

defineProps(puPageScaffoldProps);
</script>

<style lang="scss" scoped src="./puPageScaffold.scss"></style>


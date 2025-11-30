<script lang="ts">
export default {
  name: 'PuButton',
}
</script>
<script setup lang="ts">
import { PuButtonProps, PuButtonEmits } from './puButton'

const props = defineProps(PuButtonProps)
const emit = defineEmits(PuButtonEmits)

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="[
      'pu-button',
      `pu-button--${variant}`,
      `pu-button--${size}`,
      { 'pu-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped src="./puButton.scss"></style>

<template>
  <button
    type="button"
    :class="buttonClasses"
    :style="props.customStyle"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    @click="onClick"
  >
    <span v-if="props.loading" class="loading-icon icon-wrapper" aria-hidden="true">
      <span class="i-mdi-loading icon loading-spinner"></span>
    </span>

    <span v-if="!props.loading && props.prefixIcon" class="prefix-icon icon-wrapper" aria-hidden="true">
      <span :class="props.prefixIcon" class="icon"></span>
    </span>

    <span v-if="props.type !== 'OnlyIcon' && props.text" class="text font-label-large">
      {{ props.text }}
    </span>

    <span v-if="!props.loading && props.suffixIcon" class="suffix-icon icon-wrapper" aria-hidden="true">
      <span :class="props.suffixIcon" class="icon"></span>
    </span>

    <span v-if="props.showDot" class="dot" aria-hidden="true" />
  </button>
</template>

<script lang="ts">
export default {
  name: 'PuButton',
  options: BasicComponentOptions
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { puButtonProps, puButtonEmits } from './puButton'
import { BasicComponentOptions } from '../../utils/vue';
import { kebabCase } from '../../utils/string'

const props = defineProps(puButtonProps)
const emit = defineEmits(puButtonEmits)

const buttonClasses = computed(() => {
  const classes = ['pu-button']

  // Theme classes
  classes.push(kebabCase(props.theme))

  // Type classes
  classes.push(kebabCase(props.type))
  classes.push(kebabCase(props.type) + '--' + kebabCase(props.size))

  // Size classes
  classes.push(kebabCase(props.size))

  // Shape classes
  if (props.rounded) classes.push('rounded')

  // State classes
  if (props.disabled) classes.push('disabled')
  if (props.loading) classes.push('loading')
  if (props.active) classes.push('active')
  if (props.toggled) classes.push('toggled')

  return classes
})

const onClick = (event: unknown) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped src="./puButton.scss"></style>

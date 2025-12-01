<template>
  <view :class="buttonClasses" :style="props.customStyle" @click="onClick">
    <!-- Loading Indicator -->
    <view v-if="loading" class="loading-icon icon-wrapper">
      <text class="i-mdi-loading icon loading-spinner"></text>
    </view>

    <!-- Prefix Icon -->
    <view v-if="!loading && prefixIcon" class="prefix-icon icon-wrapper">
      <text :class="prefixIcon" class="icon"></text>
    </view>

    <!-- Text Content -->
    <view v-if="type !== 'OnlyIcon' && text" class="text font-label-large">
      <text>{{ text }}</text>
    </view>

    <!-- Suffix Icon -->
    <view v-if="!loading && suffixIcon" class="suffix-icon icon-wrapper">
      <text :class="suffixIcon" class="icon"></text>
    </view>

    <!-- Dot indicator -->
    <view v-if="showDot" class="dot" />
  </view>
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
import { BasicComponentOptions } from '@/utils/vue';
import { kebabCase } from '@/utils/string'

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

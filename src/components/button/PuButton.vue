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

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as m;
@use '../../styles/component' as comp;

.pu-button {
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  text-decoration: none;
  transition: all 0.2s ease;
  user-select: none;
  white-space: nowrap;
  
  /* Apply system tokens via CSS variables */
  border-radius: map-get(comp.$button-radius, default);
  gap: map-get(comp.$button-spacing, gap);
  
  /* Default typography */
  font-size: map-get(comp.$button-typography, font-size);
  font-weight: map-get(comp.$button-typography, font-weight);
  line-height: map-get(comp.$button-typography, line-height);
  
  /* Primary variant (default) */
  &--primary {
    background-color: map-get(comp.$button-colors, primary-bg);
    color: map-get(comp.$button-colors, primary-text);
    border: 1px solid map-get(comp.$button-colors, primary-border);
    
    &:hover:not(.pu-button--disabled) {
      opacity: 0.9;
      @include m.elevation(2);
    }
    
    &:active:not(.pu-button--disabled) {
      opacity: 0.8;
    }
  }
  
  /* Secondary variant */
  &--secondary {
    background-color: map-get(comp.$button-colors, secondary-bg);
    color: map-get(comp.$button-colors, secondary-text);
    border: 1px solid map-get(comp.$button-colors, secondary-border);
    
    &:hover:not(.pu-button--disabled) {
      opacity: 0.9;
      @include m.elevation(2);
    }
    
    &:active:not(.pu-button--disabled) {
      opacity: 0.8;
    }
  }
  
  /* Outlined variant */
  &--outlined {
    background-color: map-get(comp.$button-colors, outlined-bg);
    color: map-get(comp.$button-colors, outlined-text);
    border: 1px solid map-get(comp.$button-colors, outlined-border);
    
    &:hover:not(.pu-button--disabled) {
      background-color: rgba(map-get(comp.$button-colors, primary-bg), 0.1);
    }
    
    &:active:not(.pu-button--disabled) {
      background-color: rgba(map-get(comp.$button-colors, primary-bg), 0.2);
    }
  }
  
  /* Text variant */
  &--text {
    background-color: map-get(comp.$button-colors, text-bg);
    color: map-get(comp.$button-colors, text-text);
    border: 1px solid map-get(comp.$button-colors, text-border);
    
    &:hover:not(.pu-button--disabled) {
      background-color: rgba(map-get(comp.$button-colors, primary-bg), 0.08);
    }
    
    &:active:not(.pu-button--disabled) {
      background-color: rgba(map-get(comp.$button-colors, primary-bg), 0.16);
    }
  }
  
  /* Size variants */
  &--small {
    height: map-get(comp.$button-size, small);
    padding: 0 map-get(comp.$button-spacing, padding-horizontal);
  }
  
  &--medium {
    height: map-get(comp.$button-size, medium);
    padding: 0 map-get(comp.$button-spacing, padding-horizontal);
  }
  
  &--large {
    height: map-get(comp.$button-size, large);
    padding: 0 calc(map-get(comp.$button-spacing, padding-horizontal) * 1.5);
  }
  
  /* Disabled state */
  &--disabled {
    cursor: not-allowed;
    opacity: map-get(comp.$button-colors, disabled-opacity);
    background-color: map-get(comp.$button-colors, disabled-bg);
    color: map-get(comp.$button-colors, disabled-text);
    border-color: transparent;
  }
}
</style>

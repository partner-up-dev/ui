/*
 * Vue Props Utilities
 * Helper functions for defining component props
 */

import type { PropType } from 'vue'

/**
 * Make a boolean prop with default value
 */
export function makeBooleanProp(defaultValue: boolean = false) {
  return {
    type: Boolean as PropType<boolean>,
    default: defaultValue
  }
}

/**
 * Make a string prop with default value
 */
export function makeStringProp<T extends string>(defaultValue?: T) {
  return {
    type: String as unknown as PropType<T>,
    default: defaultValue
  }
}

/**
 * Make a number prop with default value
 */
export function makeNumberProp(defaultValue?: number) {
  return {
    type: Number as PropType<number>,
    default: defaultValue
  }
}

/**
 * Make a required string prop
 */
export function makeRequiredStringProp<T extends string>() {
  return {
    type: String as unknown as PropType<T>,
    required: true as const
  }
}

/**
 * Make an array prop with default value
 */
export function makeArrayProp<T>() {
  return {
    type: Array as PropType<T[]>,
    default: () => []
  }
}

/**
 * Make an object prop with default value
 */
export function makeObjectProp<T>() {
  return {
    type: Object as PropType<T>,
    default: () => ({})
  }
}

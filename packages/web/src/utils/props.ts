/*
 * Vue Props Utilities
 * Helper functions for defining component props
 */

import type { PropType } from 'vue'

export const unknownProp = null as unknown as PropType<unknown>

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true as const
}

/**
 * Make a required prop with specified type
 */
export const makeRequiredProp = <T>(type: T) => ({
  type,
  required: true as const
})

/**
 * Make a boolean prop with default value
 */
export function makeBooleanProp<T extends boolean>(defaultValue: T = false as T) {
  return {
    type: Boolean,
    default: defaultValue
  }
}

/**
 * Make a string prop with default value
 */
export function makeStringProp<T>(defaultValue: T) {
  return {
    type: String as unknown as PropType<T>,
    default: defaultValue
  }
}

/**
 * Make a number prop with default value
 */
export function makeNumberProp<T extends number>(defaultValue: T) {
  return {
    type: Number,
    default: defaultValue
  }
}

/**
 * Make a numeric prop (number or string) with default value
 */
export const makeNumericProp = <T>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal
})

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
export function makeArrayProp<T>(defaultVal: T[] = []) {
  return {
    type: Array as PropType<T[]>,
    default: () => defaultVal
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

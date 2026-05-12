import { nextTick, toValue, watch } from 'vue'
import type { PuMaybeRefOrGetter } from './types'

export type PuFocusReturnOptions = {
  enabled?: PuMaybeRefOrGetter<boolean>
  restoreTarget?: () => HTMLElement | null | undefined
}

export function useFocusReturn(
  active: PuMaybeRefOrGetter<boolean>,
  options: PuFocusReturnOptions = {}
): void {
  let previousFocusedElement: HTMLElement | null = null

  const restoreFocus = () => {
    if (options.enabled !== undefined && !toValue(options.enabled)) {
      previousFocusedElement = null
      return
    }

    const target = options.restoreTarget?.() ?? previousFocusedElement
    previousFocusedElement = null

    if (!target || typeof document === 'undefined' || !document.contains(target)) {
      return
    }

    nextTick(() => {
      target.focus({ preventScroll: true })
    })
  }

  watch(
    () => Boolean(toValue(active)),
    (isActive, wasActive) => {
      if (typeof document === 'undefined') {
        return
      }

      if (isActive) {
        previousFocusedElement =
          document.activeElement instanceof HTMLElement ? document.activeElement : null
        return
      }

      if (wasActive) {
        restoreFocus()
      }
    },
    { immediate: true }
  )
}


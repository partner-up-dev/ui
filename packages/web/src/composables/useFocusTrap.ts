import { nextTick, toValue, watch, watchEffect, type Ref } from 'vue'
import type { PuMaybeRefOrGetter } from './types'

export type PuFocusTrapOptions = {
  initialFocus?: 'first' | 'container' | (() => HTMLElement | null | undefined)
}

export type PuFocusTrapReturn = {
  focusFirst: () => void
}

const tabbableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  active: PuMaybeRefOrGetter<boolean>,
  options: PuFocusTrapOptions = {}
): PuFocusTrapReturn {
  const focusFirst = () => {
    const target = resolveInitialFocusTarget(container.value, options)
    target?.focus({ preventScroll: true })
  }

  watch(
    () => Boolean(toValue(active)),
    async (isActive) => {
      if (!isActive) {
        return
      }

      await nextTick()
      focusFirst()
    },
    { immediate: true, flush: 'post' }
  )

  watchEffect((onCleanup) => {
    if (!toValue(active) || typeof document === 'undefined') {
      return
    }

    const listener = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return
      }

      trapTabKey(event, container.value)
    }

    document.addEventListener('keydown', listener, true)
    onCleanup(() => {
      document.removeEventListener('keydown', listener, true)
    })
  })

  return {
    focusFirst
  }
}

function resolveInitialFocusTarget(
  container: HTMLElement | null,
  options: PuFocusTrapOptions
): HTMLElement | null {
  if (!container) {
    return null
  }

  if (typeof options.initialFocus === 'function') {
    const target = options.initialFocus()
    if (target) {
      return target
    }
  }

  if (options.initialFocus === 'container') {
    return container
  }

  return getTabbableElements(container)[0] ?? container
}

function trapTabKey(event: KeyboardEvent, container: HTMLElement | null): void {
  if (!container) {
    return
  }

  const activeElement = document.activeElement
  const tabbableElements = getTabbableElements(container)

  if (tabbableElements.length === 0) {
    event.preventDefault()
    container.focus({ preventScroll: true })
    return
  }

  if (!(activeElement instanceof HTMLElement) || !container.contains(activeElement)) {
    event.preventDefault()
    tabbableElements[0]?.focus({ preventScroll: true })
    return
  }

  const firstElement = tabbableElements[0]
  const lastElement = tabbableElements[tabbableElements.length - 1]

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement?.focus({ preventScroll: true })
    return
  }

  if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement?.focus({ preventScroll: true })
  }
}

function getTabbableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(tabbableSelector)).filter(
    isTabbableElement
  )
}

function isTabbableElement(element: HTMLElement): boolean {
  if (element.tabIndex < 0) {
    return false
  }

  const style = window.getComputedStyle(element)
  return style.visibility !== 'hidden' && style.display !== 'none'
}


import { toValue, watchEffect } from 'vue'
import type { PuMaybeRefOrGetter } from './types'

export type PuEscapeKeyOptions = {
  target?: () => Document | Window | HTMLElement | undefined
  capture?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
}

export function useEscapeKey(
  active: PuMaybeRefOrGetter<boolean>,
  handler: (event: KeyboardEvent) => void,
  options: PuEscapeKeyOptions = {}
): void {
  watchEffect((onCleanup) => {
    if (!toValue(active) || typeof document === 'undefined') {
      return
    }

    const target = options.target?.() ?? document
    if (!target) {
      return
    }

    const listener = (event: Event) => {
      if (!(event instanceof KeyboardEvent)) {
        return
      }

      if ((event as KeyboardEvent & { isComposing?: boolean }).isComposing) {
        return
      }

      if (event.key !== 'Escape' && event.key !== 'Esc') {
        return
      }

      if (options.preventDefault === true) {
        event.preventDefault()
      }

      if (options.stopPropagation === true) {
        event.stopPropagation()
      }

      handler(event)
    }

    target.addEventListener('keydown', listener, { capture: options.capture })
    onCleanup(() => {
      target.removeEventListener('keydown', listener, { capture: options.capture })
    })
  })
}


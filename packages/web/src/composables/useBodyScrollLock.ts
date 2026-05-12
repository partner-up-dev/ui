import { toValue, watchEffect } from 'vue'
import type { PuMaybeRefOrGetter } from './types'

type ScrollLockState = {
  count: number
  previousOverflow: string
  previousPaddingRight: string
}

export type PuBodyScrollLockOptions = {
  target?: () => HTMLElement | undefined
  reserveScrollbarGap?: boolean
}

const lockStateByTarget = new WeakMap<HTMLElement, ScrollLockState>()

export function useBodyScrollLock(
  active: PuMaybeRefOrGetter<boolean>,
  options: PuBodyScrollLockOptions = {}
): void {
  watchEffect(
    (onCleanup) => {
      if (!toValue(active) || typeof document === 'undefined') {
        return
      }

      const target = options.target?.() ?? document.body
      if (!target) {
        return
      }

      lockTarget(target, options.reserveScrollbarGap === true)
      onCleanup(() => {
        unlockTarget(target)
      })
    },
    { flush: 'post' }
  )
}

function lockTarget(target: HTMLElement, reserveScrollbarGap: boolean): void {
  const currentState = lockStateByTarget.get(target)
  if (currentState) {
    currentState.count += 1
    return
  }

  const state: ScrollLockState = {
    count: 1,
    previousOverflow: target.style.overflow,
    previousPaddingRight: target.style.paddingRight
  }

  lockStateByTarget.set(target, state)
  target.style.overflow = 'hidden'

  if (reserveScrollbarGap && isBodyElement(target)) {
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarGap > 0) {
      const computedPaddingRight = Number.parseFloat(
        window.getComputedStyle(target).paddingRight
      )
      const nextPaddingRight = (Number.isFinite(computedPaddingRight) ? computedPaddingRight : 0) + scrollbarGap
      target.style.paddingRight = `${nextPaddingRight}px`
    }
  }
}

function unlockTarget(target: HTMLElement): void {
  const state = lockStateByTarget.get(target)
  if (!state) {
    return
  }

  state.count -= 1
  if (state.count > 0) {
    return
  }

  target.style.overflow = state.previousOverflow
  target.style.paddingRight = state.previousPaddingRight
  lockStateByTarget.delete(target)
}

function isBodyElement(target: HTMLElement): target is HTMLBodyElement {
  return typeof document !== 'undefined' && target === document.body
}

